import { Layout } from "@components/ui/layout";
import useMutation from "libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ISignupForm {
  email: string;
  password: string;
  checkPw: string; // 비밀번호 확인
  realName: string;
  nickname: string;
}

interface ISignupResponse {
  message: string;
  statusCode: number;
}

export default function Signup() {
  const router = useRouter();

  // request
  const [signup, { loading, data, error }] =
    useMutation<ISignupResponse>("/user");

  // input 값 받아옴
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<ISignupForm>({ mode: "onBlur" });

  // 중복검사 시작했는지 확인 (중복검사를 시작했을때부터 SuccessMessage 보이기 위함)
  const [startCheckNick, setStartCheckNick] = useState(false);
  const changeStartCheckNick = () => {
    setStartCheckNick(true);
    return true;
  };

  // form 제출 시 실행
  const onValid = (formData: ISignupForm) => {
    // console.log(formData);
    if (loading) return;

    if (window.confirm("해당 정보로 가입하시겠습니까?") == true) {
      signup(formData);
    }
  };

  // server 응답 받았을 때 실행
  useEffect(() => {
    if (data && data.statusCode === 200) {
      alert(`회원가입을 축하합니다!`);
      router.push(`/login`); // 로그인 페이지로 이동
    }
  }, [data, router]);

  return (
    <Layout seoTitle="회원가입">
      <div>
        <div className="flex items-center ">
          <div className="hidden lg:flex flex-row justify-center items-center  w-[50%] min-h-screen bg-gradient-to-r from-gold to-lightGold">
            <div className="flex flex-col justify-center text-left">
              <div className="text-4xl lg:text-5xl text-white font-bold pb-10">
                <div>최고의 명품을</div>
                <div>NFT로 만나보세요!</div>
              </div>
              <div className="text-white font-bold pb-10 lg:text-xl">
                On the Worlds Best & Largest NFT MarketPlace
              </div>
              {/* <div className="flex justify-between">
                <div className="w-[150px] h-[200px] lg:w-[200px] bg-blue-500">
                  <h1>박스 1</h1>
                </div>
                <div className="w-[150px] h-[200px] lg:w-[200px] bg-blue-500">
                  <h1>박스 2</h1>
                </div>
              </div> */}
            </div>
          </div>
          <div className="px-16 w-[50%]">
            <div className="text-3xl font-bold ">
              <h3>MILC에 오신 것을</h3>
              <h3>환영합니다</h3>
            </div>
            <div className="py-4 ">
              <form onSubmit={handleSubmit(onValid)}>
                <div>
                  <div className="flex flex-wrap items-stretch w-full mb-2 relative h-15 bg-white rounded pr-10">
                    <div className="flex -mr-px justify-center w-15 p-4">
                      <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      {...register("email", {
                        required: "필수 정보입니다.",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "이메일 양식을 지켜주세요.",
                        },
                      })}
                      className="appearance-none  my-1.5 rounded-md focus:outline-none focus:ring-gold focus:border-gold flex-shrink flex-grow  leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                      placeholder="이메일"
                    />
                  </div>
                  <span className="text-xs text-[#ff5e57]">
                    {errors?.email?.message}
                  </span>
                  <div className="flex flex-wrap items-stretch w-full mb-2 relative h-15 bg-white rounded pr-10">
                    <div className="flex -mr-px justify-center w-15 p-4">
                      <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      {...register("password", {
                        required: "필수 정보입니다.",
                        pattern: {
                          value:
                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
                          message:
                            "8~16자의 영문 대 소문자, 숫자, 특수문자 조합만 사용 가능합니다.",
                        },
                      })}
                      type="password"
                      maxLength={16}
                      className="appearance-none  my-1.5 rounded-md focus:outline-none focus:ring-gold focus:border-gold flex-shrink flex-grow  leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                      placeholder="비밀번호"
                    />
                  </div>
                  <span className="text-xs text-[#ff5e57]">
                    {errors?.password?.message}
                  </span>
                  <div className="flex flex-wrap items-stretch w-full mb-2 relative h-15 bg-white rounded pr-10">
                    <div className="flex -mr-px justify-center w-15 p-4">
                      <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    </div>
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
                      className="appearance-none  my-1.5 rounded-md focus:outline-none focus:ring-gold focus:border-gold flex-shrink flex-grow  leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                      placeholder="비밀번호 확인"
                    />
                  </div>
                  <span className="text-xs text-[#ff5e57]">
                    {errors?.checkPw?.message}
                  </span>
                  <div className="flex flex-wrap items-stretch w-full mb-2 relative h-15 bg-white rounded pr-10">
                    <div className="flex -mr-px justify-center w-15 p-4">
                      <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      {...register("realName", {
                        required: "필수 정보입니다.",
                        pattern: {
                          value: /^[가-힣]*$/,
                          message: "한글만 사용 가능합니다.",
                        },
                      })}
                      className="appearance-none  my-1.5 rounded-md focus:outline-none focus:ring-gold focus:border-gold flex-shrink flex-grow  leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                      placeholder="이름"
                    />
                  </div>
                  <span className="text-xs text-[#ff5e57]">
                    {errors?.realName?.message}
                  </span>
                  <div className="flex flex-wrap items-stretch w-full mb-2 relative h-15 bg-white  rounded  pr-10">
                    <div className="flex -mr-px justify-center w-15 p-4">
                      <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      {...register("nickname", {
                        required: "필수 정보입니다.",
                        pattern: {
                          value: /^[가-힣a-zA-Z0-9]{2,10}$/,
                          message:
                            "2~10자의 한글, 영문 대 소문자, 숫자만 사용 가능합니다.",
                        },
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
                      maxLength={10}
                      className="appearance-none  my-1.5 rounded-md focus:outline-none focus:ring-gold focus:border-gold flex-shrink flex-grow  leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                      placeholder="닉네임"
                    />
                  </div>
                  {startCheckNick && !errors?.nickname?.message ? (
                    <span className="text-xs text-[#05c46b]">
                      사용 가능한 닉네임 입니다.
                    </span>
                  ) : (
                    <span className="text-xs text-[#ff5e57]">
                      {errors?.nickname?.message}
                    </span>
                  )}
                </div>
                <div className="my-8">
                  <button className="w-full flex justify-center items-center py-2 px-4 border-gold rounded-md shadow-sm bg-white text-sm font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white">
                    회원가입
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
