import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 토큰
export const accessToken = atom({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 계정 구분
export const role = atom({
  key: "role",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
