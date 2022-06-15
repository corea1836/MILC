import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";

interface IUserProps {
  backgroundImg: string;
  userId: number;
}

interface IEditBackgroundImgForm {
  backgroundImg: FileList;
}

interface IEditBackgroundImgResponse {
  message: string;
  statusCode: number;
  user: any;
}

export default function BackgroundImg({ backgroundImg, userId }: IUserProps) {
  // console.log(backgroundImg, userId);
  const [onValidLoading, setOnValidLoading] = useState(false);

  // input 값 받아옴
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IEditBackgroundImgForm>();

  // 이미지 미리보기
  const [backgroundImgPreview, setBackgroundImgPreview] = useState(""); // 미리보기 변수
  const backgroundImgUpload = watch("backgroundImg"); //
  useEffect(() => {
    if (backgroundImgUpload && backgroundImgUpload.length > 0) {
      const file = backgroundImgUpload[0];
      setBackgroundImgPreview(URL.createObjectURL(file));
    }
  }, [backgroundImgUpload]);

  // useUser로 불러온 프로필 이미지를 미리보기에 저장
  useEffect(() => {
    if (backgroundImg)
      setBackgroundImgPreview(
        `https://imagedelivery.net/VMYwPRIpsXwlX0kB6AjPIA/${backgroundImg}/avatar`
      );
  }, [backgroundImg]);

  // onValid form data DB에 요청
  const [editBackgroundImg, { data, loading }] =
    useMutation<IEditBackgroundImgResponse>(`/user/back`, "PUT");

  // Mutation 응답 받았을 때 실행
  useEffect(() => {
    if (data && data.statusCode === 200) {
      alert("배경 사진이 수정되었습니다.");
    }
  }, [data]);

  // form 제출 시 실행
  const onValid = async (formData: IEditBackgroundImgForm) => {
    if (loading) return;

    if (window.confirm("배경 사진을 수정하시겠습니까?") == true) {
      if (
        formData.backgroundImg &&
        formData.backgroundImg.length > 0
        // backgroundImg
      ) {
        setOnValidLoading(true);
        const { uploadURL } = await (await fetch(`/api/files`)).json();
        const form = new FormData();
        form.append("file", formData.backgroundImg[0], userId + "");
        const {
          result: { id },
        } = await (
          await fetch(uploadURL, {
            method: "POST",
            body: form,
          })
        ).json();
        editBackgroundImg({
          imgUrl: id,
        });
        setOnValidLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="mb-6 flex flex-col">
      <div className="flex flex-col">
        <div className="mb-2 flex flex-col">
          <div className="font-semibold text-[#353840]">
            <div className="flex items-center">
              <div className="mr-1">배경 사진</div>
              <button>
                {onValidLoading ? null : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 "
                    viewBox="0 0 20 20"
                    fill="#C19A77"
                  >
                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[150px]">
          <div className="relative">
            <div className="p-1 absolute inset-0 rounded-[10px] cursor-pointer border-none z-[2] flex flex-col justify-center items-center">
              <input
                {...register("backgroundImg")}
                id="backgroundImg"
                type="file"
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="backgroundImg"
                className="absolute inset-0 z-[70] opacity-0 hover:opacity-[1] hover:h-full rounded-[10px] bg-black/[.15] cursor-pointer"
              >
                <div className="flex flex-col justify-center items-center h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="white"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              </label>
            </div>
            <div className="h-[150px] w-[150px] flex justify-center items-center max-h-full max-w-full overflow-hidden relative rounded-[10px]">
              {backgroundImgPreview ? (
                <img
                  src={backgroundImgPreview}
                  className="h-[150px] w-[150px] rounded-[10px]"
                />
              ) : (
                <div className="h-[150px] w-[150px] bg-basicImage rounded-[10px]"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
