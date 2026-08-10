# 🤖 Private Agent Roadmap

> Private Agent의 장기 개발 계획과 현재 진행 상황을 관리하는 문서입니다.

---

# Vision

Private Agent는 AI 기반 개인 개발 에이전트 플랫폼입니다.

Backend, Web, Android, iOS를 하나의 생태계로 구성하여
개발자의 반복 작업을 자동화하는 것을 목표로 합니다.

주요 목표는 다음과 같습니다.

- AI 기반 개발 지원
- 코드 리뷰 자동화
- 로컬 AI Agent 실행
- GitHub 및 CI/CD 자동화
- 개발 Workflow 자동화
- 멀티 플랫폼 지원

---

# Phase 1 - Foundation ✅

## Backend

- [x] Express Server
- [x] Health Check API
- [x] 기본 Route 구조
- [x] Controller / Service 분리
- [x] 환경 변수 관리
- [x] SQLite 연동

## Telegram

- [x] Telegram Bot 기본 구조
- [x] `/start`
- [x] `/help`
- [x] `/ping`
- [x] `/status`
- [x] Backend API 호출 구조

---

# Phase 2 - OpenAI Integration ✅

## AI

- [x] Ask API
- [x] Plan API
- [x] Review API
- [x] OpenAI API 연동

## Prompt

- [x] Plan Prompt
- [x] Review Prompt
- [x] Prompt 파일 분리
- [x] 요청 유형별 Prompt 구성

## Telegram

- [x] `/ask`
- [x] `/plan`
- [x] `/review`
- [x] 긴 AI 응답 분할 전송

---

# Phase 3 - GitHub AI Review ✅

## GitHub

- [x] GitHub Webhook
- [x] Pull Request Event Processing
- [x] Pull Request Diff Fetch
- [x] GitHub REST API 연동

## AI Review

- [x] PR Diff 기반 OpenAI Review
- [x] GitHub PR Comment
- [x] Telegram Review Notification

## History

- [x] Review History SQLite 저장
- [x] Review History 조회 API

---

# Phase 4 - Local AI Agent ✅

## Agent Execution

- [x] Cursor CLI Integration
- [x] Codex CLI Integration
- [x] Claude CLI Integration
- [x] `child_process.spawn` 기반 공통 CLI Executor

## Workspace

- [x] Backend Workspace
- [x] Server Workspace
- [x] Web Workspace

## Task Type

- [x] Feature
- [x] Review
- [x] Refactor
- [x] Bugfix

## Prompt

- [x] Task Type 기반 Prompt 선택
- [x] `.cursor/prompts/*.md` 파일 기반 Prompt 구성
- [x] Cursor / Codex / Claude 공통 Prompt 사용 구조

## History

- [x] Agent 실행 이력 저장
- [x] 성공 / 실패 상태 저장
- [x] 실행 시간 저장
- [x] Agent History 조회 API

---

# Phase 5 - Client Applications 🚧

## Web

- [x] Login UI
- [x] Agent List
- [x] Agent 실행
- [x] Ask
- [x] Plan
- [x] Review
- [x] Agent History UI
- [ ] 실제 Login Authentication 연동

## Android

- [x] Login UI
- [x] Agent List
- [x] Agent 실행
- [x] Ask
- [x] Plan
- [x] Review
- [x] History
- [ ] 실제 Login Authentication 연동

## iOS

- [x] Login UI
- [x] Agent List
- [x] Agent 실행
- [x] Ask
- [x] Plan
- [x] Review
- [x] History
- [ ] 실제 Login Authentication 연동

---

# Phase 6 - Prompt & Development Workflow ✅

## Platform Rules

- [x] Backend
- [x] Web
- [x] Android
- [x] iOS

## Task Templates

- [x] Design
- [x] Feature
- [x] Review
- [x] Refactor
- [x] Bugfix

## Documentation

- [x] API Specification Template
- [x] Prompt Workflow Guide
- [x] Backend API Specification
- [x] Login Authentication Design

## Workflow

- [x] Login Page Workflow
- [x] Platform별 개발 규칙 구성
- [x] Task Type별 Prompt Template 구성

---

# Phase 7 - Authentication 🚧

## Backend

- [x] Authentication Design
- [x] Auth API Specification
- [ ] User Table
- [ ] Refresh Token Table
- [ ] Login API
- [ ] Refresh API
- [ ] Logout API
- [ ] Me API
- [ ] JWT Middleware
- [ ] Seed Admin User

## Web

- [ ] Login API 연동
- [ ] Access Token 관리
- [ ] Refresh Token 관리
- [ ] 인증 Route Guard

## Android

- [ ] Login API 연동
- [ ] Access Token 관리
- [ ] Refresh Token Secure Storage
- [ ] 인증 상태 관리

## iOS

- [ ] Login API 연동
- [ ] Access Token 관리
- [ ] Refresh Token Keychain 저장
- [ ] 인증 상태 관리

---

# Phase 8 - Multi Project & Repository

## Workspace

- [ ] Workspace 동적 등록
- [ ] Workspace 설정 관리
- [ ] Android Workspace 추가
- [ ] iOS Workspace 추가

## GitHub

- [ ] Repository Registration
- [ ] Repository Settings
- [ ] Multi Repository Support
- [ ] Repository별 Agent 설정

## Client

- [ ] Web / Android / iOS 기능 동기화
- [ ] 공통 Agent History 동기화
- [ ] 공통 API 계약 적용

---

# Phase 9 - CI/CD & Automation

## GitHub Pull Request

- [ ] PR Review 결과 통합 메시지
- [ ] PR Review 상태 요약
- [ ] PR 변경 시 Review 갱신
- [ ] Duplicate Review Prevention
- [ ] Review Score

## Jenkins

### Backend

- [ ] Build
- [ ] Unit Test

### Web

- [ ] Build
- [ ] Test

### Android

- [ ] Build
- [ ] Unit Test
- [ ] APK / AAB 생성

### iOS

- [ ] Build
- [ ] Unit Test
- [ ] Archive 생성

## Jenkins Integration

- [ ] GitHub Webhook 연동
- [ ] Pull Request Build
- [ ] Main Branch Build
- [ ] Build Artifact 관리
- [ ] Build 결과 Backend 전달

## Telegram Notification

- [ ] Build 시작 알림
- [ ] Build 성공 알림
- [ ] Build 실패 알림
- [ ] Test 결과 알림
- [ ] 실패 Stage / Error Summary
- [ ] PR Review + Build 결과 통합 메시지

---

# Phase 10 - Deployment

## Backend

- [ ] 자동 배포
- [ ] 배포 결과 확인

## Web

- [ ] Production Build
- [ ] 자동 배포

## Android

- [ ] APK 자동 생성
- [ ] AAB 자동 생성
- [ ] Artifact 관리

## iOS

- [ ] Archive 자동 생성
- [ ] IPA Export
- [ ] Artifact 관리

## Release

- [ ] Release Note 자동 생성
- [ ] GitHub Release 자동 생성
- [ ] Version 관리
- [ ] Telegram Release Notification

---

# Phase 11 - AI Workflow Automation

## Workflow

- [ ] Prompt 자동 조합
- [ ] Design → Feature 자동 실행
- [ ] Feature → Review 자동 실행
- [ ] Design → Feature → Review 전체 Workflow

## n8n

- [ ] n8n Integration
- [ ] GitHub Workflow 연결
- [ ] Telegram Workflow 연결
- [ ] Agent 실행 Workflow 연결

## MCP

- [ ] MCP Integration
- [ ] 외부 Tool 연결
- [ ] Agent Context 확장

## Multi Agent

- [ ] Agent 역할 분리
- [ ] Agent 간 작업 전달
- [ ] Multi Agent Collaboration

---

# Future Ideas

- [ ] Slack Notification
- [ ] Discord Notification
- [ ] Jira Integration
- [ ] Notion Integration
- [ ] Figma Integration
- [ ] Linear Integration
- [ ] Gemini Agent
- [ ] Multi LLM Routing
- [ ] Commit Message Generator
- [ ] Release Note Generator
- [ ] Issue Summary
- [ ] Agent 실행 통계
- [ ] Monitoring Dashboard

---

# Current Status

## Implemented

- Telegram AI Bot
- OpenAI Ask / Plan / Review
- GitHub Webhook 기반 PR 자동 리뷰
- GitHub PR Comment
- Telegram Review Notification
- Review History
- Cursor / Codex / Claude Agent
- Agent History
- Web Client
- Android Client
- iOS Client
- Platform Rules
- Task Templates
- API Specification
- Design Documentation

## In Progress

- Authentication
- Client Authentication 연동

## Planned

- Multi Repository
- Jenkins CI
- Android / iOS 자동 Build
- PR Review + Build Telegram Summary
- Deployment Automation
- n8n
- MCP
- AI Workflow Automation

---

# Milestones

| Version | 주요 목표                          |
| ------- | ---------------------------------- |
| v1.0    | OpenAI + Telegram                  |
| v1.5    | GitHub AI PR Review                |
| v2.0    | Local AI Agent                     |
| v2.5    | Web / Android / iOS Client         |
| v3.0    | Authentication                     |
| v3.5    | Multi Repository / Workspace       |
| v4.0    | Jenkins CI/CD                      |
| v4.5    | Automated Deployment               |
| v5.0    | n8n / MCP / AI Workflow Automation |

---

# Long-term Goal

```text
Developer
     │
     ▼
GitHub Push / Pull Request
     │
     ▼
Private Agent
     │
     ├──────────────┐
     ▼              ▼
AI Review       Jenkins CI
     │              │
     │       ┌──────┼───────┐
     │       ▼      ▼       ▼
     │    Backend  Web   Android / iOS
     │       │      │       │
     └───────┴──────┴───────┘
                     │
                     ▼
              Result Aggregation
                     │
                     ▼
                 Telegram
                     │
         ┌───────────┼───────────┐
         ▼           ▼           ▼
        Web       Android       iOS
```
