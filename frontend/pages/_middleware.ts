// 수정 금지
// Server와 Controller 중간에서 처리

import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // console.log(req);

  // 로그인 확인

  // 브라우저 접속 차단 (크롬만 가능)
  if (req.ua?.browser.name !== "Chrome") {
    return new Response("구글 크롬으로 접속해 주시기 바랍니다.");
  }

  // 봇 접속 차단
  if (req.ua?.isBot) {
    return new Response("봇 접속 불가", { status: 403 });
  }
}
