import styled from "styled-components";
import Image from "next/image";
import { Colors } from "../Theme";
import { BsHeart } from "react-icons/bs";
// hi

const NFTCardEl = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Card = styled.div`
  border-radius: 15px;
  overflow: hidden;
  z-index: 2;
  background-color: ${Colors.White};
  color: ${Colors.Black};
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 40px rgb(0 0 0/10%);
`;

const BadgeEl = styled.span`
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 3;
  background: linear-gradient(
    to right,
    ${Colors.Gradients.PrimaryToSec[0]},
    ${Colors.Gradients.PrimaryToSec[1]}
  );
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: 500;
  color: ${Colors.White};
`;

const ItemImage = styled.div``;
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  flex: 1;
  gap: 0.5rem;
`;
const TSection = styled.div`
  display: flex;
  justify-content: space-between;
`;
const EditionEl = styled.span`
  font-weight: 500;
`;
const StockEl = styled.span`
  color: ${Colors.Primary};
  font-weight: 600;
`;
const ItemTitle = styled.h2`
  font-size: 1.4rem;
`;
const PriceSection = styled.div``;
const BottomSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;
const AvatarEl = styled.span`
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  height: 50px;
  width: 50px;
  margin-right: 0.5rem;
`;

const AuthorEl = styled.span``;
const LikesEl = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.5rem;

  > svg {
    cursor: pointer;
  }
`;

const Bar1 = styled.span`
  width: 93%;
  height: 0.7rem;
  background-color: ${Colors.White};
  border-radius: 0 0 50px 50px;
  box-shadow: inset 0 4px 5px rgb(0 0 0 /10%);
  z-index: 1;
  /* filter: brightness(0.7); */
  transform: translateY(-30%);
`;
const Bar2 = styled(Bar1)`
  width: 88%;
  transform: translateY(-60%);
  /* filter: brightness(0.5); */
  z-index: 0;
`;
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
export default function NFTCard({ item }: any) {
  const {
    nftId,
    imgUrl,
    enterprise,
    nftName,
    price,
    myLike,
    Price,
    likeCount,
  } = item;
  return (
    <NFTCardEl className="hover:scale-[1.02] my-3 duration-300">
      <Card className=" h-[80vh] justify-center flex flex-col items-center">
        <BadgeEl>{enterprise}</BadgeEl>
        <ItemImage>
          {imgUrl ? (
            <img src={imgUrl} alt="#" width="1024" height="800" />
          ) : (
            <div className="w-[70vw] sm:w-[40vw] md:w-[20vw] h-60 flex justify-center"></div>
          )}
        </ItemImage>
        <InfoSection>
          <TSection>
            <StockEl>
              <img
                className="w-5 h-5 inline-block object-contain"
                src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                alt="ETH"
              />
              {price} eth for sale
            </StockEl>
          </TSection>
          <ItemTitle>{nftName}</ItemTitle>

          <BottomSection>
            <AvatarEl></AvatarEl>
            <LikesEl>
              <BsHeart /> {likeCount}
            </LikesEl>
          </BottomSection>
        </InfoSection>
      </Card>
      <Bar1 />
      <Bar2 />
    </NFTCardEl>
  );
}
