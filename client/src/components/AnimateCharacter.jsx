import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useFrame, useGraph } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as Three from "three";

export function AnimateCharacter() {
  const group = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { scene, animations } = useGLTF("/models/character.glb");

  useFrame((state, delta) => {
    const { forward, backward, left, right } = getKeys();

    const direction = new Three.Vector3();
    if (forward) direction.z -= 1;
    if (backward) direction.z += 1;
    if (left) direction.x -= 1;
    if (right) direction.x += 1;

    direction.normalize().multiplyScalar(2 * delta);

    if (group.current) {
      group.current.position.add(direction);

      if (direction.length() > 0) {
        group.current.rotation.y = Math.atan2(direction.x, direction.z);
      }
    }
  });

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { actions } = useAnimations(animations, group);
  // console.log(actions);

  useEffect(() => {
    const unsubscribe = subscribeKeys(() => {
      const { forward, backward, left, right } = getKeys();
      const moving = forward || backward || left || right;

      const actionName = moving ? "Rig|Walk_Loop" : "Rig|Sword_Idle";
      if (actions && actions[actionName]) {
        Object.values(actions).forEach((a) => a.stop());
        actions[actionName].reset().fadeIn(0.2).play();
      }
    });

    return () => unsubscribe();
  }, [actions]);

  return (
    <group ref={group} scale={10} position={[0, 0.5, 0]} castShadow>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload("/models/character.glb");
