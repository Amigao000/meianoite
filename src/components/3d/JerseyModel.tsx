'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useUniformStore } from '@/store/useUniformStore';

export default function JerseyModel() {
  const { scene } = useGLTF('/models/shirt_body.gltf');
  const { colors } = useUniformStore();

  // Criação dos materiais PBR esportivos reativos ao estado
  const materials = useMemo(() => {
    return {
      bodyFront: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.primary),
        roughness: 0.6,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      bodyBack: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.primary),
        roughness: 0.6,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      collar: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.secondary),
        roughness: 0.7,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      sleeves: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.primary),
        roughness: 0.6,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    };
  }, [colors.primary, colors.secondary]);

  // Atualiza cores dinamicamente em tempo real sem recriar malhas
  useEffect(() => {
    materials.bodyFront.color.set(colors.primary);
    materials.bodyBack.color.set(colors.primary);
    materials.collar.color.set(colors.secondary);
    materials.sleeves.color.set(colors.primary);
  }, [colors, materials]);

  // Clonagem profunda e mapeamento de materiais por peça
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Ajuste de escala e centralização da camisa
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    // Normaliza escala para caber suavemente na câmera
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 3.2 / maxDim;
      clone.scale.set(scale, scale, scale);
    }

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const name = (mesh.name || '').toLowerCase();
        const parentName = (mesh.parent?.name || '').toLowerCase();

        if (name.includes('ribbing') || parentName.includes('ribbing')) {
          // Gola / Punho -> Cor secundária
          mesh.material = materials.collar;
        } else if (name.includes('sleeve') || parentName.includes('sleeve')) {
          // Mangas
          mesh.material = materials.sleeves;
        } else if (name.includes('back') || parentName.includes('back')) {
          // Costas
          mesh.material = materials.bodyBack;
        } else {
          // Frente / Corpo principal
          mesh.material = materials.bodyFront;
        }
      }
    });

    return clone;
  }, [scene, materials]);

  return <primitive object={clonedScene} />;
}

// Pré-carregamento do modelo para transição imediata
useGLTF.preload('/models/shirt_body.gltf');
