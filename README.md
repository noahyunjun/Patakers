# Patakers

찬양팀 히스토리와 문의 수집을 위한 Next.js 랜딩 페이지

## 프로젝트 소개

Patakers는 찬양팀의 발자취를 기록하고 방문자와 소통하기 위한 웹 애플리케이션입니다.

### 주요 기능
- 📋 찬양팀 히스토리 타임라인 (TanStack React Table)
- 📧 연락처 폼 (Resend 이메일 전송)
- 🎨 반응형 디자인 (Tailwind CSS)
- ⚡ 최적화된 성능 (Next.js 15 App Router)

## 기술 스택

- **Framework**: Next.js 15.4.6
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **State Management**: TanStack React Query 5.85.0
- **Table UI**: TanStack React Table 8.21.3
- **Email Service**: Resend 6.0.1
- **HTTP Client**: ky 1.8.2
- **Package Manager**: Yarn 4.9.2

## 시작하기

### 개발 환경 설정

1. 저장소 클론:
```bash
git clone https://github.com/noahyunjun/Patakers.git
cd Patakers/patakers
```

2. 의존성 설치:
```bash
yarn install
```

3. 환경 변수 설정 (`.env.local` 파일 생성):
```bash
RESEND_API_KEY=your_resend_api_key_here
CONTACT_RECEIVER_EMAIL=your_email@example.com
```

4. 개발 서버 실행:
```bash
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 프로젝트 구조

```
patakers/
├── src/
│   └── app/
│       ├── api/send/          # 이메일 전송 API
│       ├── page.tsx           # 메인 랜딩 페이지
│       ├── layout.tsx         # 루트 레이아웃
│       └── globals.css        # 전역 스타일
├── public/                    # 정적 파일
├── DEPLOYMENT.md              # 배포 가이드
└── package.json
```

## 빌드 및 배포

### 로컬 빌드
```bash
yarn build
yarn start
```

### Vercel 배포
자세한 배포 방법은 [DEPLOYMENT.md](./DEPLOYMENT.md) 문서를 참고하세요.

간단 요약:
1. GitHub에 코드 푸시
2. Vercel에서 레포지토리 Import
3. 환경 변수 설정 (`RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`)
4. 배포 완료!

## 환경 변수

| 변수명 | 설명 | 필수 여부 |
|--------|------|-----------|
| `RESEND_API_KEY` | Resend API 키 (이메일 전송) | ✅ 필수 |
| `CONTACT_RECEIVER_EMAIL` | 문의 메일 수신 주소 | ✅ 필수 |

## 스크립트

```bash
yarn dev       # 개발 서버 실행 (Turbopack)
yarn build     # 프로덕션 빌드
yarn start     # 프로덕션 서버 실행
yarn lint      # ESLint 실행
```

## Learn More

Next.js에 대해 더 알아보기:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js 기능 및 API 학습
- [Learn Next.js](https://nextjs.org/learn) - 인터랙티브 Next.js 튜토리얼
- [Next.js GitHub](https://github.com/vercel/next.js) - 피드백 및 기여 환영!

## 라이선스

이 프로젝트는 개인/교회 용도로 사용됩니다.

## 문의

프로젝트에 대한 문의사항은 배포된 사이트의 연락처 폼을 이용해주세요.
