# Patakers

TanStack Start 기반의 찬양팀 히스토리/문의 수집 랜딩 페이지입니다.

## 기술 스택

- Framework: TanStack Start (React)
- Router: TanStack Router (file-based)
- Language: TypeScript
- Styling: Tailwind CSS v4
- Table UI: TanStack React Table
- Email: Resend
- Package Manager: pnpm
- Deploy: Netlify

## 실행 방법

1. 의존성 설치

```bash
corepack prepare pnpm@10.17.1 --activate
pnpm install
```

2. 환경 변수 설정 (`.env` 또는 Netlify 환경변수)

```bash
RESEND_API_KEY=your_resend_api_key_here
CONTACT_RECEIVER_EMAIL=your_email@example.com
```

3. 개발 서버 실행

```bash
pnpm dev
```

## 스크립트

```bash
pnpm dev
pnpm build
pnpm preview
pnpm start
pnpm lint
```

## 배포 (Netlify)

- `netlify.toml` 기준 빌드 설정
- Build command: `vite build`
- Publish directory: `dist/client`
- Netlify 환경변수:
  - `RESEND_API_KEY`
  - `CONTACT_RECEIVER_EMAIL`

자세한 절차는 `DEPLOYMENT.md`를 참고하세요.
