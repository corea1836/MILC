import styled from "styled-components";
import { CgSearch } from "react-icons/cg";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const SearchInput = styled.input`
  border: none;
  font-size: 1.15rem;
  flex: 1;
  :focus {
    outline: none;
  }
`;

interface IForm {
  keyword: string;
}

export default function SearchBar() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IForm>();

  const onValid = (data: IForm) => {
    router.push(`/search/${data.keyword}`);
  };

  return (
    <div className="bg-white border rounded-lg p-2 w-96 ">
      <form
        className="flex items-center   focus:ring-gold focus:outline-none  focus:border-lightGold"
        onSubmit={handleSubmit(onValid)}
      >
        <CgSearch className="text-3xl text-gold" />
        <SearchInput
          className="text-black"
          {...register("keyword", { required: true, minLength: 2 })}
          placeholder="당신의 NFT를 찾아보세요"
        />
      </form>
    </div>
  );
}
