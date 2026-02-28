# Patakers

TanStack Start 기반 찬양팀 히스토리/문의 수집 랜딩 페이지입니다.  
배포 타겟은 Netlify 기준으로 구성되어 있습니다.

## 기술 스택

- Framework: TanStack Start (React)
- Router: TanStack Router (file-based)
- Language: TypeScript
- Styling: Tailwind CSS v4
- Table UI: TanStack React Table
- Validation: Valibot (client + server shared schema)
- Email: Resend
- Error Tracking: Sentry (client/server)
- E2E Test: Playwright
- Motion/UI Library Source: ReactBits (via installer)
- Package Manager: pnpm
- Deploy: Netlify

## 빠른 시작

1. 의존성 설치

```bash
corepack prepare pnpm@10.17.1 --activate
corepack pnpm install
```

2. 로컬 환경변수 파일 생성 (`.env`)

```env
RESEND_API_KEY=your_resend_api_key_here
CONTACT_RECEIVER_EMAIL=your_email@example.com
SENTRY_DSN=your_server_sentry_dsn_optional
VITE_SENTRY_DSN=your_client_sentry_dsn_optional
```

3. 개발 서버 실행

```bash
corepack pnpm dev
```

4. 빌드 확인

```bash
corepack pnpm build
```

## 프로젝트 구조

```text
src/
  routes/
    __root.tsx          # 루트 문서/메타
    index.tsx           # 랜딩 UI + 폼
  lib/
    history.ts          # 히스토리 데이터
    contact.ts          # Resend 서버 함수
    contact-schema.ts   # Valibot 입력 검증 스키마
    monitoring.client.ts # 브라우저 Sentry 초기화
    monitoring.ts        # 서버 Sentry 에러 캡처
  styles/
    globals.css         # 전역 스타일
  router.tsx            # TanStack Router 설정
```

## 스크립트

```bash
corepack pnpm dev
corepack pnpm build
corepack pnpm preview
corepack pnpm start
corepack pnpm lint
corepack pnpm test:e2e:install
corepack pnpm test:e2e
corepack pnpm reactbits:list
corepack pnpm reactbits:check
corepack pnpm reactbits:install
```

## ReactBits 사용 방식

`reactbits.dev`는 일반적인 npm UI 라이브러리 import 방식이 아니라, 컴포넌트를 프로젝트로 복사하는 방식입니다.

- 설치 확인: `corepack pnpm reactbits:check`
- 컴포넌트 동기화: `corepack pnpm reactbits:install`
- 출력 경로: `src/components/reactbits`

## Netlify 기준 배포 설정

이 프로젝트는 `/Users/mac/Desktop/User/Patakers/patakers/netlify.toml` 기준으로 빌드됩니다.

- Build command: `vite build`
- Publish directory: `dist/client`
- Functions output: Netlify Vite plugin이 자동 생성

필수 환경변수(넷리파이 UI에서 설정):

- `RESEND_API_KEY`
- `CONTACT_RECEIVER_EMAIL`

선택 환경변수(에러 트래킹):

- `SENTRY_DSN`
- `VITE_SENTRY_DSN`

배포 상세 절차는 `/Users/mac/Desktop/User/Patakers/patakers/DEPLOYMENT.md`를 참고하세요.
