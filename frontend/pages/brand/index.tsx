// 수정 금지

import { Layout } from "@components/ui/layout";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface BrandResponse {
  message: string;
  statusCode: number;
  users: any;
}

const Brand: NextPage = () => {
  // const { data } = useSWR<BrandResponse>(
  //   `${process.env.BASE_URL}/user/enterprise`
  // );

  return (
    <Layout seoTitle="명품관">
      <div className="min-h-screen w-full bg-darkBg">
        <div className="py-[100px] text-center">
          <span className="text-[40px] font-[600] bg-clip-text text-transparent bg-gradient-to-r from-gold to-lightGold">
            Luxury goods Store
          </span>
        </div>
        <div className="p-[52px]">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 md:grid-rows-10 md:grid-flow-col gap-8">
              {/* CELINE */}
              <div className="md:row-start-2 md:row-span-2 h-[350px]">
                <div className="h-full bg-[#201819] rounded-2xl border-4  border-lightGold hover:border-gold transition hover:scale-[1.02] cursor-pointer shadow-black hover:shadow-black shadow-lg hover:shadow-xl">
                  <Link href="/profile/CELINE">
                    <a className="h-full flex flex-col justify-between">
                      <div className="p-10 flex justify-center items-center">
                        <svg
                          className="w-full h-full object-cover"
                          fill="none"
                          viewBox="0 0 92 19"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M83.902 15.582V10.23h5.92V7.496h-5.92V3.253h7.341V.518H80.871v17.798H92v-2.733h-8.098zM75.568 19L75.591.495H72.56l.047 11.715L59.3 0l-.024 18.315h3.032l-.049-11.267L75.569 19zm-21.6-.685L53.97.495h-3.03l-.003 17.82h3.031zm-17.355.001H47.15v-2.733h-7.507V.495h-3.031v17.821zm-15.677 0h11.13v-2.733h-8.099V10.23h5.92V7.496h-5.92V3.253h7.342V.518H20.936v17.798zM3.22 9.312c0-3.396 2.368-6.484 6.393-6.484 1.847 0 3.67.66 4.926 1.886l1.61-2.098C15.558 1.91 13.285.094 9.614.094 3.931.094 0 4.384 0 9.382c0 5.116 4.144 9.359 9.945 9.359 2.558 0 4.69-.825 6.324-2.381l-1.398-1.957c-.71.708-2.533 1.627-4.783 1.627-4.05 0-6.867-2.994-6.867-6.718z"
                            fill="white"
                          ></path>
                        </svg>
                      </div>
                      {/* 하 */}
                      <div className="p-5 flex justify-between">
                        <div></div>
                        <div className="text-gold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* GUCCI */}
              <div className="md:row-start-4 md:row-span-2 h-[350px]">
                <div className="h-full bg-[#D6C8BB] rounded-2xl border-4 border-lightGold hover:border-gold transition hover:scale-[1.02] cursor-pointer shadow-black hover:shadow-black shadow-lg hover:shadow-xl">
                  <Link href="/profile/GUCCI">
                    <a className="h-full flex flex-col justify-between">
                      <div className="p-10 flex justify-center items-center">
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAA0CAYAAAD7VOHJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADYJJREFUeNrsXQmQlMUV7uXYZTnkWhZIARJEQkSQcCiI4JoERAggkIBxkWhiTIhGhcKAgAdIwANSwXiUxsSiFkzkCAhiUAkCinIslxyKILccSrgJ927e57zRYeafv3vnn5n//Ut/VV8Bu4/uN2+6X7/uft2dUVxcrCwsLCwuRZRLcnk5xOuJ1xGbEK8g5hIrEqsTzxGPE/9L3E7cRNxMXEpcb78OCw2qc/tqR2xKbESsz+2rEsscIZ4g7iVuIX5KLCR+wD+/VPv5NcQbiC3YbuiblYnViBksd4h4gLiD++Ya4vvEXaXVMBlJiABhzH7EnxJbRRizpNhDnE+czI3VwgKoS+zP7as9sUyC5ZwnriTOIb5Wmjs1I4vYndiX2INYxUNZGERmEwvYMZYewAEmyM7EecQLxcnHeuI9xEwP+qWDo0vwmf6QZt1ejaPHROE2DfMHxALimRS0ryLiYuLtxPIBsYcpc4iPEvcVpwaFxF8Qy5WCfjk0kQgQ048niTdq5L7g0RbTj7Uc4WHqW5ZHowY8jcGU5mbilQ5l7CQOJc6QGkETFxLzNHLTOIpJJzC92UqsHfEz/Ptq4hnBY3IDbl+3GcwmsIwyjyO7DcTdPI0rx22sIbE5sRNHQ7XitLHxxL9xlBhUZBOHEB8iVtXIniS+Q1xM3MjLUOib/+NlhhrEZsRruW+2cShjB39PUu02n3WPh1nEPiXxqlWIL/HoGQ+IBt8g3kjMKKHXbsXln3IodxaPbBJHm3yDkaaLT7oNi9LjAeHRC6L+ExpbIiKcQmxbwrIR6fUiLohT7gZiXkCjvuuJWw3a4UriAGKFEpbflDiBeMyhzLXEjgJt0kVji05fB3+GhV1H3GZg3NZJULwu8RXi+ajy9/G0W5qhGxo0vKo+6dYsSo9mQjswBtfZBnacz53Ra31wdOvi1IFp92UBcXwIMsY49JVo7CT2TdL0+kWHZa8i7rNVBNmmhsYm5U0dYH6cqCzyw48llk3yB4DT3RRVF77o3wprhNkaQ5/1UbdMpy9dGOtxFOGG08T7klwv1rBGEs851LedoyrJzg/tbrrBoDElBY4JfXOLQ12fEVsKspEblIkDHGwwHemfwg9QkTjVod7xCUyx/TL0EUG6SXR+2wzsl8opFhzd/jgD111CnR/6xXsGGz0PpThqn+lQ70niraXBAT6oKQDRWJ80fZAxDvVPsA4w0A6wlkOE72S7NmnQpb6LLmOF2S2TlwJ0zu/uNE3Bn47jG+4PsgPsrdns8GNB/TEHHR63DjCQDhDLJW8bDLA906hTLvFjt84ihM8ZTHuHp1mncULtpnWATmkw2P5exmkU8fA6pymkO+VkJrG3w899T6d0+d1RzraXoFuGkBSFR4mjNTJPsFw6UY/4Ef+pBNptACcju+FNYk9Nm0xF34Re+cLsVqzROcYBlieuILZ0+Y8HOJfsoA8fKIfzlnKtAwysA8QAu4bbWjys5nzTcz7o11qFjn9lC7Mb8jk/4Ty9ePiK++aXPuUhLue8y8A4wOhjRcM0zg8Y6ZPzU1zvIGURZLygcX7AYJ+cH7CKOFyg3f6scX7ACJ+cH3CKODBoyeSRESBGmG0qdLA8HhB94VD1BZ/1RvZ/NxsBBi4CvIX4lkZmLk/hfO0XxCUqdHmABLvhjH2hRo91LFfks65/4gEscBHgSI3zAyYJcH7AqDSvcVgkBw8bdiAJA9ogIW0deMTAmTwlwPkBY1XoRp5AIOwAEVrfrZHFWcEpQvTGGtI0608CBSytdNTI4Mz4IiH64mxxgQA9vkvspZHBufvpQuyGs9jPB80BYvcmWyM7nef5UjDGRoGBQr6BzGvCdP6jgKhqgEH0N1XJWnt7lng2SA7wTgPZ6cJ0x71kc61fCQx+biDzL2E6bxXQxkwGjteF2Q0bMf8MQqPEJghSSvZrRpnwNTnSvDqu0vpQgB52E8QdSM3Q3fiNq60aCewjeT5Oy3Hbte7iVjibOgJnQ7gVfrngfvnNJsiPDTrGUqEh7YfKIgjoYCCzWKjui3ys+yZD/SQuBS0PQsOEA2xnILfK9mELD2hhILPOmikGbW3fTL0DbG4gZx8ssvCCKw1kNlozxeD7BjIbrJm8OcDLDeR2WlNZeIDJ2t4Oa6YYmPTNXdZM3hxgHQO5L6ypLDygpoHMV9ZMMahuILPXmsmbA8w2kDtsTWXhAZUMZE5aM8WgsrVb6h2gCU5ZU1l4QHkDmXPWTDHIMpA5Y83kzQGaZJCXtaay8ACTNI1Ma6YYmJxCqWDN5M0BmlxtleWDbi9yxzHhFPtVisahJE33rN0SW16wcHGAuw3kcn3QbbChbieI99uvUjT2GcjUtWaKwQEDmXrWTN4c4GYDufo+6Haa+LKB3GTDkdLCP2wxkGlgzRSDzw1kGlozeXOAhQZy3/NJv3cNZN62X6N4fGYg09yaKQYfG8hcY83kzQEuMJBr6ZN+2wxkVtuvUTxMzmy3sWaKwVIDmWutmRJH+Er83Zq1BFw91cwH/bJ4KuwG7IL5nQpgb4NxBz4/NtvcsglwqwnWAYtst/wGuKH9kHLfhMQaeI6y6TAl7ZcXXYmvu7vrKuXPYuuZJMlY+Atckb5MI4ONtrYCde/qY924hu4DjQx2z/ME2q1LUKbAwF+VPlerr+3HFh4w2UAmX5jOiFif8VkHk2v5Bwr0K08FyQFikfrfGtk7bB9OCJlC6vb7PsdpHNG44XZldjQzXfilCl3m6rfddLm6fYi1BNkNvqJlEDpn5FE43UtreDD6RuvPHHHU5Xfo0Jf5pFdOxN8PCbCR7rGcmux0JACXhDwpQI9TBlEo1sGHCrFbjaBEf9EOEC+t6U5UjLC+zhG6XMpWPunVOuLvOwTYCR35uEYGj5JX9FlPLJC/zJ1ZAp5T+mTye5WMpGg8iFQ7iA5Q8Sjidi0RFja7W38Xg/c1v+/nk169SqBjOoC29ZhGBp34EZ/1hBPuIah9YelAd9qpEjsfP3GnkreO6z7ScRpMJH5CnKPip0wgkkDy5bE06ajbnMkQYEfdoz+wFW5F/jKNOmEU/lx9e1a0hZJxszc2FrCz6fYUA9YrsdyyzAf90IELotpVhpD+ivXAn2lksITwqg+6/VCF9hEyBdnNOA0mEm8Sn3D5jw2JL9mg7yLgWnK3UytYA5zow3Qz7PzeU3KeNbjATuaIiww60T9U+hf20Yn/LsjhRePXBt8jpsvpTo5urELP5gbuRp949wE+rkKpMfFwW5qmKVU1v5d0BvhB5X6nHR64HpQmXRAF3BHhcIYIa3c44dNXue9MY6CdZ9AGkoUfEd8Q3omxkdRHM5OoyEHMVWnSqakKvehXQwUQZVxCx98o9127McxUAQ3R7cFnvFPSUZAtNxk4mr/wKJ5q5xd5icRo4lqBbW8hsb/GCSIxGkc166RYF3wnb6nYK7mKeGCTBDzWnqfcN0VqsVNqn2JdblChteXvONhtiAoCsAboQqwRjiJeKI6PKcTKmnJKyurEBS51/odYK8l1JovPFOvxPLFikustR5wUVc8r/B0qwbyZeFhjrx3EDimouxqxIE6dp4h9BdutMXGzxm74DL9PQRsoQxxGPOtQ52liPyE2csPXMqYFdSMedClsC7FrkpTuTNwWpx4YfDh/AZI79UjNoBG2WZ8kNU44hzVR5U8KgPMLswlxo8Ze54kT2Wl5ra8s8S7i3jh1rSe2CIDdYItZBgMugolmSaqzPXFlnHo+JbYSZJ+kOUCwNnG6ptCFxN7cwEo6ouQR57iU/RGxdUA6NNiFuMegca4l3pNAxy5P7EF8N6q8o8SBAbJTmNkcPZ/T2OsQcTyxUQJ1VCXeyx3VCah7ArFCwGyXTzygsRsG5JkcYJRJoH8iwJnnUvYLKZjVeGFNjT2yIOeUBqMDDoc/rdzvb8PmxHziEl4b265Ct1Yc4R1R7E7iktWreZ2im8M6Qhi4qQanVAqU2dsSklBFhfLefqf0R7ywFob0EFwdtZL4iQodgcKLfMj0xykJ5Mi1Y3ZWFz83CdvM4LWXPQHeUccRqnHEWzRyRby2ifsgV3E7289tDLbADSq4XaYRryXexMyMs+Y9l/gwlxNEYBNiBG+06RLJYad3eP1uE68rIlUrfPNSLvdPpE51UKHUuHjJzcgwQN7kCmH26M6bQfGANKsliTjA8OYJEkXv492zVKQNoHFP5I2QoL8YBuf+AG9Q5CS5bDxqNYsHpUJVeoCBEc8i9ErhziyOmeEmpGeFbhQlAjgqnAr5lUtQ4RXojzOJk5Q/uZo6wB8tInZykcHA2TVRBxiJJip00uFWdfHRq0R3uGZwo1ynSh+yONpFMmsXZfZguBMu8IgLxzdVle7HsXN5t7gHj9peneFR3llGyssc5X6OO8goy22sJ0dwXo/JneWd+9nMA4I/+ziO5nUYlQwHGL393p6naE14+lGfQ/JwWH6CQ20YcCdP9VZwOL5PXToow1MMJK3irHBjbqTIe6vG096TPKU7zHZazZFKoTJ7za+0oTIPsq15qnwFt6/KbLdwWtdxbmMYGHap0Oml9by0sJ4HkEsNaF9tuK2hX17OSwTol5XYYR5jR3eQ+yZst5HthnZX6u7eTLYDtLCwsAgM/i/AAKnsLJGtsFcZAAAAAElFTkSuQmCC"
                          alt="#"
                          className="w-full object-cover"
                        />
                      </div>
                      {/* 중 */}
                      <div>
                        <div className="h-10 bg-[#017A63]"></div>
                        <div className="h-10 bg-[#B03F38]"></div>
                        <div className="h-10 bg-[#017A63]"></div>
                      </div>

                      {/* 하 */}
                      <div className="p-5 flex justify-between">
                        <div></div>
                        <div className="text-gold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* bottega */}
              <div className="md:row-start-6 md:row-span-2 h-[350px]">
                <div className="h-full bg-lightBg rounded-2xl border-4 border-lightGold hover:border-gold transition hover:scale-[1.02] cursor-pointer shadow-black hover:shadow-black shadow-lg hover:shadow-xl">
                  <Link href="/profile/BOTTEGA VENETA">
                    <a className="h-full flex flex-col justify-between">
                      <div className="p-10 flex justify-center items-center">
                        <img
                          src="https://www.bottegaveneta.com/on/demandware.static/-/Sites/default/dw9a8ae2c7/images/logo/BV/logo.svg"
                          className="w-full object-cover"
                        />
                      </div>
                      {/* 하 */}
                      <div className="p-5 flex justify-between">
                        <div></div>
                        <div className="text-gold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* HERMES */}
              <div className="md:row-end-3 md:row-span-2 h-[350px]">
                <div className="h-full bg-[#F37022] rounded-2xl border-4 border-lightGold hover:border-gold transition hover:scale-[1.02] cursor-pointer shadow-black hover:shadow-black shadow-lg hover:shadow-xl">
                  <Link href="/profile/HERMES">
                    <a className="h-full flex flex-col justify-between">
                      <div className="p-10 flex justify-center items-center">
                        <img
                          src="https://www.hermes.com/sites/all/themes/custom/hermes/img/hermes-logo.svg"
                          alt="#"
                          className="w-full object-cover"
                        />
                      </div>
                      {/* 하 */}
                      <div className="p-5 flex justify-between">
                        <div></div>
                        <div className="text-gold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* CHANEL */}
              <div className="md:row-start-3 md:row-span-2 h-[350px]">
                <div className="h-full bg-black rounded-2xl border-4 border-lightGold hover:border-gold transition hover:scale-[1.02] cursor-pointer shadow-black hover:shadow-black shadow-lg hover:shadow-xl">
                  <Link href="/profile/CHANEL">
                    <a className="h-full flex flex-col justify-between">
                      <div className="p-10 flex justify-center items-center">
                        <svg
                          className="w-full h-full object-cover"
                          fill="none"
                          viewBox="0 0 175 28"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.655 17.726l4.565 2.615c-2.282 4.197-6.737 6.922-11.781 6.922C6.075 27.263 0 21.629 0 13.713S6.075.163 13.439.163c5.044 0 9.5 2.725 11.781 6.923L20.655 9.7c-1.326-2.725-4.013-4.381-7.216-4.381-4.603 0-8.1 3.423-8.1 8.394s3.497 8.395 8.1 8.395c3.203 0 5.89-1.657 7.216-4.382M49.705 26.6V15.554H36.818V26.6h-5.154V.826h5.154V10.4h12.887V.826h5.155V26.6h-5.155M79.603 15.922L74.926 5.061 70.25 15.922h9.353zM89.838 26.6h-5.634l-2.54-5.892H68.188l-2.54 5.892h-5.634L71.428.826h6.996L89.838 26.6zM113.586 26.6L99.778 6.313V26.6h-4.786V.826h6.812l11.598 17.084V.826h4.787V26.6h-4.603M128.129 26.6V.826h18.41v4.787h-13.624v5.523h11.782v4.786h-11.782v5.892h14.36V26.6h-19.146M155.56 26.6V.826h5.154v20.62h13.622V26.6H155.56"
                            fill="white"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex justify-center items-center">
                        <img
                          src="https://dahernt.cafe24.com/web/chanel/images1/logo2.png"
                          alt="#"
                          className="h-[150px] w-[150px]"
                        />
                      </div>
                      {/* 하 */}
                      <div className="p-5 flex justify-between">
                        <div></div>
                        <div className="text-gold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* Dior */}
              <div className="md:row-start-5 md:row-span-2 h-[350px]">
                <div className="h-full bg-[#ece6cc] rounded-2xl border-4 border-lightGold hover:border-gold transition hover:scale-[1.02] cursor-pointer shadow-black hover:shadow-black shadow-lg hover:shadow-xl">
                  <Link href="/profile/DIOR">
                    <a className="h-full flex flex-col justify-between">
                      <div className="p-10 flex justify-center items-center text-[#1f0a2d]">
                        <svg
                          className="w-full h-full object-cover"
                          fill="currentColor"
                          viewBox="0 0 494.5 138.3"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1.5 2.7h64.2c55.2 0 76.8 32.4 76.8 66.7 0 34.9-27.7 66-80.4 66H1.6c-1.1 0-1.5-.7-1.5-1.3 0-.7.7-1.3 1.7-1.3h11.3c3.5 0 5.8-2.1 5.8-6V11.5c0-2.9-1.4-6.1-6-6.1H1.4C.5 5.4 0 4.8 0 4.1c0-.6.2-1.4 1.5-1.4m40.1 126.5c0 2.9 1.3 3.8 3.2 3.8h17c41.9 0 57.1-32.1 57.1-64.3S102.8 5.3 67.4 5.3H44.3c-2.4 0-2.6 2-2.6 2.9l-.1 121zM148.9 2.7c-1 0-1.9.4-1.9 1.2 0 .8.5 1.3 1.4 1.3h11.3c2.6 0 5.1 1.8 5.1 6.8v114.9c0 2.4-1.8 6-5 6h-11.2c-1.3 0-1.4 1-1.4 1.4 0 .4-.1 1.1 1.4 1.1H203c.8 0 1.9-.1 1.9-.9s-.2-1.6-1.6-1.6h-10.5c-1.5 0-5.6-.9-5.6-5.5V10.8c0-3.3 2.1-5.5 5.9-5.5h10.3c.9 0 1.4-.5 1.4-1.2s-.5-1.3-1.7-1.3h-54.2zm85 66.4c0-36.7 16.4-66.4 47.2-66.4 30.2 0 47.2 29.7 47.2 66.4s-15.5 66.4-47.2 66.4c-30.7.1-47.2-29.7-47.2-66.4m47.2 69.2c43.8 0 71.4-31 71.4-69.1S325.2 0 281.1 0c-44 0-71.4 31-71.4 69.1s28.5 69.2 71.4 69.2m211.4-3.7c-17.2 1.8-26.7-26.4-35.4-39.8-6.5-9.9-20.3-20-33.9-22 22.4-1.3 47.5-8.5 47.5-33.9 0-20.6-12.7-36.2-59.3-36.2h-53.7c-.7 0-1.4.4-1.4 1.2 0 .8.7 1.3 1.4 1.3H370c2.6 0 5.1 1.8 5.1 6.8v114.9c0 2.4-1.8 6-5 6H358c-1 0-1.4.8-1.4 1.2s.4 1.3 1.4 1.3h57c.8 0 1.5-.4 1.5-1.2 0-.8-.5-1.3-1.6-1.3h-11.5c-1.5 0-5.6-1-5.6-5.5V73.1h5.9c28.2 0 30.3 30.6 44.3 48.1 12 15 27.7 16.9 36.6 16.9 3.8 0 6.4-.1 8.8-.7 1.5-.5 1.8-3.1-.9-2.8m-89-129.4h8.3c14.2 0 37.2 5.6 37.2 32.4 0 24.6-20.4 32.9-39.3 32.9h-12.1V10.8c0-3.4 2.1-5.6 5.9-5.6"></path>
                        </svg>
                      </div>
                      {/* 하 */}
                      <div className="p-5 flex justify-between">
                        <div></div>
                        <div className="text-gold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* THOM BROWNE */}
              <div className="md:row-start-7 md:row-span-2 h-[350px]">
                <div className="h-full bg-white rounded-2xl border-4 border-lightGold hover:border-gold transition hover:scale-[1.02] cursor-pointer shadow-black hover:shadow-black shadow-lg hover:shadow-xl">
                  <Link href="/profile/THOM BROWNE">
                    <a className="h-full flex flex-col justify-between">
                      <div className="p-10 flex justify-center items-center">
                        <img
                          src="https://duosshop.co.uk/image/theme/brand_logos/thom-browne.svg"
                          alt="#"
                          className="w-full object-cover"
                        />
                      </div>
                      {/* 하 */}
                      <div className="p-5 flex justify-between">
                        <div></div>
                        <div className="text-gold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* LV */}
              <div className="md:row-start-2 md:row-span-2 h-[350px]">
                <div className="h-full bg-[#453630] rounded-2xl border-4 border-lightGold hover:border-gold transition hover:scale-[1.02] cursor-pointer shadow-black hover:shadow-black shadow-lg hover:shadow-xl">
                  <Link href="/profile/LOUIS VUITTON">
                    <a className="h-full flex flex-col justify-between">
                      <div className="p-10 flex justify-center items-center text-[#9B7E4B]">
                        <svg
                          className="w-full h-full object-cover"
                          fill="currentColor"
                          viewBox="0 0 151 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M67.637.293l3.816 9.205L75.269.293h2.725L71.746 15.39l-.293.294-.294-.294L64.911.293h2.726zm-13.712 0c1.468 0 2.86.767 3.627 1.887l-1.467 1.468h-.462c-.304-.65-.973-1.048-1.698-1.048-.863 0-1.672.71-1.72 1.614-.035.68.277 1.105.84 1.468.606.391.854.554 1.677 1.006.897.493 3.166 1.46 3.166 4.005 0 2.509-2.097 4.843-4.802 4.843-.347 0-.976-.039-1.446-.147-1.325-.321-2.129-.822-2.998-1.845l1.887-1.929.65.545c.293.23.937.693 1.55.776 1.246.169 2.082-.655 2.244-1.468.129-.642-.034-1.6-1.069-2.096 0 0-1.866-1.037-2.684-1.51-.833-.482-1.719-1.798-1.719-3.375 0-1.174.538-2.311 1.405-3.103.67-.614 1.589-1.09 3.019-1.09zM138.67 0l9.77 9.77V.587l.294-.294h1.929l.294.294v14.802h-.462l-9.602-9.602v9.309l-.294.293h-1.929l-.293-.293V.293L138.67 0zm-28.807.293v2.223l-.294.293h-2.222v12.58h-2.516V2.809h-2.516V.587l.294-.294h7.254zm9.225 0v2.223l-.294.293h-2.222v12.58h-2.516V2.809h-2.516V.587l.294-.294h7.254zM2.516.293v12.58h5.032v2.516H0V.587L.293.293h2.223zm14.257 0a7.548 7.548 0 110 15.096 7.548 7.548 0 010-15.096zm111.54 0a7.548 7.548 0 110 15.096 7.548 7.548 0 010-15.096zm-98.415 0l.293.294v9.77a2.516 2.516 0 005.032 0V.587l.294-.294h1.929l.293.294v9.77a5.032 5.032 0 01-10.064 0V.587l.294-.294h1.929zm15.389 0v14.803l-.294.293h-2.222V.587l.293-.294h2.223zm37.446 0l.293.294v9.77a2.516 2.516 0 005.032 0V.587l.294-.294h1.928l.294.294v9.77a5.032 5.032 0 01-10.064 0V.587l.294-.294h1.929zm15.389 0v14.803l-.294.293h-2.222V.587l.293-.294h2.223zM16.772 2.81a5.032 5.032 0 10.001 10.065 5.032 5.032 0 000-10.065zm111.541 0a5.032 5.032 0 100 10.065 5.032 5.032 0 000-10.065z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0555/3725/files/louis-vuitton-logo_1024x1024.jpg?v=1525874771"
                          alt="#"
                          className="h-[150px] w-full"
                        />
                      </div>

                      {/* 하 */}
                      <div className="p-5 flex justify-between">
                        <div></div>
                        <div className="text-gold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* SL */}
              <div className="md:row-start-4 md:row-span-2 h-[350px]">
                <div className="h-full bg-white rounded-2xl border-4 border-lightGold hover:border-gold transition hover:scale-[1.02] cursor-pointer shadow-black hover:shadow-black shadow-lg hover:shadow-xl">
                  <Link href="/profile/SAINT LAURENT">
                    <a className="h-full flex flex-col justify-between">
                      <div className="p-10 flex justify-center items-center">
                        <img
                          src="https://www.ysl.com/on/demandware.static/-/Library-Sites-Library-SLP/default/dwe0d034a6/images/logo-small.svg"
                          alt="#"
                          className="w-full object-cover"
                        />
                      </div>
                      {/* 하 */}
                      <div className="p-5 flex justify-between">
                        <div></div>
                        <div className="text-gold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* BALENCIAGA */}
              <div className="md:row-start-6 md:row-span-2 h-[350px]">
                <div className="h-full bg-textGray rounded-2xl border-4 border-lightGold hover:border-gold transition hover:scale-[1.02] cursor-pointer shadow-black hover:shadow-black shadow-lg hover:shadow-xl">
                  <Link href="/profile/BALENCIAGA">
                    <a className="h-full flex flex-col justify-between">
                      <div className="p-10 flex justify-center items-center">
                        <img
                          src="https://www.balenciaga.com/on/demandware.static/-/Sites/default/dw67decde1/images/logo/BAL/logo.svg"
                          alt="#"
                          className="w-full object-cover"
                        />
                      </div>
                      {/* 하 */}
                      <div className="p-5 flex justify-between">
                        <div></div>
                        <div className="text-gold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Brand;
