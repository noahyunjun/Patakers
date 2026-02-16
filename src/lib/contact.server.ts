import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export type ContactInput = {
  name: string;
  email: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; message: string };

export const sendContact = createServerFn({ method: "POST" })
  .inputValidator((data: ContactInput) => data)
  .handler(async ({ data }: { data: ContactInput }): Promise<ContactResult> => {
    const name = data?.name?.trim();
    const email = data?.email?.trim();

    if (!name || !email) {
      return { ok: false, message: "이름과 이메일은 필수입니다." };
    }

    const to = process.env.CONTACT_RECEIVER_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (!to) {
      return {
        ok: false,
        message: "CONTACT_RECEIVER_EMAIL 환경변수가 설정되지 않았습니다.",
      };
    }

    if (!apiKey) {
      return {
        ok: false,
        message: "RESEND_API_KEY 환경변수가 설정되지 않았습니다.",
      };
    }

    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Patakers <onboarding@resend.dev>",
        to,
        subject: "새 랜딩 문의 도착",
        replyTo: email,
        text: `이름: ${name}\n이메일: ${email}`,
      });

      return { ok: true };
    } catch {
      return { ok: false, message: "메일 전송 실패" };
    }
  });
