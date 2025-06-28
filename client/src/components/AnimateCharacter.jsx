import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { SniperGun } from "./SniperGun";

export function AnimateCharacter() {
  const group = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { scene, animations } = useGLTF("/models/character.glb");

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // console.log("cloned", clonedScene);

  const { actions } = useAnimations(animations, group);
  const sniperRef = useRef();

  useEffect(() => {
    const rightHand = clonedScene.getObjectByName("DEF-handR");
    if (rightHand && sniperRef.current) {
      rightHand.add(sniperRef.current);
      sniperRef.current.position.set(0, 10, 10);
      sniperRef.current.rotation.set(10, 20, 0);
      sniperRef.current.scale.set(0.02, 0.02, 0.02);
    }
  }, [clonedScene]);

  useFrame((state, delta) => {
    const { forward, backward, left, right } = getKeys();
    const velocity = new THREE.Vector3();

    if (forward) velocity.z -= 1;
    if (backward) velocity.z += 1;
    if (left) velocity.x -= 1;
    if (right) velocity.x += 1;

    if (velocity.length() > 0) {
      velocity.normalize().multiplyScalar(2 * delta);
      group.current.position.add(velocity);

      const targetRotation = Math.atan2(velocity.x, velocity.z);
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotation,
        0.1
      );
    }
  });

  const [isMoving, setIsMoving] = useState(false);
  useEffect(() => {
    const unsubscribe = subscribeKeys(() => {
      const { forward, backward, left, right } = getKeys();
      const moving = forward || backward || left || right;

      if (moving !== isMoving) {
        setIsMoving(moving);
        const actionName = moving ? "Rig|Jog_Fwd_Loop" : "Rig|Sword_Idle";
        if (actions && actions[actionName]) {
          Object.values(actions).forEach((a) => a.stop());
          actions[actionName].reset().fadeIn(0.2).play();
        }
      }
    });

    return () => unsubscribe();
  }, [actions, isMoving]);

  return (
    <group ref={group} scale={10} position={[0, 0.5, 0]} castShadow>
      <primitive object={clonedScene} ref={sniperRef} />
      <SniperGun ref={sniperRef} />
    </group>
  );
}

useGLTF.preload("/models/character.glb");
