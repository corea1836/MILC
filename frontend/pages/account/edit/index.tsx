import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  BackgroundImg,
  BackgroundVideo,
  ProfileImg,
} from "@components/cloudflare";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { Layout, AccountLayout } from "@components/ui/layout";
import { useRouter } from "next/router";
import Link from "next/link";

export interface User {
  address1: string;
  address2: string;
  backgroundImg: string;
  description: string;
  email: string;
  id: number;
  nickname: string;
  phone: string;
  proImg: string;
  userName: string;
  zipCode: string;
  userRole: string;
}

interface IEditProfileResponse {
  message: string;
  statusCode: number;
  user: User;
}

interface IEditProfileForm {
  email: string;
  userName: string;
  nickname: string;
  description: string;
  zipCode: string;
  address1: string;
  address2: string;
  phone: string;
}

const EditProfile: NextPage = () => {
  const { user, isLoading } = useUser();
  // console.log(user);

  // input 값 받아옴
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<IEditProfileForm>({ mode: "onBlur" });

  // useUser로 불러온 회원 정보 useForm에 저장
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.userName) setValue("userName", user.userName);
    if (user?.nickname) setValue("nickname", user.nickname);
    if (user?.nickname) setOriginNickname(user.nickname); // 기존 닉네임 저장
    if (user?.description) setValue("description", user.description);
    if (user?.zipCode) setValue("zipCode", user.zipCode);
    if (user?.address1) setValue("address1", user.address1);
    if (user?.address2) setValue("address2", user.address2);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  // 중복검사 시작했는지 확인 (중복검사를 시작했을때부터 SuccessMessage 보이기 위함)
  const [startCheckNick, setStartCheckNick] = useState(false);
  const changeStartCheckNick = () => {
    setStartCheckNick(true);
    return true;
  };
  const [originNickname, setOriginNickname] = useState(""); // 기존 닉네임은 중복 확인 안되도록 저장

  // onValid form data DB에 요청
  const [editProfile, { data, loading }] = useMutation<IEditProfileResponse>(
    `/user`,
    "PUT"
  );

  // form 제출 시 실행
  const onValid = async (formData: IEditProfileForm) => {
    if (loading) return;

    if (window.confirm("해당 정보로 수정하시겠습니까?") == true) {
      editProfile(formData);
    }
  };

  // server 응답 받았을 때 실행
  useEffect(() => {
    if (data && data.statusCode === 200) {
      alert("회원 정보가 수정되었습니다.");
    }
  }, [data]);

  // 주소 검색 API
  const findAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setValue("zipCode", data.zonecode + "");
        setValue("address1", data.address);
        setValue("address2", ""); // 주소 검색 완료 시 상세주소 비움
      },
    }).open();
  };

  return (
    <Layout seoTitle="프로필 수정">
      <AccountLayout>
        <div className="mt-7 mx-[52px] text-textBlack max-w-[800px] flex-1 relative">
          <div className="flex flex-wrap justify-between mt-9">
            <h1 className="font-semibold text-[40px]">프로필 수정</h1>
            <div className="flex items-center">
              <Link href={`/profile/${user?.nickname}`} key={user?.nickname}>
                <a className="px-5 py-3 inline-flex flex-row items-center justify-center font-semibold rounded-[10px] bg-white text-textGray border hover:text-textBlack hover:shadow-md cursor-pointer">
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  My Profile
                </a>
              </Link>
            </div>
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
                        <label className="font-semibold">이름</label>
                      </div>
                      <div className="flex bg-[#8a939b]/[.06] rounded-[10px] border w-full p-3">
                        <input
                          {...register("userName")}
                          className="w-full"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 flex flex-col">
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <label className="font-semibold">아이디</label>
                      </div>
                      <div className="flex bg-[#8a939b]/[.06] rounded-[10px] border w-full p-3">
                        <input
                          {...register("email")}
                          className="w-full"
                          disabled
                        />
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
                            pattern: {
                              value: /^[가-힣a-zA-Z0-9\s]{2,20}$/,
                              message:
                                "2~20자의 한글, 영문 대 소문자, 숫자만 사용 가능합니다.",
                            },
                            validate: {
                              checkNickname: async (value) =>
                                originNickname === value
                                  ? true
                                  : (await fetch(
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
                          className="w-full outline-none placeholder:text-sm placeholder:text-textGray"
                          placeholder="한글/영문/숫자 중 2~10자를 입력해주세요."
                        />
                        {startCheckNick && !errors?.nickname?.message ? (
                          <p className="mt-[3px] text-xs text-[#05c46b]">
                            사용 가능한 닉네임 입니다.
                          </p>
                        ) : (
                          <p className="mt-[3px] text-xs text-[#ff5e57]">
                            {errors?.nickname?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 flex flex-col">
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <label className="font-semibold">소개</label>
                      </div>
                      <textarea
                        {...register("description")}
                        className="w-full h-auto flex bg-white rounded-[10px] border border-[#e5e8eb] p-3 focus:ring-1 focus:ring-lightGold focus:border-lightGold focus:shadow-md placeholder:text-sm placeholder:text-textGray foc"
                        placeholder="자기소개를 입력해주세요."
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex flex-col">
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <label className="font-semibold">주소</label>
                      </div>
                      <div className="flex">
                        <div className="flex bg-white border w-[50%] p-3 rounded-l-[10px]">
                          <input
                            {...register("zipCode")}
                            className="w-full outline-none bg-white"
                            placeholder="우편번호"
                            disabled
                          />
                        </div>
                        <div
                          onClick={findAddress}
                          className="flex justify-center items-center rounded-r-[10px] w-[50%] bg-white hover:bg-lightBg border border-lightGold text-lightGold font-semibold cursor-pointer"
                        >
                          주소 검색
                        </div>
                      </div>
                      <div className="flex bg-white rounded-[10px] border w-full p-3">
                        <input
                          {...register("address1")}
                          className="w-full outline-none bg-white"
                          placeholder="주소"
                          disabled
                        />
                      </div>
                      <div className="flex bg-white rounded-[10px] border w-full p-3 focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold">
                        <input
                          {...register("address2")}
                          className="w-full outline-none bg-white placeholder:text-sm placeholder:text-textGray"
                          placeholder="상세주소"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 flex flex-col">
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <label className="font-semibold">전화번호</label>
                      </div>
                      <div className="bg-white rounded-[10px] border w-full p-3 cursor-text focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold">
                        <input
                          {...register("phone", {
                            pattern: {
                              value: /^\d{2,3}-\d{3,4}-\d{4}$/ || "",
                              message: "전화번호 양식을 지켜주세요.",
                            },
                          })}
                          className="w-full outline-none placeholder:text-sm placeholder:text-textGray"
                          placeholder="하이픈(-)을 넣어서 작성해주세요."
                        />
                        <p className="mt-[3px] text-xs text-[#ff5e57]">
                          {errors?.phone?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* form button */}
                  <div className="my-[30px]">
                    <button className="font-semibold px-5 py-3 rounded-[10px] bg-lightGold border border-lightGold text-white hover:bg-gold hover:shadow-md focus:bg-gold focus:outline-none">
                      {loading ? <span>수정중</span> : "저장"}
                    </button>
                  </div>
                </form>
                {/* 우 */}
                <div className="flex flex-row space-x-24 lg:flex-col lg:ml-20 lg:space-x-0">
                  {/* 프로필 사진 */}
                  <ProfileImg proImg={user?.proImg} userId={user?.id} />
                  {/* 배경 사진 */}
                  {user?.userRole === "ROLE_ENTERPRISE" ? (
                    <BackgroundVideo
                      backgroundVideo={user?.backgroundImg}
                      userId={user?.id}
                    />
                  ) : (
                    <BackgroundImg
                      backgroundImg={user?.backgroundImg}
                      userId={user?.id}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccountLayout>
    </Layout>
  );
};

export default EditProfile;
