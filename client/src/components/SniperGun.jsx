import { useGLTF } from "@react-three/drei";
import React from "react";

export function SniperGun(props) {
  const { scene } = useGLTF("/models/rifle.glb");
  return <primitive object={scene} {...props} scale={0.3} />;
}
useGLTF.preload("/models/sniper.glb");
