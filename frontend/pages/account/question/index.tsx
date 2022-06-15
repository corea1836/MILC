import { AccountLayout, Layout } from "@components/ui/layout";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";

const Question: NextPage = () => {
  const { user, isLoading } = useUser();

  return (
    <Layout seoTitle="문의">
      <AccountLayout>
        <div className="mt-7 mx-[52px] text-textBlack max-w-[800px] flex-1">
          <div className="mt-9">
            <h1 className="font-semibold text-[40px]">1:1 문의하기</h1>
          </div>
          {/* 아래 */}
          <div className="mt-[30px]">
            <div>
              <h1 className="font-bold pb-1">문의유형</h1>

              <select
                name="문의유형"
                className="w-[100%] mb-4 rounded-md border-gray-300"
                placeholder="문의유형을 선택해주세요."
              >
                <option value="" className="text-textGray">
                  문의유형을 선택해주세요.
                </option>
                <option value="">--------------------------------</option>
                <option value="">NFT거래/오류</option>
                <option value="">실물화</option>
              </select>
            </div>
            <div>
              <h1 className="font-bold pb-1">상품명</h1>
              <select
                name="문의유형"
                className="w-[100%] mb-4 rounded-md border-gray-300"
                placeholder="문의유형을 선택해주세요."
              >
                <option value="" className="text-textGray">
                  문의유형을 선택해주세요.
                </option>
                <option value="">--------------------------------</option>
                <option value="">
                  [CHANEL] 21FW 샤넬 클래식 램스킨 체인 플립백 NFT
                </option>
                <option value="">
                  [GUCCI] 22SS 구찌 오리지날 스네이크 월렛
                </option>
              </select>
            </div>
            <div>
              <h1 className="font-bold pb-1">제목</h1>
              <input
                type="email"
                className="w-[100%] mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300 cursor-not-allowed"
                // 유저 이메일이 나타납니데잉
                placeholder="제목을 입력해주세요."
              />
            </div>
            <div>
              <h1 className="font-bold pb-1">내용</h1>
              <textarea
                className="w-[100%] mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                // 유저 닉네임이 나타나야 합니데잉
                placeholder="내용을 연동해주세요."
              />
            </div>
            <div className="">
              <h1 className="font-bold pb-1">파일첨부</h1>
              <div className="flex w-full items-center justify-center bg-grey-lighter">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg hover:shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                  <svg
                    className="w-8 h-8 text-gold"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal text-textGray">
                    Select a file
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </AccountLayout>
    </Layout>
  );
};
export default Question;
