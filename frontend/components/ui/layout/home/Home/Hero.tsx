import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Colors, Devices } from "@components/ui/layout/home/Theme";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState, useEffect } from "react";
import Button from "../styled/Button.styled";
import AOS from "aos";
import "aos/dist/aos.css";
import useSWR from "swr";

// hi

const Title = styled.h1`
  margin-bottom: 3rem;
  font-weight: 500;
  font-size: 1.7rem;

  @media ${Devices.Laptop} {
    font-size: 2.7rem;
  }
`;

const Slider = styled.div`
  position: relative;
  height: 35vh;
  min-height: 230px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  overflow: hidden;
  box-shadow: 0px 0px 3rem ${Colors.Primary};
  border-radius: 20px;

  @media ${Devices.Tablet} {
    height: 50vh;
  }
`;

const ImgContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  filter: brightness(0.6);
  display: block;
`;

const InfoContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 3;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const MiddleSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  & > svg {
    font-size: 2.4rem;
    cursor: pointer;
    @media ${Devices.Tablet} {
      font-size: 3.4rem;
    }
  }
`;

const Date = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
`;
const STitle = styled.h2`
  font-size: 1.3rem;
`;
const Author = styled.span`
  color: ${Colors.Primary};
  font-size: 1.1rem;
  font-weight: 500;
`;
const Arrow = styled.span``;

const Lines = styled.span`
  position: relative;
  z-index: 3;
  display: flex;
  gap: 0.5rem;
`;
const Line = styled.span<{ active: boolean }>`
  display: inline-block;
  width: 2rem;
  height: 0.25rem;
  border-radius: 30px;
  background-color: ${(p) => (p.active ? Colors.Primary : Colors.White)};
`;
const Img = styled.div`
  width: 100%;
  height: 100%;
`;

const Items = [
  {
    Id: 1,
    Badge: "LIVE PLAN",
    Date: "2022 03 30",
    Title: "GUCCI 한정판",
    Author: "GUCCI",

    ImageSrc: "/images/slider/2.png",
  },
  {
    Id: 2,
    Badge: "LIVE NOW",
    Date: "2022 03 27",
    Title: "N°1 DE CHANEL",
    Author: "CHANEL",

    ImageSrc: "/images/slider/3.jpeg",
  },
  {
    Id: 3,
    Badge: "LIVE NOW",
    Date: "2022 03 27",
    Title: "Cabavertige 24 파우치",
    Author: "HERMES",

    ImageSrc: "/images/slider/4.jpg",
  },
];
interface DataList {
  roomId: number;
  userId: number;
  nickname: string;
  cfId: string;
  roomName: string;
  runtime: number;
  finish: Boolean;
}
interface StreamsResponse {
  message: string;
  statusCode: number;
  liveDtoList: DataList[];
}
export default function Hero() {
  const [Index, setIndex] = useState(0);
  const [Slides, setSlides] = useState(Items);
  const [CurSlide, setCurSlide] = useState(Items[0]);
  useEffect(() => {
    AOS.init();
  });
  const { data } = useSWR<StreamsResponse>(`${process.env.BASE_URL}/live`);

  return (
    <div
      className="flex flex-col pt-5 items-center text-center"
      data-aos="fade-up"
      data-aos-delay="150"
      data-aos-duration="1000"
    >
      <Title>
        <span
          data-aos="zoom-y-out"
          className="bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold"
        >
          Melt In Luxury Collection
        </span>
        <div className="text-lightBg text-2xl">
          Buy, sell, and showcase NFTs
        </div>
      </Title>
      <Slider>
        <InfoContainer>
          {/* <Button round>{CurSlide.Badge}</Button> */}

          <MiddleSection>
            <BsChevronLeft
              onClick={() => {
                const indx = Index - 1;
                if (Index > 0) {
                  setIndex(indx);
                  setCurSlide(Slides[indx]);
                  return;
                }
                setIndex(Slides.length - 1);
                setCurSlide(Slides[Slides.length - 1]);
              }}
            />

            <BsChevronRight
              onClick={() => {
                const indx = Index + 1;
                if (Index < Slides.length - 1) {
                  setIndex(indx);
                  setCurSlide(Slides[indx]);
                  return;
                }
                setIndex(0);
                setCurSlide(Slides[0]);
              }}
            />
          </MiddleSection>
        </InfoContainer>
        <Lines>
          {data &&
            data?.liveDtoList?.slice(0, 3).map((stream, index) => {
              return (
                <Line key={stream.roomId} active={index === CurSlide.Id} />
              );
            })}
        </Lines>
        <ImgContainer>
          <Img>
            <Image layout="fill" src={CurSlide.ImageSrc} />
          </Img>
        </ImgContainer>
      </Slider>
    </div>
  );
}
