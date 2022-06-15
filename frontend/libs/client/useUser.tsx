// 수정 금지

import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { accessToken } from "@components/atoms/Auth";

interface IEditProfileResponse {
  message: string;
  statusCode: number;
  user: any;
}

// accessToken 필요한 fetcher
export const tokenFetcher = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());

export default function useUser() {
  const TOKEN = useRecoilValue(accessToken);

  const { data, error } = useSWR<IEditProfileResponse>(
    [`${process.env.BASE_URL}/user/info`, TOKEN],
    tokenFetcher
  );

  // 로그인 하지 않은 사용자 처리
  const router = useRouter();
  useEffect(() => {
    if (data && data.statusCode !== 200) {
      alert("회원 전용 페이지입니다. 로그인해 주십시오.");
      router.replace("/login"); // 로그인 페이지로 이동 (replace가 브라우저 history 남기지 않음)
    }
  }, [data, router]);

  return { user: data?.user, isLoading: !data && !error };
}
