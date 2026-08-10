# AI 작업 프롬프트 관리 가이드

## 1. 문서 목적

이 문서는 `ai-agent-lab` 프로젝트에서 사용하는 프롬프트와 산출물의
폴더 구조, 파일 역할, 작업 흐름을 정의한다.

프롬프트 구조가 변경되거나 작업 방향이 혼란스러울 때
이 문서를 기준으로 다시 정리한다.

이 문서에 정의된 역할을 변경해야 한다면
기존 파일을 먼저 수정하지 말고 변경 이유와 영향 범위를 검토한다.

---

## 2. 기본 원칙

AI 작업은 다음 요소를 분리해서 관리한다.

- Platform: 플랫폼별 고정 개발 규칙
- Task: 작업 유형별 빈 작성 양식
- Workflow: 실제 요구사항이 작성된 완성형 작업 요청서
- Documentation Prompt: 문서 생성 전용 템플릿
- Design Document: 설계 작업의 실제 결과물
- API Document: API 명세 작업의 실제 결과물
- Architecture Document: 시스템 및 프로젝트 구조의 실제 결과물

각 파일은 하나의 역할만 가진다.

Platform 파일에 특정 기능 요구사항을 넣지 않는다.

Task 파일에 플랫폼별 기술 규칙을 반복하지 않는다.

Workflow 파일에는 실제 작업에 필요한 내용을 작성한다.

생성된 결과물은 프롬프트 폴더가 아니라 해당 산출물 폴더에 저장한다.

---

## 3. 확정 폴더 구조

```text
docs/
├── api/
│   └── 실제 API 명세서
│
├── architecture/
│   └── 실제 시스템 및 프로젝트 구조 문서
│
├── designs/
│   └── 실제 기능 설계 결과물
│
├── guides/
│   ├── prompt-writing-guide.md
│   └── prompt-workflow-guide.md
│
└── prompts/
    ├── documentation/
    │   └── 문서 생성용 템플릿
    │
    ├── platform/
    │   └── 플랫폼별 고정 개발 규칙
    │
    ├── tasks/
    │   └── 작업 유형별 빈 작성 양식
    │
    └── workflows/
        └── 실제 요구사항이 작성된 완성형 작업 요청서
```

---

## 4. 폴더별 역할

## 4.1 docs/prompts/documentation

특정 종류의 문서를 생성하기 위한 재사용 템플릿을 저장한다.

현재 예시:

docs/prompts/documentation/api-spec.md

api-spec.md는 다음 내용을 정의한다.

API 명세서 작성 절차
코드 분석 범위
API 목록 구성
Request와 Response 작성 규칙
Error 작성 규칙
XLSX 출력 구조
작업 제한
완료 기준

프로젝트 경로와 저장 위치 등을 변경해서 재사용할 수 있다.

생성 결과 예시:

docs/api/backend-api-spec.xlsx

## 4.2 docs/prompts/platform

각 플랫폼에서 작업할 때 지켜야 하는 고정 개발 규칙을 저장한다.

현재 파일:

docs/prompts/platform/android.md
docs/prompts/platform/ios.md
docs/prompts/platform/web.md
docs/prompts/platform/backend.md

포함하는 내용:

기술 스택
현재 아키텍처
상태 관리
API 처리 방식
코드 작성 규칙
작업 제한
빌드 및 테스트
완료 보고 형식

포함하지 않는 내용:

특정 기능 요구사항
로그인 페이지 구현 내용
History 기능 구현 내용
개별 작업의 수정 파일
개별 작업의 완료 기준

Platform 파일은 자주 바뀌지 않는 고정 규칙이다.

## 4.3 docs/prompts/tasks

작업 요청을 작성할 때 사용하는 빈 양식을 저장한다.

현재 파일:

docs/prompts/tasks/design.md
docs/prompts/tasks/feature.md
docs/prompts/tasks/review.md
docs/prompts/tasks/refactor.md
docs/prompts/tasks/bugfix.md

Task 파일은 특정 기능 내용이 없는 빈 시험지다.

예를 들어 design.md는 다음과 같은 목차만 가진다.

작업 목표
수정 대상 프로젝트
현재 구조 분석
요구사항 분석
영향 범위 분석
구현 설계
변경 예정 파일
데이터 흐름
API 영향
위험 요소
구현 순서
테스트 계획
예상 난이도
완료 기준
승인 요청

Task 파일에는 플랫폼 기술 규칙을 반복해서 넣지 않는다.

실제 작업 요구사항도 Task 파일 자체에 저장하지 않는다.

## 4.4 docs/prompts/workflows

실제 AI에게 전달할 수 있도록 요구사항이 모두 작성된
완성형 작업 요청서를 저장한다.

현재 예시:

docs/prompts/workflows/login-page.md

login-page.md에는 다음 내용이 작성되어 있다.

작업 목표
참고 대상
수정 대상
현재 상태
기능 요구사항
기술 및 구조 요구사항
API 계약
작업 제한
작업 절차
중단 조건
완료 기준
완료 보고

Workflow 파일은 Task 양식을 복사한 뒤 실제 요구사항을 채워 만든다.

파일 이름은 작업 내용을 알 수 있게 작성한다.

예:

login-page.md
android-agent-list.md
ios-agent-list.md
backend-history.md

## 4.5 docs/designs

설계 작업을 수행한 뒤 생성된 실제 설계 결과물을 저장한다.

예:

docs/designs/agent-history.md
docs/designs/login-flow.md
docs/designs/mobile-sync.md

tasks/design.md는 설계 요청 양식이고,
docs/designs/\*.md는 실제 설계 결과물이다.

둘을 혼동하지 않는다.

## 4.6 docs/api

API 명세 작업의 실제 결과물을 저장한다.

예:

docs/api/backend-api-spec.xlsx
docs/api/server-api-spec.xlsx

prompts/documentation/api-spec.md는 명세 생성 템플릿이고,
docs/api/\*.xlsx는 실제 생성된 명세서다.

## 4.7 docs/architecture

시스템 또는 프로젝트 전체 구조에 관한 실제 문서를 저장한다.

예:

docs/architecture/system-architecture.md
docs/architecture/backend-architecture.md
docs/architecture/client-architecture.md

특정 기능 하나의 설계는 designs에 저장하고,
프로젝트 전체 구조는 architecture에 저장한다.

---

## 5. 파일 간 관계

Platform
→ 작업 시 지켜야 하는 고정 규칙

Task
→ 작업 내용을 작성하기 위한 빈 양식

Workflow
→ Task 양식에 실제 요구사항을 채운 완성형 요청서

Design Document
→ Design Workflow 실행 결과

API Document
→ API Documentation Prompt 실행 결과

예:

platform/web.md

- tasks/feature.md
- 로그인 페이지 요구사항
  = workflows/login-page.md

설계 예:

platform/ios.md

- tasks/design.md
- Agent History 요구사항
  = 설계 요청

설계 요청 결과
= designs/agent-history-ios.md

구현 예:

platform/ios.md

- tasks/feature.md
- designs/agent-history-ios.md
  = workflows/agent-history-ios-feature.md

---

## 6. 기본 작업 흐름

## 6.1 신규 기능

1. 요구사항 정리
2. tasks/design.md를 기준으로 설계 요청서 작성
3. 필요한 platform 문서 첨부 또는 참조
4. AI로 설계 수행
5. 설계 결과를 docs/designs에 저장
6. 설계 검토 및 승인
7. API가 필요하면 API 명세를 먼저 작성 또는 변경
8. tasks/feature.md를 기준으로 구현 요청서 작성
9. 승인된 설계와 platform 문서를 첨부
10. AI로 기능 구현
11. 빌드 및 테스트
12. review 작업 수행

핵심 흐름:

요구사항
→ 설계
→ 설계 승인
→ API 명세
→ 구현
→ 테스트
→ 리뷰

## 6.2 기존 UI 변경

로그인 페이지처럼 설계 문서 없이 바로 진행 가능한 작은 작업은
완성형 Workflow를 직접 작성할 수 있다.

1. 관련 Task 양식을 선택
2. 참고 대상과 수정 대상을 구분
3. 현재 동작과 유지할 기능 작성
4. UI 요구사항 작성
5. 작업 제한과 완료 기준 작성
6. workflows 폴더에 저장
7. AI에게 전달
8. 빌드 및 결과 확인

예:

workflows/login-page.md

## 6.3 API 명세 작성

1. prompts/documentation/api-spec.md 사용
2. 분석 대상 프로젝트 경로 입력
3. 문서 저장 경로 입력
4. 명세 범위와 제외 범위 입력
5. AI가 실제 코드를 분석
6. XLSX 명세 생성
7. 결과를 docs/api에 저장

이미 구현된 API는 As-Is 명세로 작성한다.

신규 API는 원칙적으로 API 명세를 먼저 확정한 뒤 구현한다.

## 6.4 기능 리뷰

1. tasks/review.md를 기준으로 리뷰 요청 작성
2. Platform 규칙과 승인된 설계 문서 참조
3. 구현 코드가 설계와 일치하는지 확인
4. 버그, 오류 처리, 구조, 중복, 네이밍 확인
5. 코드를 수정하지 않고 의견만 받을지 명확히 지정
6. 리뷰 결과를 검토

---

## 7. Task 선택 기준

Design

구현 전에 구조, 영향 범위, 파일, 데이터 흐름, API 영향을 설계할 때 사용한다.

Feature

승인된 요구사항 또는 설계서를 실제 코드로 구현할 때 사용한다.

Review

현재 코드의 문제점과 설계 일치 여부를 검토할 때 사용한다.

Refactor

기능 변경 없이 구조, 중복, 네이밍, 책임 분리를 개선할 때 사용한다.

Bugfix

재현 가능한 오류의 원인을 분석하고 필요한 범위만 수정할 때 사용한다.

---

## 8. 네이밍 규칙

Platform

플랫폼 이름을 그대로 사용한다.

android.md
ios.md
web.md
backend.md
Task

작업 유형을 그대로 사용한다.

design.md
feature.md
review.md
refactor.md
bugfix.md
Workflow

실제 작업 내용을 알 수 있게 작성한다.

login-page.md
agent-history-android.md
agent-history-ios-feature.md
backend-history-review.md
Design 결과물

기능 또는 영역 이름을 사용한다.

agent-history.md
login-flow.md
mobile-sync.md

필요한 경우 플랫폼을 포함한다.

agent-history-android.md
agent-history-ios.md

---

## 9. 변경 시 원칙

현재 폴더 역할을 임의로 변경하지 않는다.

구조를 변경해야 할 경우 다음을 먼저 확인한다.

기존 역할로 해결할 수 없는가?
새 폴더나 파일 유형이 반드시 필요한가?
기존 파일의 위치가 달라지는가?
README와 이 가이드도 함께 수정해야 하는가?
Telegram 자동화와 경로 설정에 영향이 있는가?

역할 변경이 확정되면 다음을 함께 수정한다.

이 가이드
프로젝트 README
관련 프롬프트
Telegram 또는 Backend 경로 설정
기존 파일 위치

---

## 10. 현재 진행 상태

완료
prompts/documentation/api-spec.md
prompts/platform/android.md
prompts/platform/ios.md
prompts/platform/web.md
prompts/platform/backend.md
prompts/tasks/design.md
prompts/workflows/login-page.md
다음 작업
prompts/tasks/feature.md
prompts/tasks/review.md
prompts/tasks/refactor.md
prompts/tasks/bugfix.md

Task 템플릿 작성 후 Telegram에서 Android, iOS Workspace와
프롬프트 문서 조합 기능을 추가한다.
