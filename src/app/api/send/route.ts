import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    if (!name || !email) {
      return NextResponse.json(
        { ok: false, message: "이름과 이메일은 필수입니다." },
        { status: 400 }
      );
    }

    // 받는 메일은 환경변수로 주입
    const to = process.env.CONTACT_RECEIVER_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;
    if (!to) {
      return NextResponse.json(
        {
          ok: false,
          message: "CONTACT_RECEIVER_EMAIL 환경변수가 설정되지 않았습니다.",
        },
        { status: 500 }
      );
    }
    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          message: "RESEND_API_KEY 환경변수가 설정되지 않았습니다.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Patakers <onboarding@resend.dev>",
      to,
      subject: "새 랜딩 문의 도착",
      replyTo: email,
      text: `이름: ${name}\n이메일: ${email}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "메일 전송 실패" },
      { status: 500 }
    );
  }
}
