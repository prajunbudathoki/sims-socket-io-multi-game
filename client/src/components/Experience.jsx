import {
  ContactShadows,
  Environment,
  Grid,
  OrbitControls,
} from "@react-three/drei";
import { AnimateCharacter } from "./AnimateCharacter";

export const Experience = () => {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.011}
      />
      <OrbitControls />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20000, 200]} />
        <meshStandardMaterial color={"#e0e0e0"} />
      </mesh>
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.4}
        scale={15}
        blur={2.5}
        far={4.5}
      />
      <Grid infiniteGrid cellSize={1} sectionSize={5} />
      <AnimateCharacter />
    </>
  );
};
