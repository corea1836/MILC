// 수정 금지

import Footer from "@components/ui/common/footer";
import Header from "@components/ui/common/navbar";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
  seoTitle?: string;
  canGoBack?: boolean;
}

export default function Layout({ children, seoTitle, canGoBack }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>MILC | {seoTitle}</title>
      </Head>
      {canGoBack ? (
        <div className="min-h-screen w-full bg-lightBg">{children}</div>
      ) : (
        <>
          <Header />

          <div className="min-h-screen w-full pt-[80px]  bg-lightBg">
            {children}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
