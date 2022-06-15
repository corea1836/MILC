// 수정 금지
// blueprint
// 페이지에 접근할 때 가장 먼저 보는 곳 (페이지 불러올 때마다 브라우저에서 실행)

import "@styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";
import Script from "next/script";
import GlobalStyle from "@styles/GlobalStyle";

// Component: 접근하고자 하는 페이지의 컴포넌트를 가져옴 (pages 폴더에 있는 해당 파일)
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <RecoilRoot>
        <GlobalStyle />
        <Component {...pageProps} />
        {/* 주소 찾기 */}
        <Script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="lazyOnload"
        />
      </RecoilRoot>
    </SWRConfig>
  );
}

export default MyApp;
