# 🤖 Private Agent

AI-Powered Personal Development Platform

개인 개발 생산성을 위한 AI 기반 개발 에이전트 플랫폼입니다.

`ai-agent-lab`은 더 이상 단순 Web Client 저장소가 아니라, **Private Agent 플랫폼의 메인 저장소**로서 전체 프로젝트의 문서, 아키텍처, AI 프롬프트 체계를 관리합니다. 이 README는 Web 프로젝트 소개가 아니라 Backend, Telegram Server, Android, iOS를 포함한 **플랫폼 전체**를 소개하는 문서입니다.

---

## Platform Overview

| Repository | Role |
|------------|------|
| ai-agent-lab | Main Repository / Documentation / Web Client |
| private-agent-backend | AI Engine / REST API |
| private-agent-server | Telegram Bot Gateway |
| private-agent-android | Android Native Client |
| private-agent-ios | iOS Native Client |

---

## 1. Project Overview

Private Agent는 다섯 개의 독립 저장소로 구성된 개인용 AI 개발 에이전트 플랫폼입니다.

- **목표**: 질의응답, 개발 계획 수립, 코드 리뷰, PR 리뷰, 로컬 AI Agent 실행 등 개발자의 반복 작업을 AI에게 위임한다.
- **구성**: 하나의 Backend를 중심으로 Telegram / Web / Android / iOS 네 개의 Client가 각각 직접 연결된다.
- **저장소**: `private-agent-backend`, `private-agent-server`, `ai-agent-lab`, `private-agent-android`, `private-agent-ios`.

각 저장소의 상세한 구현 내용은 해당 저장소의 README를 참고하며, 이 문서는 플랫폼 전체의 관점만 다룹니다.

---

## 2. Vision

- **AI Development Platform** — Ask / Plan / Review를 통한 AI 기반 개발 지원
- **GitHub Automation** — PR 자동 리뷰를 시작으로 한 GitHub 연동 자동화
- **Local AI Agent** — Cursor / Codex / Claude CLI를 이용한 로컬 코드 작업 실행
- **Multi Platform** — Telegram / Web / Android / iOS로 동일한 기능에 접근
- **Workflow Automation** — Design → Implementation → Review로 이어지는 AI 주도 개발 Workflow 자동화 (장기 목표)

---

## 3. Platform Architecture

```text
                 Developer
          ┌────────┴────────┐
          ▼                 ▼
    Telegram Bot      GitHub Pull Request
          │                 │
          └────────┬────────┘
                   ▼
        Private Agent Backend
          ├──────────────┬──────────────┐
          ▼              ▼              ▼
       OpenAI      Local AI Agents    SQLite
                   (Cursor/Codex/
                     Claude)
          ▲
          │
 ┌────────┼───────────────┐
 ▼        ▼               ▼
Web   Android          iOS
```

Backend는 GitHub Webhook과 SQLite에도 연결되어 있으며, Web / Android / iOS는 History 조회뿐 아니라 자체 요청(Ask / Plan / Review / Agent 실행)도 Backend에 직접 보냅니다.

```text
Developer ──► GitHub ──► Webhook ──┐
                                    ▼
Web ──┐                    Private Agent Backend ──┬─► OpenAI
Android ──┤ ── 직접 호출 ──►        │                ├─► Local AI Agents (Cursor/Codex/Claude)
iOS ──┘                            │                └─► SQLite (Review / Agent History)
                                    ▲
                          Telegram Bot ◄── Developer
```

즉 Telegram, Web, Android, iOS는 서로를 경유하지 않고 **Backend 하나만을 공통으로 직접 호출**하는 병렬 구조입니다.

---

## 4. Platform Components

### ai-agent-lab (본 저장소)

- Main Repository
- Documentation & Prompt System 운영
- Web Client
- Architecture 문서 저장 위치

### private-agent-backend

- REST API (Express)
- AI Engine (OpenAI 기반 Ask / Plan / Review)
- GitHub Integration (Webhook, PR 자동 리뷰, PR Comment)
- Review / Agent History (SQLite)
- Agent Execution (Cursor / Codex / Claude CLI)

### private-agent-server

- Telegram Bot
- Backend API Gateway 역할 (Telegram 명령을 Backend API 호출로 변환)
- Telegram Command Processing (`/start`, `/help`, `/ask`, `/plan`, `/review`, Agent 실행 명령 등)

### private-agent-android

- Android Native Client (Kotlin / Jetpack Compose)
- Backend 직접 호출

### private-agent-ios

- iOS Native Client (Swift / SwiftUI)
- Backend 직접 호출

각 Component의 세부 기능, 화면 구조, API 연동 방식은 해당 저장소의 README에서 다룹니다.

---

## 5. Documentation Structure

```text
docs
├── api            # API Specification 문서를 저장한다.
├── architecture   # 시스템/프로젝트 구조 문서 저장 
├── designs        # 기능 설계 결과물 저장 (login-auth.md 작성됨)
├── guides         # 프롬프트 작성법 및 개발 워크플로 가이드
└── prompts
    ├── documentation  # 문서(README, API 명세) 생성용 템플릿
    ├── platform       # Android/iOS/Web/Backend 플랫폼별 고정 개발 규칙
    ├── tasks          # 작업 유형별 빈 양식 (Design/Feature/Refactor/Bugfix)
    └── workflows      # 실제 요구사항을 채운 완성형 작업 요청서
```

- **docs/api**: 각 Backend/Server의 실제 API를 분석해 생성한 As-Is 명세서를 저장한다. 신규 API 설계 문서가 아니다.
- **docs/architecture**: 시스템 전체 또는 개별 프로젝트의 구조 문서를 저장한다.
- **docs/designs**: 기능 구현 전에 작성한 설계 결과물을 저장한다. Task 양식(`tasks/design.md`)과 실제 결과물(`designs/*.md`)은 구분된다.
- **docs/guides**: 프롬프트 작성 방법과 폴더 구조/작업 흐름에 대한 가이드를 저장한다.
- **docs/prompts**: AI 개발 도구에 전달할 재사용 가능한 프롬프트를 역할별로 분리해 저장한다.

---

## 6. Development Workflow

```text
Design
  ↓
API Specification
  ↓
Feature (Implementation)
  ↓
Test
  ↓
Review
  ↓
GitHub PR
  ↓
AI Review (자동)
```

- 설계 문서가 필요한 작업은 `tasks/design.md`로 설계 요청서를 작성하고, 승인된 설계를 `docs/designs`에 저장한 뒤 구현으로 넘어간다.
- API가 필요한 작업은 구현 전에 API 명세를 먼저 확정한다(`docs/prompts/documentation/api-spec.md`).
- 설계 없이 진행 가능한 작은 작업은 완성형 `workflows/*.md` 요청서를 바로 작성해 구현한다.
- GitHub에 Pull Request가 생성되면 `private-agent-backend`의 Webhook이 Diff를 수집해 OpenAI로 자동 리뷰하고 PR Comment와 Telegram 알림으로 전달한다 (구현됨).

---

## 7. Prompt System

`docs/prompts`는 역할이 겹치지 않도록 네 종류로 분리되어 있습니다.

| 종류 | 폴더 | 역할 |
| --- | --- | --- |
| Platform | `prompts/platform` | 플랫폼별로 항상 지켜야 하는 고정 개발 규칙 (기술 스택, 아키텍처, 작업 제한) |
| Task | `prompts/tasks` | 작업 유형별 빈 작성 양식 (Design / Feature / Refactor / Bugfix) |
| Workflow | `prompts/workflows` | Task 양식에 실제 요구사항을 채운, AI에게 바로 전달 가능한 완성형 요청서 |
| Documentation | `prompts/documentation` | README, API 명세 등 특정 문서를 생성하기 위한 재사용 템플릿 |

Platform 파일에는 기능 요구사항을 넣지 않고, Task 파일에는 플랫폼 규칙을 반복하지 않으며, 실제 요구사항은 Workflow 파일에만 작성해 각 파일이 하나의 역할만 갖도록 관리합니다.

---

## 8. Current Status

Repository 기준으로 현재 구현이 완료된 항목만 정리합니다. 세부 사항은 각 저장소 README를 참고하세요.

| Repository | 구현됨 |
| --- | --- |
| Backend | Ask / Plan / Review, GitHub PR 자동 리뷰, Agent 실행(Cursor/Codex/Claude), Review/Agent History |
| Server (Telegram) | 기본 명령(`/start` 등), `/ask`·`/plan`·`/review` Backend 위임, Agent 실행 명령 |
| Android | 서버 상태 확인, Plan 요청, Review(Agent 실행) 요청 |
| iOS | 서버 상태 확인, Plan 요청, Review(Agent 실행) 요청(Agent Type 선택 가능) |
| Web | Agent 실행 이력 조회, Review 요청, Plan 요청 |
| Documentation | Platform Rule 4종, Task 양식(Design/Feature/Refactor/Bugfix), Documentation Prompt, Workflow 예시, Login Auth 설계 문서 |
| Prompt System | 폴더 구조 확정 및 운영 중 |

모든 Repository에서 공통적으로 **실제 Login Authentication은 아직 구현되지 않았습니다.**

---

## 9. Roadmap

장기 로드맵의 요약이며, 세부 내용은 `docs/ROADMAP.md`를 참고하세요.

- **Authentication** — Backend JWT/Refresh Token API 및 전 Client 인증 연동
- **Multi Repository** — Workspace 동적 등록, 다중 GitHub Repository 지원
- **Dashboard** — Agent 실행/리뷰 현황을 위한 Monitoring Dashboard
- **Jenkins** — Backend/Web/Android/iOS Build 및 Test 자동화
- **CI/CD** — GitHub Webhook 연동 빌드, 배포 자동화
- **n8n** — GitHub/Telegram/Agent 실행 Workflow 연동
- **MCP** — Model Context Protocol을 통한 외부 Tool 및 Agent Context 확장
- **AI Workflow** — Design → Feature → Review Prompt 자동 조합/실행

---

## 10. Getting Started

플랫폼 전체를 실행하는 권장 순서입니다. 각 단계의 상세 설정은 해당 저장소 README를 따릅니다.

```text
1. Start private-agent-backend

2. Run any client

- Telegram Bot
- Web
- Android
- iOS
```

Backend가 먼저 실행되어 있어야 나머지 Client가 정상적으로 동작합니다. 본 저장소(Web)만 실행하려면:

```bash
npm install
npm run dev
```

---

## 11. Related Projects

| Repository | Role |
|------------|-------------|
| private-agent-backend | AI Engine / REST API |
| private-agent-server | Telegram Bot |
| private-agent-android | Android Client |
| private-agent-ios | iOS Client |







