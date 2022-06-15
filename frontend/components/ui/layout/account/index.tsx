// account tab

import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

interface LinkProps {
  children: React.ReactNode;
  href: string;
}

// 해당 링크에 있을 때 style
const ActiveLink = ({ children, href }: LinkProps) => {
  const router = useRouter();
  return (
    <Link href={href} scroll={false}>
      <a
        className={`${
          router.pathname === href
            ? "text-textBlack bg-lightGold"
            : "text-textGray hover:bg-lightGold hover:text-textBlack"
        } w-full p-4 rounded-[10px] flex`}
      >
        {children}
      </a>
    </Link>
  );
};

export default function AccountLayout({ children }: LayoutProps) {
  return (
    <div className="flex items-stretch">
      <div className="hidden px-3 min-w-[250px] border-r lg:block xl:w-[340px] xl:min-h-screen">
        <ul className="px-2">
          <div className="px-[10px] py-2">
            <p className="font-bold text-xs text-textGray uppercase my-3 tracking-[1px]">
              Settings
            </p>
          </div>
          <li className="w-full">
            <ActiveLink href="/account/edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-4 mr-3 text-left font-semibold">
                프로필 수정
              </span>
            </ActiveLink>
          </li>
          <li className="w-full">
            <ActiveLink href="/account/realization">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                  clipRule="evenodd"
                />
                <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
              </svg>
              <span className="ml-4 mr-3 text-left font-semibold">
                실물화 내역
              </span>
            </ActiveLink>
          </li>
          <li className="w-full">
            <ActiveLink href="/account/alarm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span className="ml-4 mr-3 text-left font-semibold">알림</span>
            </ActiveLink>
          </li>
          <li className="w-full">
            <ActiveLink href="/account/question">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-4 mr-3 text-left font-semibold">
                1:1 문의하기
              </span>
            </ActiveLink>
          </li>
          <li className="w-full">
            <ActiveLink href="/account/earning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-4 mr-3 text-left font-semibold">수익</span>
            </ActiveLink>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}
