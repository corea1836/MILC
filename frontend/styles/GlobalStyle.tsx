import { Colors } from "@components/ui/layout/home/Theme";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 

  html,
  body {
    background-color: ${Colors.Background};
    font-family: "Poppins", sans-serif;
    
  }

  p,a,h1,h2,h3,h5,h6,div,span{
    /* color:${Colors.White}; */
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s linear;

  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  /* width */
  body::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  body::-webkit-scrollbar-track {
    background: #ffffff;
  }

  /* Handle */
  body::-webkit-scrollbar-thumb {
    background: #212121;
    border-radius: 20px;
  }

  /* Handle on hover */
  body::-webkit-scrollbar-thumb:hover {
    background: rgb(43, 43, 43);
  }

  #scrollBar::-webkit-scrollbar {
    width: 5px;
  }
  #scrollBar::-webkit-scrollbar-thumb {
    background: #DAC2A9;
    border-radius: 20px;
  }
  #scrollBar::-webkit-scrollbar-thumb:hover {
    background: rgb(43, 43, 43);
  }
 

`;

export default GlobalStyle;
