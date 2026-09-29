'use client';

import React, { useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useUniformStore } from '@/store/useUniformStore';

export default function JerseyModel() {
  const { scene } = useGLTF('/models/jersey.glb');
  const { colors } = useUniformStore();

  // Materiais PBR esportivos reativos
  const materials = useMemo(() => {
    return {
      body: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.primary),
        roughness: 0.55,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      collarAndTrim: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.secondary),
        roughness: 0.65,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    };
  }, [colors.primary, colors.secondary]);

  // Atualiza cores dinamicamente sem recriar os materiais
  useEffect(() => {
    materials.body.color.set(colors.primary);
    materials.collarAndTrim.color.set(colors.secondary);
  }, [colors, materials]);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Mapeamento e aplicação dos materiais PBR nas malhas da camisa
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Partes com detalhes/gola/costuras recebem a cor secundária
        const matName = (mesh.material as THREE.Material)?.name || '';
        const meshName = (mesh.name || '').toLowerCase();

        if (matName.includes('Material109373') || meshName.includes('material109373')) {
          mesh.material = materials.collarAndTrim;
        } else {
          mesh.material = materials.body;
        }
      }
    });

    // Calcula Bounding Box preciso para centralizar perfeitamente no ponto de pivô da câmera
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

    // Centraliza o modelo
    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    // Normaliza escala para enquadrar na câmera
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const targetHeight = 2.8;
      const scale = targetHeight / maxDim;
      clone.scale.set(scale, scale, scale);
    }

    return clone;
  }, [scene, materials]);

  return <primitive object={clonedScene} />;
}

useGLTF.preload('/models/jersey.glb');
