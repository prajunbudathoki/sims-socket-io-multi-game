import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { KeyboardControls } from "@react-three/drei";

function App() {
  const [isScoped, setIsScoped] = useState(false);
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["w", "ArrowUp"] },
        { name: "backward", keys: ["s", "ArrowDown"] },
        { name: "left", keys: ["a", "ArrowLeft"] },
        { name: "right", keys: ["d", "ArrowRight"] },
      ]}
    >
      <Canvas
        shadows
        camera={{ position: [10, 10, 10], fov: isScoped ? 20 : 50 }}
        onPointerDown={(e) => {
          if (e.button === 2) {
            setIsScoped(true);
          }
        }}
        onPointerUp={(e) => {
          if (e.button === 2) {
            setIsScoped(false);
          }
        }}
      >
        <Experience isScoped={isScoped} />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
