import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// interface Stream {

//   nickname: any;
//   roomName: string;
//   runtime: number;
//   startprice: number;
//   userId: number;
// }

interface CreateResponse {
  message: string;
  statusCode: number;
  roomId: number;
}

interface CreateForm {
  roomName: string;
  runtime: number;
  startprice: number;
}

const Create: NextPage = () => {
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
        nftId: "12334",
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

  return (
    <div>
      <input
        type="text"
        placeholder="방제목"
        value={streamData.roomName}
        onChange={handleRoomName}
      />
      <input
        type="number"
        placeholder="진행시간"
        value={streamData.runtime}
        onChange={handleRunTime}
      />
      <input
        type="number"
        placeholder="시작가격"
        value={streamData.startprice}
        onChange={handleStartPrice}
      />
      <button onClick={makeRoom}>가쟈</button>
    </div>
  );
};

export default Create;
