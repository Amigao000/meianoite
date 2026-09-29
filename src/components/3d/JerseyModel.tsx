'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useUniformStore } from '@/store/useUniformStore';

export default function JerseyModel() {
  const { scene } = useGLTF('/models/jersey.glb');
  const { colors } = useUniformStore();
  const groupRef = useRef<THREE.Group>(null);

  // Materiais PBR esportivos reativos
  const materials = useMemo(() => {
    return {
      body: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.primary),
        roughness: 0.5,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      collarAndTrim: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.secondary),
        roughness: 0.6,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    };
  }, [colors.primary, colors.secondary]);

  // Atualização dinâmica de cores sem reconstruir a cena
  useEffect(() => {
    materials.body.color.set(colors.primary);
    materials.collarAndTrim.color.set(colors.secondary);
  }, [colors, materials]);

  const processedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Aplicação dos materiais PBR reativos
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const matName = (mesh.material as THREE.Material)?.name || '';
        const meshName = (mesh.name || '').toLowerCase();

        if (matName.includes('Material109373') || meshName.includes('material109373')) {
          mesh.material = materials.collarAndTrim;
        } else {
          mesh.material = materials.body;
        }
      }
    });

    // Força cálculo atualizado de todas as matrizes no grafo de cena
    clone.updateMatrixWorld(true);

    // Mede a caixa delimitadora real considerando as matrizes dos nós pais
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // Cria um container centralizador perfeito
    const wrapper = new THREE.Group();
    
    // Centraliza o modelo deslocando seu centro geométrico para a origem (0, 0, 0)
    clone.position.set(-center.x, -center.y, -center.z);
    wrapper.add(clone);

    // Ajusta a escala para enquadramento perfeito na visão da câmera
    const maxDimension = Math.max(size.x, size.y, size.z);
    if (maxDimension > 0) {
      // Alvo visual para preencher ~2.2 unidades na tela
      const targetSize = 2.2;
      const scaleFactor = targetSize / maxDimension;
      wrapper.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }

    return wrapper;
  }, [scene, materials]);

  return <primitive ref={groupRef} object={processedScene} position={[0, -0.1, 0]} />;
}

useGLTF.preload('/models/jersey.glb');
