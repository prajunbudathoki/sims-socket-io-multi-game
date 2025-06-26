import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { KeyboardControls } from "@react-three/drei";

function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["w", "ArrowUp"] },
        { name: "forward", keys: ["s", "ArrowDown"] },
        { name: "forward", keys: ["a", "ArrowLeft"] },
        { name: "forward", keys: ["d", "ArrowRight"] },
      ]}
    >
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
        <Experience />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
