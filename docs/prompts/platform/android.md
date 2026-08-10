# Android Platform Rules

## 프로젝트

Android 프로젝트에서 작업할 때 항상 아래 규칙을 따른다.

프로젝트 구조와 코딩 스타일을 유지하며,
범위를 벗어난 리팩토링은 하지 않는다.

---

## 기술 스택

- Language: Kotlin
- UI: Jetpack Compose
- Architecture: MVVM
- Navigation: Navigation Compose
- Network: 기존 AgentApi 사용
- Async: Coroutine
- State: StateFlow 또는 기존 상태 관리 방식

새로운 라이브러리는 추가하지 않는다.

실제 프로젝트가 위 구조와 다르면
문서보다 현재 실행 코드를 우선한다.

---

## 아키텍처

다음 계층 구조를 유지한다.

UI(Screen)

↓

ViewModel

↓

Repository(필요한 경우)

↓

AgentApi

↓

Backend

기존 계층을 우회하지 않는다.

---

## UI 규칙

- 기존 디자인 시스템을 유지한다.
- 기존 Compose Component를 우선 재사용한다.
- Material3를 유지한다.
- Hard Coding을 최소화한다.
- 기존 Navigation 흐름을 유지한다.

---

## 상태 관리

- ViewModel을 사용한다.
- UI에서 Business Logic을 작성하지 않는다.
- Loading, Success, Error 상태를 명확히 구분한다.

---

## API

- 기존 API 계약을 변경하지 않는다.
- Request DTO를 임의로 수정하지 않는다.
- Response DTO를 임의로 수정하지 않는다.
- Backend 명세를 우선한다.

---

## 코드 작성 규칙

- 기존 네이밍 규칙을 유지한다.
- 불필요한 추상화를 만들지 않는다.
- 사용하지 않는 코드를 남기지 않는다.
- Nullable 처리를 명확히 한다.
- Coroutine Scope를 올바르게 사용한다.

---

## 작업 제한

- 새로운 Architecture 도입 금지
- 기존 기능 제거 금지
- 범위 밖 리팩토링 금지
- Build Script 수정 금지
- Gradle Version 변경 금지
- Dependency 추가 금지
- Git Commit / Push 금지

---

## 작업 완료 후

가능하면 다음을 수행한다.

- Build
- Compile Error 확인
- 변경 파일 목록 작성
- 테스트 결과 보고

---

## 완료 보고

다음을 요약한다.

- 변경 파일
- 주요 변경 사항
- Build 결과
- 테스트 결과
- 확인이 필요한 사항

## Cross Platform

Android는 기준 플랫폼이 아니다.

필요한 경우

- iOS
- Web

프로젝트와 UX를 비교하여

기능과 사용자 경험이 가능한 범위 내에서 일관성을 유지한다.

단,

플랫폼 특성에 맞는 구현 방식은 유지한다.
