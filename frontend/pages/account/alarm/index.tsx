import { AccountLayout, Layout } from "@components/ui/layout";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";

const Alarm: NextPage = () => {
  const { user, isLoading } = useUser();
  return (
    <Layout seoTitle="알림">
      <AccountLayout>
        <div className="mt-7 mx-[52px] text-textBlack max-w-[800px] flex-1">
          <div className="mt-9">
            <h1 className="font-semibold text-[40px]">알림</h1>
          </div>
          {/* 아래 */}
          <div className="mt-[30px]"></div>
        </div>
      </AccountLayout>
    </Layout>
  );
};
export default Alarm;
