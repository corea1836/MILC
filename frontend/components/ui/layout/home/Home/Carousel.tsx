import styled from "styled-components";
import Button from "../styled/Button.styled";
import { Colors, Devices } from "../Theme";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Nft } from "@components/ui/common/item";
// hi

const CarouselEl = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  margin-top: 3rem;
  gap: 1rem;

  @media ${Devices.Tablet} {
    padding: 1rem 3rem;
  }

  @media ${Devices.Laptop} {
    padding: 1rem 5%;
  }

  @media ${Devices.LaptopL} {
    padding: 1rem 10%;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 1rem;
`;
const CtrlBtn = styled.span<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(p) => (p.active ? "pointer" : "")};
  width: 3rem;
  height: 3rem;
  color: ${(p) => (p.active ? Colors.Primary : Colors.Background)};
  font-size: 1.5rem;
  background-color: ${Colors.PrimaryDark};
  border-radius: 50%;
`;

const ItemContainer = styled.div`
  overflow: hidden;
  overflow-x: auto;
  width: 100%;
  display: flex;
  gap: 2rem;

  scrollbar-width: 0;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  display: flex;
  /* cursor: pointer; */
  flex-direction: column;
  height: 35vh;
  align-items: center;
  gap: 0.7rem;
  transition: background-color 0.2s ease-in-out;
  border-radius: 15px;
  padding: 0.8rem 1rem;
  box-shadow: 0 4px 40px rgb(0 0 0/ 10%);

  :hover {
    background-color: ${Colors.PrimaryDark};
  }
`;
const Avatar = styled.span`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  height: 120px;
  width: 120px;
`;
const Name = styled.h4`
  font-weight: 400;
  color: white;
`;
const BottomSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
`;
const Badge = styled.span<{ number: any }>`
  position: relative;
  display: inline-block;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${Colors.Primary};

  ::after {
    content: ${(p) => (p.number ? `'${p.number}'` : "")};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${Colors.Background};
    font-size: 0.8rem;
  }
`;
const Amount = styled.span``;

const Brands = [{ name: "" }];

interface IUser {
  address1: string;
  address2: string;
  backgroundImg: string;
  description: string;
  email: string;
  id: number;
  nickname: string;
  phone: string;
  proImg: string;
  userName: string;
  zipCode: string;
}
interface BrandResponse {
  message: string;
  statusCode: number;
  users: IUser[];
}
export default function Carousel() {
  const ItemContainerRef: any = useRef(null);
  // b => beginning | m => middle | e => end
  const [ScrollInd, setScrollInd]: any = useState("b");

  const { data } = useSWR<BrandResponse>(
    `${process.env.BASE_URL}/user/enterprise`
  );

  return (
    <CarouselEl
      data-aos="fade-up"
      data-aos-delay="300"
      data-aos-duration="1000"
      className="duration-500"
    >
      <div className="text-4xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold">
        Top Brands
      </div>
      <Controls>
        <CtrlBtn
          active={ScrollInd === "e" || ScrollInd === "m"}
          onClick={() => {
            ItemContainerRef.current.scroll({
              left: ItemContainerRef.current.scrollLeft - 200,
              behavior: "smooth",
            });
          }}
        >
          <BsChevronLeft />
        </CtrlBtn>
        <CtrlBtn
          active={ScrollInd === "b" || ScrollInd === "m"}
          onClick={() => {
            ItemContainerRef.current.scroll({
              left: ItemContainerRef.current.scrollLeft + 200,
              behavior: "smooth",
            });
          }}
        >
          <BsChevronRight />
        </CtrlBtn>
      </Controls>
      <ItemContainer
        ref={ItemContainerRef}
        onScroll={(e) => {
          const { scrollWidth, scrollLeft, offsetWidth }: any = e.target;
          const SL = Math.ceil(scrollLeft + offsetWidth);
          if (scrollLeft <= 0) setScrollInd("b");
          if (scrollLeft > 0 && scrollLeft < scrollWidth) setScrollInd("m");
          if (SL >= scrollWidth) setScrollInd("e");
        }}
      >
        {data?.users.map((brand, i) => {
          return (
            <Link href={`/profile/${brand.nickname}`} passHref key={i}>
              <a>
                <Item>
                  <Avatar>
                    {brand && brand.proImg ? (
                      <Image
                        src={`https://imagedelivery.net/VMYwPRIpsXwlX0kB6AjPIA/${brand.proImg}/avatar`}
                        height="120"
                        width="120"
                      />
                    ) : null}
                  </Avatar>
                  <Name>{brand.nickname}</Name>
                  <BottomSection>
                    <Badge number={i} />
                    <Amount>{brand.userName}</Amount>
                  </BottomSection>
                </Item>
              </a>
            </Link>
          );
        })}
      </ItemContainer>
    </CarouselEl>
  );
}
