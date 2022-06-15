import Hero from "@components/ui/layout/home/Home/Hero";
import AOS from "aos";
import Carousel from "@components/ui/layout/home/Home/Carousel";
import TopCollectibles from "@components/ui/layout/home/Home/TopCollectibles";
import { useEffect } from "react";
import { Layout } from "@components/ui/layout";

export default function Home() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <Layout seoTitle="메인">
      <div className="bg-ourBlack">
        <Hero />
        <Carousel />
        <TopCollectibles />
      </div>
    </Layout>
  );
}
