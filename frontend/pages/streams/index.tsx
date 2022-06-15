import type { NextPage } from "next";
import useSWR from "swr";
import { Layout } from "@components/ui/layout";
import { useRouter } from "wouter";
import Link from "next/link";
import Item from "@components/ui/stream/card/index";
import StreamCard from "@components/ui/stream/card/index";

interface DataList {
  roomId: number;
  userId: number;
  nickname: string;
  cfId: string;
  roomName: string;
  runtime: number;
  finish: Boolean;
  nftName: string;
  nftId: any;
  price: number;
  imgUrl: string;
}
interface StreamsResponse {
  message: string;
  statusCode: number;
  liveNftResDtoList: DataList[];
}

const Streams: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<StreamsResponse>(`${process.env.BASE_URL}/live`);
  console.log(data);
  return (
    <Layout seoTitle="개인관">
      <div className="pb-20">
        <div>
          {/* 메인 사진 */}
          <div className="h-[220px] overflow-hidden bg-basicImage shadow-2xl">
            <div className="h-[600px] bg-darkBg  w-full max-h-full max-w-full">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-lightGold text-5xl font-extrabold flex justify-center pt-16">
                LIVE STEAMING NOW
              </div>
            </div>
          </div>
          {/* 메인 글 */}
          <div className="flex flex-col items-center mb-5">
            <span className="text-[40px] font-[600] bg-clip-text text-transparent bg-gradient-to-r from-gold to-lightGold my-7">
              MILC Live Auction
            </span>
            <div className="text-center text-textGray p-5">
              <span>
                브랜드 NFT 한정품을 소장할 수 기회입니다.
                <br />
                MILC는 세계에서 하나뿐인 NFT 제품을{" "}
                <span className="font-semibold">스트리밍으로 경매</span>할 수
                있는 서비스를 제공합니다.
                <br />
                한정된 시간동안 당신의 미래 NFT는 높은 가치로 거듭나고 있습니다.
                <br />
                제품을 실제로 만나보며 사람들의 가치가 모두 담긴
                <br />
                나의 미래 NFT 제품을 소장하십시오
              </span>
            </div>
          </div>
        </div>
        <hr />
        {/* 카드 */}
        <div>
          <p className="text-2xl font-[600] bg-clip-text text-transparent bg-gradient-to-r from-textGray to-textBlack text-center my-10">
            Auction List
          </p>
          <div className="px-[52px]">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-4">
              {data &&
                data?.liveNftResDtoList?.map((val) => (
                  <Link key={val.cfId} href={`/streams/${val.roomId}`}>
                    <StreamCard
                      key={val.cfId}
                      enterprise={val.nickname}
                      imgUrl={val.imgUrl}
                      nftName={val.nftName}
                      nftId={val.nftId}
                      price={val.price}
                      runtime={val.runtime}
                      roomName={val.roomName}
                      roomId={val.roomId}
                      // 현재 최고가
                    />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Streams;
