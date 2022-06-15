// 기업 아이디 생성 페이지
// 관리자만 접근 가능

import { NextPage } from "next";
import { Layout } from "@components/ui/layout";
import useMutation from "libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface PartnerSignupForm {
  email: string;
  password: string;
  checkPw: string; // 비밀번호 확인
  realName: string;
  nickname: string;
}

interface PartnerSignupResponse {
  message: string;
  statusCode: number;
}
const PartnerSignup: NextPage = () => {
  const router = useRouter();

  // request
  const [signup, { loading, data, error }] =
    useMutation<PartnerSignupResponse>("/user/enterpirse");

  // input 값 받아옴
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<PartnerSignupForm>({ mode: "onBlur" });

  // 중복검사 시작했는지 확인 (중복검사를 시작했을때부터 SuccessMessage 보이기 위함)
  const [startCheckNick, setStartCheckNick] = useState(false);
  const changeStartCheckNick = () => {
    setStartCheckNick(true);
    return true;
  };

  // form 제출 시 실행
  const onValid = (formData: PartnerSignupForm) => {
    // console.log(formData);
    if (loading) return;

    if (window.confirm("해당 정보로 가입하시겠습니까?") == true) {
      signup(formData);
    }
  };

  // server 응답 받았을 때 실행
  useEffect(() => {
    if (data && data.statusCode === 200) {
      alert(`고객사 계정이 생성되었습니다!`);
      router.push(`/`); // 로그인 페이지로 이동
    }
  }, [data, router]);

  return (
    <Layout seoTitle="회원가입">
      <div className="mt-7 mx-[52px] text-textBlack max-w-[800px] flex flex-col">
        <div className="mt-9">
          <h1 className="font-semibold text-[40px]">고객사 회원가입</h1>
        </div>
        {/* 아래 */}
        <div className="mt-[30px]">
          <div className="pb-6">
            <div className="flex flex-col lg:flex-row">
              {/* 좌 */}
              <form onSubmit={handleSubmit(onValid)} className="w-full">
                <div className="mb-6 flex flex-col">
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <label className="font-semibold">이메일</label>
                    </div>
                    <div className="bg-white rounded-[10px] border w-full p-3 cursor-text focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold">
                      <input
                        {...register("email", {
                          required: "필수 정보입니다.",
                        })}
                        className="w-full outline-none placeholder:text-sm placeholder:text-textGray px-3 py-2"
                        placeholder="이메일을 입력해주세요."
                      />
                      <p className="mt-[3px] text-xs text-[#ff5e57] px-3">
                        {errors?.email?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-6 flex flex-col">
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <label className="font-semibold">비밀번호</label>
                    </div>
                    <div className="bg-white rounded-[10px] border w-full p-3 cursor-text focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold">
                      <input
                        {...register("password", {
                          required: "필수 정보입니다.",
                        })}
                        type="password"
                        maxLength={16}
                        className="w-full border-none focus:ring-0 outline-none placeholder:text-sm placeholder:text-textGray"
                        placeholder="비밀번호를 입력해주세요."
                      />
                      <p className="mt-[3px] text-xs text-[#ff5e57] px-3">
                        {errors?.password?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-6 flex flex-col">
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <label className="font-semibold">비밀번호 확인</label>
                    </div>
                    <div className="bg-white rounded-[10px] border w-full p-3 cursor-text focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold">
                      <input
                        {...register("checkPw", {
                          required: "필수 정보입니다.",
                          validate: {
                            checkPassword: (value) => {
                              const { password } = getValues();
                              return (
                                password === value ||
                                "비밀번호가 일치하지 않습니다."
                              );
                            },
                          },
                        })}
                        type="password"
                        maxLength={16}
                        className="w-full border-none focus:ring-0 outline-none placeholder:text-sm placeholder:text-textGray"
                        placeholder="비밀번호와 동일하게 입력해주세요."
                      />
                      <p className="mt-[3px] text-xs text-[#ff5e57] px-3">
                        {errors?.checkPw?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-6 flex flex-col">
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <label className="font-semibold">이름</label>
                    </div>
                    <div className="bg-white rounded-[10px] border w-full p-3 cursor-text focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold">
                      <input
                        {...register("realName", {
                          required: "필수 정보입니다.",
                        })}
                        className="w-full outline-none placeholder:text-sm placeholder:text-textGray px-3 py-2"
                        placeholder="이름을 입력해주세요."
                      />
                      <p className="mt-[3px] text-xs text-[#ff5e57] px-3">
                        {errors?.realName?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-6 flex flex-col">
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <label className="font-semibold">닉네임</label>
                    </div>
                    <div className="bg-white rounded-[10px] border w-full p-3 cursor-text focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold">
                      <input
                        {...register("nickname", {
                          required: "필수 정보입니다.",
                          validate: {
                            checkNickname: async (value) =>
                              (await fetch(
                                `${process.env.BASE_URL}/user/nickname/${value}`
                              )
                                .then((res) => res.json())
                                .then((result) => result))
                                ? startCheckNick
                                  ? true
                                  : changeStartCheckNick()
                                : "이미 사용중인 닉네임 입니다.",
                          },
                        })}
                        className="w-full outline-none placeholder:text-sm placeholder:text-textGray px-3 py-2"
                        placeholder="닉네임을 입력해주세요."
                      />
                      {startCheckNick && !errors?.nickname?.message ? (
                        <p className="mt-[3px] text-xs text-[#05c46b] px-3">
                          사용 가능한 닉네임 입니다.
                        </p>
                      ) : (
                        <p className="mt-[3px] text-xs text-[#ff5e57] px-3">
                          {errors?.nickname?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* form button */}
                <div className="my-[30px]">
                  <button className="font-semibold px-5 py-3 rounded-[10px] bg-lightGold border border-lightGold text-white hover:bg-gold hover:shadow-md focus:bg-gold focus:outline-none">
                    가입하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartnerSignup;
