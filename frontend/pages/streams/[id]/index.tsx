import { ProfileImg } from "@components/cloudflare";
import { Layout } from "@components/ui/layout";
import Message from "@components/ui/message";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import useSWR from "swr";
import Timer from "@components/ui/timer/index";
import GlobalStyle from "@styles/GlobalStyle";
import { getUserBalance, purchaseMarketItem } from "utils/interact";
import { accessToken } from "@components/atoms/Auth";

let stompClient: any = null;
// 백에서 해당 룸 상세조회 api 만들면 추가해줘야함
// interface StreamResponse

interface IStreamResponse {
  message: string;
  statusCode: number;
}

interface RoomResponse {
  message: string;
  statusCode: number;
  liveNftResDto: {
    roomId: number;
    userId: number;
    nickname: string;
    cfId: string;
    roomName: string;
    startprice: number;
    cfUrl: string;
    runtime: number;
    cfKey: string;
    starttime: number;
    imgUrl: string;
    nftName: string;
  };
  maxCost: number;
}

const Stream: NextPage = () => {
  const { user } = useUser();
  const [chats, setChats]: any = useState([]);
  const [highMoney, setHighMoney]: any = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [alertPrice, setAlertPrice] = useState(false);
  const [alertUp, setAlertUp] = useState(false);
  const [remainTime, setRemainTime] = useState(0);
  // const [time, setTime]:number = useState(20);
  const [highest, setHighest] = useState(0);
  const [wallet, setWallet] = useState<string | undefined>();
  const [finish, setFinish] = useState(false);
  const [userData, setUserData] = useState({
    nickName: "",

    connected: false,
    message: "",
    // 내 지갑에서 받아와야함
    myAsset: 0,
    // 응찰가
    money: 0,
    proImg: "",
  });
  // 종료 오세허니한테 물어보기
  const [finishStream, { data: mutatedData, loading }] =
    useMutation<IStreamResponse>(`/live?roomId=${router.query.id}`, "PUT");

  const { data, mutate } = useSWR<RoomResponse>(
    router.query.id ? `${process.env.BASE_URL}/live/${router.query.id}` : null
  );

  const myWallet = async () => {
    const tmp = await getUserBalance();
    setWallet(tmp);
  };

  const connect = () => {
    let Sock = new SockJS(`https://j6e206.p.ssafy.io:8080/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onError = () => {
    null;
  };

  const onConnected = () => {
    setUserData({
      ...userData,
      nickName: user.nickname,
      proImg: user.proImg,
      connected: true,
    });

    stompClient.subscribe(`/subscribe/chat/room/${id}`, onMessageRecived);
  };

  const onMessageRecived = (response: any) => {
    const res = JSON.parse(response.body);

    switch (res.status) {
      case "MESSAGE":
        chats.push(res);
        setChats([...chats]);
        break;
      case "AUCTION":
        let don = res.cost;
        setHighest(don);
        highMoney.push(res);
        setHighMoney([...highMoney]);
        break;
    }
  };

  // const onPurchase = async () => {};

  const handleMoney = (e: any) => {
    const { value } = e.target;
    setUserData({ ...userData, money: value });
  };
  const handleMessage = (event: any) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.nickName,
        message: userData.message,
        status: "MESSAGE",
        roomId: id,
      };
      stompClient.send(
        "/publish/chat/message",
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrice = () => {
    if (stompClient && userData.money <= highest) {
      setAlertUp(true);
    } else if (
      stompClient &&
      data &&
      data.liveNftResDto.startprice >= userData.money
    ) {
      setAlertPrice(true);
    } else if (stompClient && userData.money <= 2100000000) {
      setAlertUp(false);
      setAlertPrice(false);
      const priceList = {
        senderName: userData.nickName,
        cost: Number(userData.money),
        roomId: id,
        status: "AUCTION",
      };
      stompClient.send("/publish/chat/auction", {}, JSON.stringify(priceList));
      if (!data) return;
      mutate(
        {
          ...data,
          maxCost: userData.money,
        },
        false
      );
      // 응찰가격 0으로 리셋
      setUserData({ ...userData, money: 0 });
    }
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      sendValue();
    }
  };
  const registerUser = async () => {
    await connect();
  };
  // user 데이터 다 받아오면 소켓 연결합니다
  useEffect(() => {
    if (user && id) {
      registerUser();
    } else "오잉";
  }, [user, id]);

  useEffect(() => {
    if (data) {
      let runtime = data?.liveNftResDto?.runtime * 60 * 1000;
      // console.log(finish);
      setRemainTime(
        Math.round(
          (runtime - (new Date().getTime() - data?.liveNftResDto?.starttime)) /
            1000
        )
      );
    }
    if (data && data?.statusCode === 200 && finish) {
      // db finish 정보 바꾸기

      finishStream(mutatedData);
    }
  }, [data, finish]);

  return (
    // navbar 뒤로가기만 생성
    <Layout canGoBack seoTitle="라이브 경매">
      <GlobalStyle />

      <div
        className="absolute flex 
       justify-center  mt-3 md:mt-4 text-3xl w-full font-semibold text-slate-800"
      >
        {remainTime ? (
          <>
            <span className="mr-2">남은 시간 </span>
            <Timer setRemainTime={setRemainTime} time={remainTime} />
          </>
        ) : (
          <div>경매가 끝났습니다</div>
        )}
      </div>
      <div className="flex justify-center flex-col  md:flex-row gap-x-4 min-h-screen px-3">
        <div className="md:w-2/4 pt-5  ">
          <div className="flex justify-evenly  md:justify-between px-3 pt-3 ">
            <div className=" justify-between mt-1 ">
              <Link href="/">
                <a className=" text-[25px]   font-[600] bg-clip-text text-transparent bg-gradient-to-r  from-gold to-lightGold    px-1 ">
                  &larr;HOME
                </a>
              </Link>
            </div>
          </div>

          <iframe
            className="aspect-video   w-full border border-gold rounded-md  shadow-sm"
            src={`https://iframe.videodelivery.net/${data?.liveNftResDto?.cfId}`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
          ></iframe>

          <div className="flex flex-col text-darkBg md:flex-row gap-x-2 ">
            <div className=" border-2  basis-2/5 bg-white mt-2 justify-center p-2  flex items-center rounded-md ">
              {data?.liveNftResDto?.imgUrl ? (
                <img src={data?.liveNftResDto?.imgUrl} alt="#" />
              ) : null}
            </div>
            <div className="space-y-1 ">
              <span className="text-[25px]   font-[600] bg-clip-text text-transparent bg-gradient-to-r  from-gold to-lightGold  mt-2  px-1 ">
                {data?.liveNftResDto?.nickname}
              </span>
              <div className="flex justify-between">
                <span className="text-lg  font-semibold ">
                  {data?.liveNftResDto?.nftName}
                </span>
                <span className="text-lg  font-semibold ">
                  {data?.liveNftResDto?.startprice}
                  <img
                    className="w-5 h-5 inline-block object-contain"
                    src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                    alt="ETH"
                  />
                </span>
              </div>

              <div>
                {data?.liveNftResDto?.nickname === userData.nickName ? (
                  <div className=" border-2 h-[17vh] rounded-md hover:border-2 flex flex-col justify-center gap-y-2 hover:border-slate-300 p-1 bg-slate-200 text-xs">
                    <p>
                      <span className="font-bold">서버</span>{" "}
                      {data.liveNftResDto?.cfUrl}
                    </p>
                    <p>
                      <span className="font-bold">방송열쇠</span>
                      {data.liveNftResDto?.cfKey}
                    </p>
                  </div>
                ) : (
                  <div className=" border-2 h-[17vh] rounded-md hover:border-2 hover:border-slate-300 p-1 bg-slate-200 text-base">
                    나의 지갑 자산 :
                    <span className="text-lg  font-semibold">{wallet}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 경매열 */}
        <div className="pt-5 md:mt-[55px] md:w-[21vw] ">
          {/* 실시간 응찰 내역 */}
          <div
            id="scrollBar"
            className="bg-white h-[61vh] p-3 rounded-md  border-2  flex flex-col items-center  space-y-3  overflow-y-scroll"
          >
            <span className="text-xl   text-center font-bold text-darkBg">
              실시간 응찰
              <hr className="" />
              <hr />
            </span>
            {highMoney.map((val: any, i: number) => (
              <span key={i} className="text-gray-800 ">
                {val.senderName}님께서{" "}
                <span className="font-extrabold text-black">
                  {val.cost}
                  <img
                    className="w-5 h-5 inline-block object-contain"
                    src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                    alt="ETH"
                  />
                </span>
                응찰하셨습니다
              </span>
            ))}
          </div>
          {/* 최고가 갱신 */}
          <div className="bg-lightGold h-[12vh] text-xl flex rounded-md  border-2  border-lightBg items-center justify-center space-y-3">
            <span className="text-gray-800">
              최고가는{" "}
              <span className="font-extrabold text-black">
                {data?.maxCost}

                <img
                  className="w-5 h-5 inline-block object-contain"
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="ETH"
                />
              </span>
              입니다
            </span>
          </div>
          {/* 응찰하기  */}
          <div className="bg-lightGold  h-[13vh] flex flex-col gap-x-1 relative  w-full items-center  mx-auto justify-center border-2 border-lightBg  rounded-md  space-y-3">
            <div className="flex justify-center ">
              {alertPrice ? (
                <div>시작가격보다 높은 금액을 응찰하세요</div>
              ) : null}
              {alertUp ? <div>최고가보다 높은 금액을 응찰하세요</div> : null}
            </div>
            {remainTime > 0 ? (
              <div className="flex justify-center  gap-x-2">
                <input
                  type="text"
                  className="shadow-sm  rounded-md w-5/6 border-gray-300 focus:ring-gold focus:outline-none pr-12 focus:border-lightGold "
                  placeholder="응찰가를 입력하세요"
                  value={userData.money}
                  onChange={handleMoney}
                />
                <button
                  type="button"
                  className="focus:ring-2 focus:ring-offset-2 focus:ring-gold focus:duration-300   items-center flex  bg-gold rounded-full px-4 hover:bg-gold text-white"
                  onClick={sendPrice}
                >
                  +
                </button>
              </div>
            ) : remainTime <= 0 &&
              highMoney[highMoney.length - 1]?.senderName ===
                userData.nickName ? (
              <div
                // onClick={() => onPurchase()}
                className="btn hover:cursor-pointer font-bold text-xl text-white hover:duration-200 bg-gold p-2 rounded-md hover:scale-105"
              >
                구매하기
              </div>
            ) : (
              <span className="font-semibold pb-2">경매가 종료되었습니다</span>
            )}
          </div>
        </div>
        {/* 채팅 */}
        <div className="pt-5 md:mt-[55px] md:w-[21vw] ">
          <div className="border-2 rounded-md">
            <h2 className="text-2xl py-2 text-center font-bold bg-white  text-gray-900"></h2>
            <div
              id="scrollBar"
              className="py-10 pb-16 h-[77vh] overflow-y-scroll  bg-white px-4 space-y-4"
            >
              {chats.map((chat: any, index: number) => (
                <Message
                  key={index}
                  message={chat.message}
                  reversed={chat.senderName === userData.nickName}
                  nickName={chat.senderName}
                  isHost={chat.senderName === data?.liveNftResDto?.nickname}
                  proImg={userData.proImg}
                />
              ))}
            </div>
          </div>
          <div className=" bottom-0  inset-x-0">
            <div className="flex relative  w-full items-center  mx-auto">
              <input
                type="text"
                onKeyPress={onKeyPress}
                value={userData.message}
                onChange={handleMessage}
                className="shadow-sm  rounded-md w-full border-gray-300 focus:ring-gold focus:outline-none pr-12 focus:border-lightGold"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button
                  onClick={sendValue}
                  className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-gold rounded-full px-3 hover:bg-gold text-sm text-white"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
