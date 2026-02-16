# Netlify 배포 가이드 (TanStack Start)

## 1. 사전 준비

- GitHub 저장소에 코드 푸시
- Netlify 계정 준비
- Resend API 키 준비

## 2. 프로젝트 연결

1. Netlify에서 **Add new project** 선택
2. GitHub 저장소 연결
3. 브랜치 선택 (권장: `main`)

## 3. 빌드 설정

`netlify.toml`을 사용합니다.

```toml
[build]
  command = "vite build"
  publish = "dist/client"
```

## 4. 환경 변수 설정

Netlify 프로젝트 설정에서 아래 값 추가:

- `RESEND_API_KEY`
- `CONTACT_RECEIVER_EMAIL`

권장:
- Production/Preview를 분리해 각각 별도 값 사용

## 5. 배포 확인

1. 첫 배포 완료 후 사이트 접속
2. 히스토리 테이블 렌더링 확인
3. 문의 폼 제출 후 수신 메일 확인
4. 실패 시 Netlify Functions 로그 확인

## 6. 자동 배포

- `main` 브랜치 푸시 시 Production 자동 배포
- Pull Request 생성 시 Deploy Preview 자동 생성
