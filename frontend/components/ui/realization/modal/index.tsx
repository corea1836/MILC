import useMutation from "@libs/client/useMutation";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { marketContract, nftContract, realizeItem } from "utils/interact";

import { Modal } from "../../common";

declare let window: any;

interface Iresponse {
  nft: any;
  onClose: Function;
  user: any;
  nftId: string | string[] | undefined;
  response:
    | {
        nftId: string;
        address: any;
        image: any;
        name: any;
        description: any;
        edition: any;
        product: any;
        brandName: any;
      }
    | undefined;
}

interface IRealizationForm {
  nftId: string | string[] | undefined;
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
}

interface IRealizationResponse {
  message: string;
  statusCode: number;
}

export default function RealizationModal({
  nft,
  onClose,
  user,
  nftId,
  response,
}: Iresponse) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // input 값 받아옴
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IRealizationForm>();

  // request
  const [requestRealization, { loading, data, error }] =
    useMutation<IRealizationResponse>("/realization_board");

  // data 초기화
  useEffect(() => {
    // if (!!course) {
    setIsOpen(true);
    // }
    setValue("nftId", nftId);
    setValue("check1", false);
    setValue("check2", false);
    setValue("check3", false);
    setValue("check4", false);
  }, []);

  // form 제출 시 실행
  const onValid = async () => {
    if (loading) return;
    // console.log(nftId);
    if (window.confirm("해당 정보로 실물화 신청을 하시겠습니까?") === true) {
      requestRealization({ nftId });
      await onRealization();
    }
  };

  const onRealization = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const res = await realizeItem(nftId, signer);
    // if (res) {
    //   const res = onValid();
    //   console.log(res);
    // }

    if (confirm("신청이 완료됐습니다!") === true) {
      router.push(`/account/realization`);
    }
  };

  // server 응답 받았을 때 실행
  // useEffect(() => {}, [data, router]);

  // 취소 버튼
  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };
  console.log(data);
  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-lightBg rounded-lg text-textBlack text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <form
              onSubmit={handleSubmit(() => onValid())}
              className="mt-3 sm:mt-0 sm:text-left"
            >
              <h3 className="mb-7 font-semibold text-xl">실물화 신청</h3>

              <div className="relative rounded-md bg-white py-1 mb-3 shadow-sm">
                <div className="font-semibold px-4">상품명</div>
                <div className="bg-[#fbfdff] border-t border-lightBg px-4">
                  {response?.name}
                </div>
              </div>
              <div className="relative rounded-md bg-white py-1 mb-3 shadow-sm">
                <div className="font-semibold px-4">이름</div>
                <div className="bg-[#fbfdff] border-t border-lightBg px-4">
                  {user?.userName}
                </div>
              </div>
              <div className="relative rounded-md bg-white py-1 mb-3 shadow-sm">
                <div className="font-semibold px-4">이메일</div>
                <div className="bg-[#fbfdff] border-t border-lightBg px-4">
                  {user?.email}
                </div>
              </div>
              <div className="relative rounded-md bg-white py-1 mb-3 shadow-sm">
                <div className="font-semibold px-4">휴대전화</div>
                <div className="bg-[#fbfdff] border-t border-lightBg px-4">
                  {user?.phone}
                </div>
              </div>
              <div className="relative rounded-md bg-white py-1 mb-3 shadow-sm">
                <div className="font-semibold px-4">주소</div>
                <div className="bg-[#fbfdff] border-t border-lightBg px-4">
                  <div>{user?.zipCode}</div>
                  <div>{user?.address1}</div>
                  <div>{user?.address2}</div>
                </div>
              </div>

              <div className="text-xs my-5 space-y-2">
                <div className="flex px-2">
                  <label className="flex items-center mr-2">
                    <input
                      {...register("check1", {
                        required: "error",
                      })}
                      type="checkbox"
                    />
                  </label>
                  <div className="text-textGray">
                    실물화 신청 후 승인이 완료되면 해당 NFT의 거래가
                    &apos;정지&apos; 됩니다.
                  </div>
                </div>
                <div className="flex px-2">
                  <label className="flex items-center mr-2">
                    <input
                      {...register("check2", {
                        required: "error",
                      })}
                      type="checkbox"
                    />
                  </label>
                  <div className="text-textGray">
                    실물화 신청 후 승인이 완료되면 실물화 취소가
                    &apos;불가능&apos; 합니다.
                  </div>
                </div>
                <div className="flex px-2">
                  <label className="flex items-center mr-2">
                    <input
                      {...register("check3", {
                        required: "error",
                      })}
                      type="checkbox"
                    />
                  </label>
                  <div className="text-textGray">
                    상품 배송기간은 브랜드 및 상품별로 상이하며, 예정 시일보다
                    길어질 수 있습니다.
                  </div>
                </div>
                <div className="flex px-2">
                  <label className="flex items-center mr-2">
                    <input
                      {...register("check4", {
                        required: "error",
                      })}
                      type="checkbox"
                    />
                  </label>
                  <div className="text-textGray">
                    실물화 조건을 모두 확인하였으며, 실물화 진행에 동의합니다.
                  </div>
                </div>
              </div>

              {(errors.check1 ||
                errors.check2 ||
                errors.check3 ||
                errors.check4) && (
                <div className="px-4 mb-5 text-red-500 rounded-lg text-sm">
                  실물화 이용약관에 대한 안내 모두 동의해주세요.
                </div>
              )}

              <div className="flex">
                <button
                  // onClick={onRealization}
                  className="rounded-[10px] font-semibold bg-lightGold hover:bg-gold px-5 py-3 border-[1px] border-lightGold text-white w-full mr-2"
                  // onClick={() => {
                  //   onSubmit(order, course);
                  // }}
                >
                  신청
                </button>
                <div
                  onClick={closeModal}
                  className="rounded-[10px] font-semibold bg-red-300 hover:bg-red-600 px-5 py-3 text-white w-[100px] text-center cursor-pointer"
                >
                  취소
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
