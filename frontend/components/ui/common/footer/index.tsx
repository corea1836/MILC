import styled from "styled-components";
import { Colors } from "@components/ui/layout/home/Theme";
// hi

const FooterEl = styled.footer`
  display: flex;

  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  color: ${Colors.White};
  padding: 1rem 2rem;
`;

const CopyRight = styled.small`
  font-size: 0.9rem;
`;

export default function Footer() {
  return (
    <FooterEl>
      <CopyRight>SSAFY 6th MILC</CopyRight>
    </FooterEl>
  );
}
