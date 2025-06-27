import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { KeyboardControls } from "@react-three/drei";

function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["w", "ArrowUp"] },
        { name: "backward", keys: ["s", "ArrowDown"] },
        { name: "left", keys: ["a", "ArrowLeft"] },
        { name: "right", keys: ["d", "ArrowRight"] },
      ]}
    >
      <Canvas shadows camera={{ position: [110, 112, 115], fov: 30 }}>
        <Experience />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
