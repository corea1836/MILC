import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useRef } from "react";
// small change

const Model = (props) => {
  const ref = useRef();
  const model = useLoader(GLTFLoader, props.path);
  // const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);
  console.log(model);

  let mixer;
  if (model.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((scene, delta) => {
    mixer?.update(delta);

    ref.current.rotation.y += 0.005;
  });

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.side = THREE.FrontSide;
    }
  });
  return <primitive object={model.scene} ref={ref} scale={props.scale} />;
};

export default Model;
