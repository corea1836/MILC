import useMutation from "@libs/client/useMutation";
import Link from "next/link";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { accessToken } from "@components/atoms/Auth";

export interface Nft {
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

interface FavResponse {
  message: string;
  statusCode: number;
  user: any;
}

export default function Item({
  enterprise,
  imgUrl,
  likeCount,
  nftId,
  nftName,
  price,
  myLike,
}: Nft) {
  const TOKEN = useRecoilValue(accessToken);

  const [likeState, setLikeState] = useState(myLike);
  const [likeCountState, setLikeCountState] = useState(likeCount);

  // 좋아요
  const [like, { data: likeData, loading: likeLoading }] =
    useMutation<FavResponse>(`/user/like`);

  // 좋아요 취소
  const [disLike, { data: disLikeData, loading: disLikeLoading }] =
    useMutation<FavResponse>(`/user/like`, "DELETE");

  // 좋아요 버튼 클릭 시
  const onLikeClick = (event: any) => {
    event.preventDefault(); // 이벤트 버블링 방지
    if (likeLoading) return;
    if (disLikeLoading) return;

    if (likeState) {
      // 좋아요 누른 상태일 때
      setLikeState(!likeState);
      setLikeCountState(likeCountState - 1);
      disLike({ nftId: nftId });
    } else {
      // 좋아요 누르지 않은 상태일 때
      setLikeState(!likeState);
      setLikeCountState(likeCountState + 1);
      like({ nftId: nftId });
    }
  };

  return (
    <div>
      <div>
        <div className="h-[10px]"></div>
        <div className="flex flex-col h-full bg-white rounded-[10px] transition hover:scale-[1.02] cursor-pointer shadow-md hover:shadow-xl">
          <Link href={`/product/${nftId}`}>
            <a className="flex flex-col h-full overflow-hidden rounded-[10px]">
              {/* 이미지 */}
              <div className="h-[311px] rounded-t-[10px] relative">
                <div className="w-full h-full">
                  <div className="flex flex-col justify-center items-center bg-white w-full h-full relative rounded-t-[10px]">
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
                            {enterprise}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full overflow-hidden text-ellipsis">
                      <div className="text-[#353840] font-medium text-xs text-left overflow-hidden whitespace-nowrap text-ellipsis">
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
                      <button
                        onClick={TOKEN ? onLikeClick : undefined}
                        className={`${
                          likeState
                            ? "text-red-500  hover:text-red-600"
                            : "text-gray-400  hover:text-gray-500"
                        } inline-flex items-center`}
                      >
                        {likeState ? (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <span className="font-medium text-xs text-textGray">
                      <div className="ml-[5px]">{likeCountState}</div>
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
