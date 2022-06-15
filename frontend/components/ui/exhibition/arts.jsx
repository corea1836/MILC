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
import { useRoute, useLocation, Link, useRouter } from "wouter";
import getUuid from "uuid-by-string";
import Goods from "@components/exhibition/Goods";

const pexel = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;

const GOLDENRATIO = 1.61803398875;

export default function Arts({ collectionList }) {
  console.log(collectionList.length);
  const artImages = [
    // Front
    {
      position: [0, 0, 1.5],
      rotation: [0, 0, 0],
      url: `${collectionList[0] ? collectionList[0] : "/BG.jpg"}`,
    },
    // Back
    {
      position: [-0.8, 0, -0.6],
      rotation: [0, 0, 0],
      url: `${collectionList[4] ? collectionList[4] : "/BG.jpg"}`,
    },
    {
      position: [0.8, 0, -0.6],
      rotation: [0, 0, 0],
      url: `${collectionList[5] ? collectionList[5] : "/BG.jpg"}`,
    },
    // Left
    {
      position: [-1.75, 0, 0.25],
      rotation: [0, Math.PI / 2.5, 0],
      url: `${collectionList[3] ? collectionList[3] : "/BG.jpg"}`,
    },
    {
      position: [-2.15, 0, 1.5],
      rotation: [0, Math.PI / 2.5, 0],
      url: `${collectionList[2] ? collectionList[2] : "/BG.jpg"}`,
    },
    {
      position: [-2, 0, 2.75],
      rotation: [0, Math.PI / 2.5, 0],
      url: `${collectionList[1] ? collectionList[1] : "/BG.jpg"}`,
    },
    // Right
    {
      position: [1.75, 0, 0.25],
      rotation: [0, -Math.PI / 2.5, 0],
      url: `${collectionList[6] ? collectionList[6] : "/BG.jpg"}`,
    },
    {
      position: [2.15, 0, 1.5],
      rotation: [0, -Math.PI / 2.5, 0],
      url: `${collectionList[7] ? collectionList[7] : "/BG.jpg"}`,
    },
    {
      position: [2, 0, 2.75],
      rotation: [0, -Math.PI / 2.5, 0],
      url: `${collectionList[8] ? collectionList[8] : "/BG.jpg"}`,
    },
  ];

  console.log(artImages);
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  //     const router = useRouter();

  //   const [collectionList, setCollectionList] = useState();

  //   const TOKEN = useRecoilValue(accessToken);

  //   // 해당 nickname을 가진 유저의 판매/보유 nft 리스트 가져오기
  //   const { data } = useSWR<OwnNftResponse>(
  //     router.query.nickname
  //       ? [`${process.env.BASE_URL}/nft/user/${router.query.nickname}`, TOKEN]
  //       : null,
  //     tokenFetcher
  // );

  //   useEffect(() => {
  //     if (data && data?.statusCode === 200) {
  //       const tmp = data.nftDtoList.filter((nft) => nft.seleStatus === false);
  //       setCollectionList(tmp);
  //     }
  //   }, [data, router]);

  return (
    <Canvas
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ fov: 70, position: [0, 2, 15] }}
      style={{ height: "100vh" }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#191920"]} />

        <fog attach="fog" args={["#191920", 0, 15]} />
        <Environment preset="city" />
        <group position={[0, -0.5, 0]}>
          <Frames images={artImages} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.5}
            />
          </mesh>
        </group>
        <Html as="div" position={[-0.8, -3.3, 0]}>
          <div className="flex flex-row justify-center gap-x-2 ">
            <button
              className=" text-gray-700 w-24  bg-gray-300 hover:bg-gray-500 hover:text-white hover:duration-300 p-2 rounded-md"
              onClick={toggleFullScreen}
            >
              전체화면
            </button>
            <a
              className=" text-gray-700  bg-gray-300 hover:bg-gray-500 hover:text-white hover:duration-300 p-2 rounded-md"
              href="/"
            >
              홈
            </a>
          </div>
        </Html>
        {/* <Html as="div" position={[8, -3.4, 0]}></Html> */}
      </Suspense>
    </Canvas>
  );
}

function Frame({ url, ...props }) {
  const [hovered, hover] = useState(false);

  const image = useRef();
  const frame = useRef();
  const name = getUuid(url);

  useCursor(hovered);
  useFrame((state) => {
    // image.current.material.zoom =
    //   2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    image.current.scale.x = THREE.MathUtils.lerp(
      image.current.scale.x,
      0.85 * (hovered ? 0.85 : 1),
      0.1
    );
    image.current.scale.y = THREE.MathUtils.lerp(
      image.current.scale.y,
      0.9 * (hovered ? 0.905 : 1),
      0.1
    );
  });

  return (
    <group {...props}>
      <mesh
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        name={name}
        scale={[1, 1.2, 0.05]}
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
          {/* <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.6, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Goods />
          </PresentationControls> */}
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
  );
}

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    state.camera.position.lerp(p, 0.025);
    state.camera.quaternion.slerp(q, 0.025);
  });
  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(
          clicked.current === e.object
            ? "/exhibition"
            : "/item/" + e.object.name
        )
      )}
      onPointerMissed={() => setLocation(`/exhibition`)}
    >
      {images.map(
        (props) => <Frame key={props.position} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

// function Goods(props) {
//   const ref = useRef();
//   const { nodes, materials } = useGLTF("/watch-v1.glb");
//   useFrame((state) => {
//     const t = state.clock.getElapsedTime();
//     ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8;
//     ref.current.rotation.y = Math.sin(t / 4) / 10;
//     ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
//     ref.current.position.y = (1 + Math.sin(t / 1.5)) / 30;
//   });
//   return (
//     <group ref={ref} {...props} dispose={null}>
//       <mesh
//         rotation={[-Math.PI / 2, 0, 0]}
//         geometry={nodes.Object005_glass_0.geometry}
//         material={materials.glass}
//         onWheel={(e) => console.log("wheel spins")}
//       ></mesh>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object006_watch_0.geometry}
//         material={materials.watch}
//       />
//     </group>
//   );
// }
