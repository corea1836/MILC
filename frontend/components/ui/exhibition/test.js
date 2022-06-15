import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import React from "react";

import Goods from "@components/exhibition/Goods";
import Lights from "@components/exhibition/Lights";
// import Bulb from "../../components/show/Bulb";

function test() {
  return (
    // <div style={{ height: "100vh", width: "100vw" }}>
    <div className="w-auto h-[100vh] max-w-full max-h-full object-contain">
      <Canvas
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: false,
        }}
        shadows
        dpr={[1, 2]}
        style={{ background: "white" }}
        camera={{ position: [7, 7, 7] }}
      >
        {/* <fog attach="fog" args={["white", 1, 10]} /> */}
        <Lights />
        {/* <Bulb position={[-6, 3, 0]} />
        <Bulb position={[0, 3, 0]} />
        <Bulb position={[6, 3, 0]} /> */}
        <Physics>
          <Goods />
        </Physics>
      </Canvas>
    </div>
  );
}

export default test;
