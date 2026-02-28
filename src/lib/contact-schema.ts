import * as v from "valibot";

export const contactInputSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "이름은 필수입니다."),
    v.maxLength(60, "이름은 60자 이하로 입력해 주세요."),
  ),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "이메일은 필수입니다."),
    v.email("유효한 이메일 형식이 아닙니다."),
    v.maxLength(120, "이메일은 120자 이하로 입력해 주세요."),
  ),
  message: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.maxLength(2000, "메시지는 2000자 이하로 입력해 주세요."),
    ),
    "",
  ),
});

export type ContactInput = v.InferOutput<typeof contactInputSchema>;

type ContactParseResult =
  | { ok: true; data: ContactInput }
  | { ok: false; message: string };

export function validateContactInput(input: unknown): ContactParseResult {
  const result = v.safeParse(contactInputSchema, input);

  if (!result.success) {
    const message = result.issues[0]?.message ?? "입력값이 올바르지 않습니다.";
    return { ok: false, message };
  }

  return { ok: true, data: result.output };
}
