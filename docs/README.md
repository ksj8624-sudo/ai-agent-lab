# ai-agent-lab

개인 AI Agent 프로젝트의 Web 클라이언트입니다.

Backend API와 연동하여 AI 작업 요청과 실행 이력 조회 기능을 제공합니다.

## 주요 기능

- Login 화면
- Agent 실행 이력 조회
- Review 요청
- Plan 요청
- Cursor / Codex / Claude 선택
- Workspace 선택
- 요청 로딩, 결과, 오류 상태 표시

## 기술 스택

- React
- TypeScript
- Vite
- React Router
- CSS
- Fetch API 또는 기존 API Client

## 실행 방법

```bash
npm install
npm run dev
```

## 기본 개발 서버

http://localhost:5173

## 프로젝트 구조

src/
docs/
├── api/
├── architecture/
├── designs/
├── guides/
└── prompts/
├── documentation/
├── platform/
├── tasks/
└── workflows/

## 문서폴더

docs/api

서버 API 명세서와 연동 계약 문서를 저장합니다.

docs/designs

기능 구현 전 작성한 설계 문서를 저장합니다.

docs/architecture

프로젝트 전체 구조와 시스템 설계를 저장합니다.

docs/guides

프롬프트 작성법과 개발 가이드를 저장합니다.

docs/prompts

AI 개발 도구에 전달할 재사용 가능한 프롬프트를 저장합니다.

documentation: 문서 생성 프롬프트
platform: Android, iOS, Web, Backend별 작업 규칙
tasks: Design, Feature, Review, Refactor, Bugfix 작업 템플릿
workflows: 여러 프로젝트 또는 단계를 연결하는 작업 프롬프트

## 연동 프로젝트

private-agent-backend
→ Backend API

private-agent
→ Android

PrivateAgent
→ iOS

private-agent-server
→ Telegram / Lambda

## 개발 원칙

API 명세를 기준으로 클라이언트를 구현합니다.
기존 프로젝트 구조와 코딩 스타일을 유지합니다.
AI 작업은 설계 문서와 프롬프트 템플릿을 기준으로 진행합니다.
참고 프로젝트와 수정 대상 프로젝트를 명확히 분리합니다.
범위 밖 리팩토링과 불필요한 패키지 추가를 피합니다.
기능 구현 후 타입 검사와 빌드를 수행합니다.
