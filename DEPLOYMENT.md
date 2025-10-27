# Patakers 배포 가이드

## 프로젝트 개요
찬양팀 히스토리와 문의 수집을 위한 Next.js 랜딩 페이지

## 배포 방법: Vercel

Vercel은 Git 레포지토리를 기반으로 자동 배포를 지원합니다.

---

## 1단계: Git 레포지토리 준비 (GitHub)

### 1-1. GitHub 레포지토리 생성
- GitHub에 접속하여 `patakers` (또는 원하는 이름) 레포지토리 생성
- Public 또는 Private 설정

### 1-2. 로컬 프로젝트를 GitHub에 푸시

프로젝트 루트 폴더에서 터미널을 열고 다음 명령어 실행:

```bash
# 1. 모든 파일 추가
git add .

# 2. 첫 커밋
git commit -m "feat: Initial project setup for Patakers"

# 3. 원격 레포지토리 연결 (이미 연결되어 있으면 생략)
git remote add origin https://github.com/noahyunjun/Patakers.git

# 4. GitHub로 코드 푸시
git push -u origin main
```

> **참고**: `https://github.com/noahyunjun/Patakers.git` 부분은 생성한 레포지토리 URL로 변경하세요.

---

## 2단계: Vercel 프로젝트 생성 및 배포

### 2-1. Vercel 로그인
- [Vercel](https://vercel.com)에 접속하여 GitHub 계정으로 로그인

### 2-2. 프로젝트 Import
1. Vercel 대시보드에서 **[Add New...] → [Project]** 선택
2. **[Import Git Repository]** 목록에서 `patakers` 레포지토리 찾기
3. **[Import]** 버튼 클릭

### 2-3. 프로젝트 설정 (⭐ 중요!)

#### Framework Preset
- Vercel이 자동으로 **Next.js**로 인식

#### Environment Variables (환경 변수) 설정
프로젝트가 Resend API를 사용하기 위해 필수적으로 입력해야 합니다:

| Key | Value | 설명 |
|-----|-------|------|
| `RESEND_API_KEY` | [Resend API 키] | Resend 대시보드에서 발급받은 API 키 |
| `CONTACT_RECEIVER_EMAIL` | [수신 이메일] | 연락처 폼 제출 시 메일을 받을 이메일 주소 |

**환경 변수 추가 방법:**
1. Vercel 프로젝트 설정 화면에서 **Environment Variables** 섹션 찾기
2. 위 두 개의 Key-Value 쌍을 입력
3. Environment는 **Production**, **Preview**, **Development** 모두 선택 권장

### 2-4. 배포 시작
1. 환경 변수 추가 완료 후 **[Deploy]** 버튼 클릭
2. Vercel이 자동으로 빌드 및 배포 시작 (약 1~2분 소요)
3. 배포 완료 시 `https://your-project.vercel.app` 형태의 URL 생성

---

## 3단계: 배포 확인

### 확인 사항
1. 생성된 Vercel URL 접속
2. 찬양팀 히스토리 테이블이 정상적으로 표시되는지 확인
3. **연락처 폼 테스트**:
   - 이름과 이메일 입력 후 전송
   - 설정한 `CONTACT_RECEIVER_EMAIL`로 메일 도착 확인

---

## 자동 재배포

GitHub 레포지토리에 새로운 커밋을 푸시하면 Vercel이 자동으로 감지하여 재배포합니다.

```bash
# 코드 수정 후
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main
```

푸시 즉시 Vercel 대시보드에서 배포 진행 상황을 확인할 수 있습니다.

---

## 환경 변수 관리

### Resend API 키 발급 방법
1. [Resend](https://resend.com) 가입 및 로그인
2. 대시보드에서 **API Keys** 섹션으로 이동
3. **[Create API Key]** 클릭하여 새 키 생성
4. 생성된 키를 복사하여 Vercel 환경 변수에 추가

### Vercel에서 환경 변수 수정
1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Environment Variables** 이동
3. 수정하고자 하는 변수의 **[Edit]** 또는 **[Add New]** 클릭
4. 변경 후 **[Save]** → 재배포 필요시 **[Redeploy]**

---

## 트러블슈팅

### 이메일이 전송되지 않을 때
- Vercel 환경 변수에 `RESEND_API_KEY`와 `CONTACT_RECEIVER_EMAIL`이 정확히 입력되었는지 확인
- Resend 대시보드에서 API 키가 유효한지 확인
- Vercel 배포 로그에서 에러 메시지 확인

### 빌드 실패 시
- Vercel 배포 로그 확인
- 로컬에서 `yarn build` 실행하여 빌드 오류 확인
- `node_modules` 삭제 후 `yarn install` 재실행

### 환경 변수 변경이 반영되지 않을 때
- Vercel 대시보드에서 수동으로 **[Redeploy]** 실행
- 환경 변수는 빌드 시점에 주입되므로 재배포가 필요합니다

---

## 로컬 개발 환경 설정

배포 전 로컬에서 테스트하려면 `.env.local` 파일을 생성하세요:

```bash
# .env.local
RESEND_API_KEY=your_resend_api_key_here
CONTACT_RECEIVER_EMAIL=your_email@example.com
```

```bash
# 개발 서버 실행
yarn dev
```

`http://localhost:3000`에서 앱을 테스트할 수 있습니다.

---

## 커스텀 도메인 설정 (선택 사항)

1. Vercel 프로젝트 대시보드 → **Settings** → **Domains**
2. 원하는 도메인 입력 (예: `patakers.com`)
3. DNS 설정에 따라 Vercel이 제공하는 레코드 추가
4. DNS 전파 완료 후 커스텀 도메인으로 접속 가능

---

## 참고 링크

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Vercel 배포 가이드](https://vercel.com/docs)
- [Resend 문서](https://resend.com/docs)
- [GitHub 저장소](https://github.com/noahyunjun/Patakers)

