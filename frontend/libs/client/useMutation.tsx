// 수정 금지
// POST, PUT fetch (DB의 상태를 mutate)

import { accessToken } from "@components/atoms/Auth";
import { useState } from "react";
import { useRecoilValue } from "recoil";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
  methodType: string;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string,
  methodType?: string
): UseMutationResult<T> {
  if (!methodType) {
    methodType = "POST";
  }
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
    methodType,
  });

  const URL = `${process.env.BASE_URL}${url}`;
  const TOKEN = useRecoilValue(accessToken);

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    fetch(URL, {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  return [mutation, { ...state }];
}
