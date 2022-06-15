import styled from "styled-components";
import { NFTs } from "../../../../Info";
import { Colors, Devices } from "@components/ui/layout/home/Theme";

import Link from "next/link";
import NFTCard from "../styled/NFTCard.styled";
import useSWR from "swr";
import { Nft } from "@components/ui/common/item";
// hi

const ShowMore = styled.button`
  margin-top: 1rem;
  cursor: pointer;
  border: 1px solid ${Colors.Primary};
  padding: 0.6rem 1.2rem;
  color: ${Colors.Primary};
  background-color: transparent;
  border-radius: 5px;
  font-size: 1.2rem;
  :hover {
    background-color: ${Colors.Primary};
    color: ${Colors.White};
    duration: 4;
  }
`;
interface BrandResponse {
  message: string;
  statusCode: number;
  nftDtoList: Nft[];
}
export default function TopCollectibles() {
  const { data } = useSWR<BrandResponse>(
    `${process.env.BASE_URL}/nft/search?sort=likeCount,desc`
  );

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="450"
      data-aos-duration="1000"
      className="flex flex-col gap-10 items-center px-12  pt-10"
    >
      <div className="text-4xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold">
        Top Collection
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-6 mx-20">
        {data &&
          data?.nftDtoList.map((nft) => {
            return (
              <Link key={nft.nftId} href={`/product/${nft.nftId}`} passHref>
                <a>
                  <NFTCard item={nft} />
                </a>
              </Link>
            );
          })}
      </div>
      <ShowMore>
        <Link href="/brand">
          <a>더보기</a>
        </Link>
      </ShowMore>
    </div>
  );
}
