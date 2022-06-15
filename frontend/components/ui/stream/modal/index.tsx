import { useEffect, useState } from "react";
import { Modal } from "../../common";
import {
  purchaseMarketItem,
  marketContract,
  nftContract,
  loadMarketItems,
  sellMarketItem,
} from "../../../../utils/interact";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";

declare let window: any;

interface Iresponse {
  response:
    | {
        nftId: string;
        address: any;
        image: any;
        name: any;
        description: any;
        edition: any;
        product: any;
        brandName: any;
      }
    | undefined;
  onClose: Function;
}

interface CreateResponse {
  message: string;
  statusCode: number;
  roomId: number;
}

export default function StreamModal({ response, onClose }: Iresponse) {
  const [isOpen, setIsOpen] = useState(true);
  const [price, setPrice] = useState("");
  const nftId = response?.nftId;

  const [makeStream, { data, loading }] = useMutation<CreateResponse>(`/live`);
  const { user, isLoading } = useUser();
  const router = useRouter();

  const [streamData, setStreamData] = useState({
    // cfId: "",
    // cfKey: "",
    // cfUrl: "",
    nickname: "",
    roomName: "",
    runtime: 0,
    startprice: 0,
    userId: 0,
  });
  const handleRoomName = (event: any) => {
    const { value } = event.target;
    setStreamData({ ...streamData, roomName: value });
  };
  const handleRunTime = (event: any) => {
    const { value } = event.target;
    setStreamData({ ...streamData, runtime: value });
  };
  const handleStartPrice = (event: any) => {
    const { value } = event.target;
    setStreamData({ ...streamData, startprice: value });
  };

  // 방 만들기 버튼 누를 때, 스트리밍 생성 함수 실행
  const makeRoom = async () => {
    if (streamData.roomName === "") {
      alert("방제목을 입력해주세요");
    } else if (streamData.runtime === 0) {
      alert("진행 시간을 입력해주세요");
    } else if (streamData.startprice === 0) {
      alert("시작 가격을 지정해주세요");
    } else {
      const { uid, streamKey, url } = await (
        await fetch(`/api/streams`)
      ).json();
      console.log(uid, streamKey, url);
      /////////////////////////////////////////////////
      const startTime = new Date().getTime();
      console.log(startTime);
      console.log();
      makeStream({
        ...streamData,
        cfId: uid,
        cfKey: streamKey,
        cfUrl: url,
        starttime: startTime,
        nftId: response?.nftId,
      });
    }
  };

  // 최초 들어온 유저 데이터 갱신
  useEffect(() => {
    setStreamData({
      ...streamData,
      nickname: user?.nickname,
      userId: user?.id,
    });
  }, [user]);

  useEffect(() => {
    // makeStream(streamData);
    console.log(streamData);
    if (data && data.statusCode === 200) {
      router.push(`/streams/${data.roomId}`);
    }
  }, [data, router]);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="">
            <div className="mt-3 sm:mt-0 sm:text-left">
              <div className="flex justify-between mx-2">
                <div>
                  {" "}
                  <h3
                    className="mb-7 text-lg font-bold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    라이브 경매방 생성하기
                  </h3>
                </div>

                <div>
                  <button
                    className="flex justify-center items-center py-2 px-4 border-gold rounded-md shadow-sm bg-white text-sm font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="mt-1 relative rounded-md flex items-center">
                <div className="">
                  <div className="mb-1">
                    <img
                      src={response?.image}
                      className="w-[200px] h-[auto]"
                      alt=""
                    />
                  </div>
                </div>
                <div className="block pl-4">
                  <div>
                    <div className="text-sm font-bold mb-1">방제목</div>
                    <div>
                      <input
                        placeholder="방제목"
                        value={streamData.roomName}
                        onChange={handleRoomName}
                        className="bg-white rounded-[10px] border max-w-[600px] p-3 cursor-text focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold mb-4 focus-within:outline-none"
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-1">진행시간</div>
                    <div>
                      <input
                        placeholder="진행시간"
                        value={streamData.runtime}
                        onChange={handleRunTime}
                        className="bg-white rounded-[10px] border max-w-[600px] p-3 cursor-text focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold mb-4 focus-within:outline-none"
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-1">시작가격</div>
                  </div>
                  <div className="mb-2 flex flex-wrap">
                    <div className="text-[20px] font-semibold flex items-center">
                      <div>
                        <img
                          className="w-5 h-5 object-contain"
                          src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                          alt="ETH"
                        />
                      </div>
                      <div className="ml-1 w-full overflow-hidden text-ellipsis flex items-end">
                        <input
                          placeholder="시작가격"
                          value={streamData.startprice}
                          onChange={handleStartPrice}
                          className="bg-white rounded-[10px] border max-w-[600px] p-3 cursor-text focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold mb-4 focus-within:outline-none"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="text-[15px] mt-[15px]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <button
            onClick={() => makeRoom()}
            className="w-full flex justify-center items-center my-4 py-2 px-4 border-gold rounded-md shadow-sm bg-white text-sm font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white"
            // disabled={formState.isDisabled}
            // onClick={() => {
            //   onSubmit(order, course);
            // }}
          >
            경매 시작하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
