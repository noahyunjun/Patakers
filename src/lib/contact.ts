import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { validateContactInput } from "~/lib/contact-schema";
import { captureServerError } from "~/lib/monitoring";

export type ContactResult = { ok: true } | { ok: false; message: string };

export const sendContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }: { data: unknown }): Promise<ContactResult> => {
    const parsed = validateContactInput(data);
    if (!parsed.ok) {
      return { ok: false, message: parsed.message };
    }

    const { name, email, message } = parsed.data;

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
        subject: "[Partakers] 함께하기 문의 도착",
        replyTo: email,
        text: `이름: ${name}\n이메일: ${email}\n메시지: ${message || "(없음)"}`,
      });

      return { ok: true };
    } catch (error) {
      captureServerError(error, {
        feature: "contact-email",
        email,
      });
      return { ok: false, message: "메일 전송 실패" };
    }
  });
