import { Suspense } from "react";

import Model from "./Model";

const Goods = ({}) => {
  return (
    <Suspense fallback={null}>
      <Model path="/vans.gltf" />
    </Suspense>
  );
};

export default Goods;
