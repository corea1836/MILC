import styled from "styled-components";
import { Colors } from "../Theme";
// hi
const Button = styled.button<{ round: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: ${Colors.White};
  border: none;
  border-radius: ${(p) => (p.round ? "50px" : "5px")};
  width: max-content;
`;
export default Button;
