import { IoClose, IoMenu } from "react-icons/io5";
import SearchBar from "./SearchBar";
import { useRecoilValue, useRecoilState } from "recoil";
import { accessToken, role } from "@components/atoms/Auth";
import { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connectWallet } from "utils/interact";
// hi

function MyDropdown({ logout, role }: any) {
  const [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }
  return (
    <Menu as="div" className="flex py-3 hover:bg-gold px-2 border rounded-full">
      <Menu.Button
        onClick={() => {
          toggleOpen();
        }}
      >
        유저
      </Menu.Button>

      <Menu.Items className="absolute mt-10 mr-2    flex flex-col right-0 bg-white rounded-md shadow-lg border">
        <Menu.Item>
          <Link href="/account/edit">
            <a className="px-4 py-2 hover:bg-gray-300 text-gray-500">
              프로필 수정
            </a>
          </Link>
        </Menu.Item>
        {/* 관리자만 보임 */}
        {role === "ROLE_ADMIN" ? (
          <Menu.Item>
            <Link href="/signup/partner">
              <a className="px-4 py-2 hover:bg-gray-300 text-gray-500">
                계정 관리
              </a>
            </Link>
          </Menu.Item>
        ) : null}
        {/* 기업만 보임 */}
        {role === "ROLE_ENTERPRISE" ? (
          <Menu.Item>
            <a
              className="px-4 py-2 hover:bg-gray-300 text-gray-500"
              href="/create"
            >
              NFT 생성
            </a>
          </Menu.Item>
        ) : null}
        <Menu.Item>
          <a
            onClick={logout}
            className="px-4 py-2 cursor-pointer hover:bg-gray-300 text-gray-500"
          >
            로그아웃
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            onClick={() => connectWallet()}
            className="px-4 py-2 cursor-pointer hover:bg-gray-300 text-gray-500"
          >
            지갑 연결하기
          </a>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default function Header() {
  const [TOKEN, setTOKEN] = useRecoilState(accessToken);
  const getRole = useRecoilValue(role);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logout = () => {
    router.push("/");
    localStorage.clear();
    setTOKEN("");
  };

  const AllLinks = [
    { name: "개인관", link: "/individual" },
    { name: "명품관", link: "/brand" },
    { name: "라이브 경매", link: "/streams" },
  ];
  const UserLinks = [
    { name: "개인관", link: "/individual" },
    { name: "명품관", link: "/brand" },
    { name: "나의 전시관", link: `/exhibition` },
    { name: "라이브 경매", link: "/streams" },
  ];

  return (
    <div className="shadow-md w-full bg-ourBlack z-10 h-[80px] fixed top-0 left-0 text-white">
      <div className="flex justify-between lg:pt-3  bg-ourBlack   px-2">
        <div className="font-bold text-2xl cursor-pointer flex pl-4  ">
          <div className="text-4xl bg-clip-text  lg:pt-1 pt-4 text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold">
            <Link href={"/"}>
              <a>MILC</a>
            </Link>
          </div>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 flex cursor-pointer text-gold
          lg:hidden"
        >
          <IoMenu />
        </div>

        <ul
          className={`lg:flex lg:items-center lg:flex-row flex flex-col lg:pb-0 pb-8 absolute lg:static bg-ourBlack z-auto  left-0 w-full lg:w-auto lg:pl-0 px-9 transition-all duration-500 ease-in lg:gap-x-2 ${
            open ? "top-16 gap-y-5 pt-2 lg:pt-0" : " top-[-490px]"
          }`}
        >
          <SearchBar />
          {!TOKEN
            ? AllLinks.map((link) => (
                <li key={link.name} className=" text-xl  ">
                  <Link href={`${link.link}`}>
                    <a className="cursor-pointer btn p-2 px-3 rounded-md d hover:bg-gold hover:duration-200">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))
            : UserLinks.map((link) => (
                <li key={link.name} className=" text-xl ">
                  <Link href={`${link.link}`}>
                    <a className="cursor-pointer btn  p-2 px-3 rounded-md  hover:bg-gold hover:duration-200">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
          <div className="flex lg:border-l-2 lg:border-gray-400 text-xl lg:pl-3 justify-start gap-3 ">
            {TOKEN ? (
              <MyDropdown logout={logout} role={getRole} />
            ) : (
              <>
                <Link href="/login">
                  <a>
                    <div className="cursor-pointer btn  p-2 px-3 rounded-md  hover:bg-gold hover:duration-200">
                      로그인
                    </div>
                  </a>
                </Link>
                <Link href="/signup">
                  <a>
                    <div className="cursor-pointer btn  p-2 px-3 rounded-md  hover:bg-gold hover:duration-200">
                      회원가입
                    </div>
                  </a>
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}
