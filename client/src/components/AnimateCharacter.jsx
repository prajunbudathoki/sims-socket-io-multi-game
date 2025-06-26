import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";

export function AnimateCharacter() {
  const group = useRef();

  const { scene, animations } = useGLTF("/models/character.glb");

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clonedScene);

  const { actions } = useAnimations(animations, group);
  console.log(actions);
  const [animation, setAnimation] = useState("Rig|Walk_Loop");

  useEffect(() => {
    if (actions && actions[animation]) {
      actions[animation].reset().fadeIn(0.5).play();
      return () => actions[animation]?.fadeOut(0.5);
    }
  }, [actions, animation]);

  return (
    <group ref={group} scale={10} position={[0, 0.5, 0]} castShadow>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload("/models/character.glb");
