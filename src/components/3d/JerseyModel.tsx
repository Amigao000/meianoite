'use client';

import React, { useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useUniformStore } from '@/store/useUniformStore';

export default function JerseyModel() {
  const { scene } = useGLTF('/models/shirt_body.gltf');
  const { colors } = useUniformStore();

  // Materiais reativos de alta fidelidade
  const materials = useMemo(() => {
    return {
      bodyFront: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.primary),
        roughness: 0.5,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      bodyBack: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.primary),
        roughness: 0.5,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      collar: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.secondary),
        roughness: 0.6,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      sleeves: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.primary),
        roughness: 0.5,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    };
  }, [colors.primary, colors.secondary]);

  useEffect(() => {
    materials.bodyFront.color.set(colors.primary);
    materials.bodyBack.color.set(colors.primary);
    materials.collar.color.set(colors.secondary);
    materials.sleeves.color.set(colors.primary);
  }, [colors, materials]);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Mapeia os materiais nas malhas corretas da camisa
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const name = (mesh.name || '').toLowerCase();
        const parentName = (mesh.parent?.name || '').toLowerCase();

        if (name.includes('ribbing') || parentName.includes('ribbing')) {
          mesh.material = materials.collar;
        } else if (name.includes('sleeve') || parentName.includes('sleeve')) {
          mesh.material = materials.sleeves;
        } else if (name.includes('back') || parentName.includes('back')) {
          mesh.material = materials.bodyBack;
        } else {
          mesh.material = materials.bodyFront;
        }
      }
    });

    // Calcula o Bounding Box EXCLUSIVAMENTE das malhas de tecido
    const box = new THREE.Box3();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        box.expandByObject(child);
      }
    });

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // Centraliza o modelo no ponto de pivô da câmera
    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    // Escala proporcionalmente para preencher a tela perfeitamente
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 3.0 / maxDim;
      clone.scale.set(scale, scale, scale);
    }

    return clone;
  }, [scene, materials]);

  return <primitive object={clonedScene} />;
}

useGLTF.preload('/models/shirt_body.gltf');
