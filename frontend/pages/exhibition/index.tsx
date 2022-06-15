// 보유 목록

import type { NextPage } from "next";
import { ProfileLayout, Layout } from "@components/ui/layout";
import useSWR from "swr";
import { Item } from "@components/ui/common";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessToken } from "@components/atoms/Auth";
import { tokenFetcher } from "@libs/client/useUser";
import { OwnNftResponse } from "@pages/profile/[nickname]";
import Arts from "@components/ui/exhibition/arts";
import { Nft } from "@components/ui/common/item";

const Exhibition: NextPage = () => {
  const TOKEN = useRecoilValue(accessToken);
  const [collectionList, setCollectionList] = useState<Nft[]>();

  // 해당 유저의 판매/보유 nft 리스트 가져오기
  const { data } = useSWR<OwnNftResponse>(
    [`${process.env.BASE_URL}/nft/user`, TOKEN],
    tokenFetcher
  );

  // 가져온 리스트에서 보유중인 nft만 필터링
  useEffect(() => {
    if (data && data?.statusCode === 200) {
      let images: any = [];
      const tmp = data.nftDtoList.filter((nft) => nft.seleStatus === false);
      if (tmp) {
        const image = tmp.map((item) => images.push(item.imgUrl));
        setCollectionList(images);
      }
    }
  }, [data]);

  return (
    <div>
      {collectionList ? <Arts collectionList={collectionList} /> : null}
    </div>
  );
};

export default Exhibition;
