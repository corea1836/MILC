// 보유 목록

import type { NextPage } from "next";
import { ProfileLayout, Layout } from "@components/ui/layout";
import useSWR from "swr";
import { Item } from "@components/ui/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessToken } from "@components/atoms/Auth";
import useUser, { tokenFetcher } from "@libs/client/useUser";
import { OwnNftResponse } from "@pages/profile/[nickname]";
import Arts from "@components/ui/exhibition/arts";

interface Nft {
  nftId: string;
  imgUrl: string;
  enterprise: string;
  nftName: string;
  price: number;
  myLike: boolean;
  likeCount: number;
  owner?: string;
  realStatus?: boolean;
  seleStatus?: boolean;
}

const Exhibition: NextPage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [collectionList, setCollectionList] = useState<Nft[]>();
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState("");
  const TOKEN = useRecoilValue(accessToken);

  // 해당 nickname을 가진 유저의 판매/보유 nft 리스트 가져오기
  const { data } = useSWR<OwnNftResponse>(
    router.query.nickname
      ? [`${process.env.BASE_URL}/nft/user/${router.query.nickname}`, TOKEN]
      : null,
    tokenFetcher
  );
  // const res = arts();
  // console.log(res);

  // 가져온 리스트에서 보유중인 nft만 필터링
  useEffect(() => {
    if (
      router.query.nickname &&
      user &&
      router.query.nickname !== user.nickname
    ) {
      router.push(`/exhibition/${router.query.nickname}`);
    }
    if (data && data?.statusCode === 200) {
      let images: any = [];
      const tmp = data.nftDtoList.filter((nft) => nft.seleStatus === false);
      const image = tmp.map((item) => images.push(item.imgUrl));
      setCollectionList(images);
      setNickname(user.nickname);
      setLoading(false);
    }
  }, [data, router]);

  console.log(collectionList);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Arts collectionList={collectionList} />
      )}
    </div>
  );
};

export default Exhibition;
