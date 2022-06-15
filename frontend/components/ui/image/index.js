import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  Loader,
  PresentationControls,
  ContactShadows,
  Html,
  useGLTF,
} from "@react-three/drei";
import { useRoute, useLocation, Link } from "wouter";
import getUuid from "uuid-by-string";

export default function ThreeDimension({ name }) {
  function Goods(props) {
    const ref = useRef();
    const { nodes, materials } = useGLTF(`${name}`);
    useFrame((state) => {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8;
      ref.current.rotation.y = Math.sin(t / 4) / 10;
      ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
      ref.current.position.y = (1 + Math.sin(t / 1.5)) / 30;
    });
    return (
      <group ref={ref} {...props} dispose={null}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          geometry={nodes.Object005_glass_0.geometry}
          material={materials.glass}
          onWheel={(e) => console.log("wheel spins")}
        ></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object006_watch_0.geometry}
          material={materials.watch}
        />
      </group>
    );
  }
  return (
    <div>
      {" "}
      <group {...props}>
        <mesh
          name={name}
          // onPointerOver={(e) => (e.stopPropagation(), hover(true))}
          // onPointerOut={() => hover(false)}
          scale={[1, GOLDENRATIO, 0.05]}
          position={[0, GOLDENRATIO / 2, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial
            color="#151515"
            metalness={0.5}
            roughness={0.5}
            envMapIntensity={2}
          />
          <mesh
            ref={frame}
            raycast={() => null}
            scale={[0.9, 0.93, 0.9]}
            position={[0, 0, 0.2]}
          >
            <boxGeometry />
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0, 0.6, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <Goods
                scale={new Array(3).fill(0.0009)}
                position={[-0.7, 0, 1]}
              />
            </PresentationControls>
            <meshBasicMaterial toneMapped={false} fog={false} />
          </mesh>

          <ambientLight intensity={0.1} />
          <directionalLight />

          <Image
            raycast={() => null}
            ref={image}
            position={[0, 0, 0.7]}
            url={url}
          />
        </mesh>
      </group>
    </div>
  );
}
