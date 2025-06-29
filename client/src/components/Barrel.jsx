import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export function Barrel({ position = [15, 0, -10], scale = 1.6, rotation = [0, Math.PI / 4, 0] }) {
  const { scene } = useGLTF("/models/barrel.glb");
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useMemo(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}
