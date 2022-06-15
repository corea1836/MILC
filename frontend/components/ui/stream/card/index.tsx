import useMutation from "@libs/client/useMutation";
import Link from "next/link";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { accessToken } from "@components/atoms/Auth";

interface Nft {
  nftId: string;
  imgUrl?: string;
  nftName: string;
  price: number;
  enterprise: string;
  runtime: number;
  roomId: any;
  roomName: string;
}

interface FavResponse {
  message: string;
  statusCode: number;
  user: any;
}

export default function StreamCard({
  roomName,
  nftId,
  imgUrl,
  nftName,
  price,
  roomId,
  runtime,
  enterprise,
}: Nft) {
  const TOKEN = useRecoilValue(accessToken);

  // 좋아요
  const [like, { data: likeData, loading: likeLoading }] =
    useMutation<FavResponse>(`/user/like`);

  return (
    <div>
      <div>
        <div className="h-[10px]"></div>
        <div className="flex flex-col h-full bg-white rounded-[10px] transition hover:scale-[1.02] cursor-pointer shadow-md hover:shadow-xl">
          <Link href={`/streams/${roomId}`}>
            <a className="flex flex-col h-full overflow-hidden rounded-[10px]">
              {/* 이미지 */}
              <div className="h-[311px] rounded-t-[10px] relative">
                <div className="w-full h-full">
                  <div className="flex flex-col justify-center items-center bg-basicImage w-full h-full relative rounded-t-[10px]">
                    <div className="flex justify-center items-center h-full max-h-full max-w-full overflow-hidden relative">
                      <img
                        src={imgUrl}
                        className="object-contain w-auto h-auto max-w-full max-h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* 정보 */}
              <div className="w-full h-[126px] flex justify-between flex-col">
                {/* 상 */}
                <div className="flex justify-between p-3">
                  <div className="mr-3 min-w-0 w-[60%]">
                    <div className="flex items-center mb-1">
                      <div className="max-w-[80%]">
                        <div className="text-xs font-semibold text-gold">
                          <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis tracking-wider">
                            {}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full overflow-hidden text-ellipsis">
                      <div className="text-[#353840] font-medium text-xs text-left">
                        {nftName}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-[40%] items-end">
                    <div className="flex items-center text-[#353840] font-semibold">
                      <div className="cursor-pointer">
                        <div className="overflow-hidden flex flex-col justify-center items-center w-[14px] h-[14px]">
                          <img
                            src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                            className="object-contain w-[14px] h-[14px]"
                          />
                        </div>
                      </div>
                      <div className="ml-[0.3em] w-full overflow-hidden whitespace-nowrap text-ellipsis text-[14px]">
                        {price}
                      </div>
                    </div>
                  </div>
                </div>
                {/* 하 */}
                <div className="flex items-center justify-between font-medium p-3 h-[42px] w-full bg-transparent bg-gradient-to-b from-[#fbfdff] to-white">
                  <div></div>
                  <div className="flex items-center">
                    <div className="flex">
                      {roomName} {enterprise}
                    </div>
                    <span className="font-medium text-xs text-textGray">
                      <div className="ml-[5px]">{runtime}</div>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
