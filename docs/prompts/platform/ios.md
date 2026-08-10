# IOS Platform Rules

## 프로젝트

iOS 프로젝트에서 작업할 때 항상 아래 규칙을 따른다.

프로젝트 구조와 코딩 스타일을 유지하며,
범위를 벗어난 리팩토링은 하지 않는다.

---

## 기술 스택

- Language: Swift
- UI: SwiftUI
- Architecture: 기존 MVVM
- Navigation: NavigationStack
- Network: 기존 AgentApi / URLSession
- Async: Swift Corrency {`sync/await`}
- State: ObservableObject, `@StateObject`, `@Published` 또는 프로젝트의 기존 상태 관리 방식

- 새로운 라이브러리는 추가하지 않는다.

- 실제 프로젝트가 위 구조와 다르면
- 문서보다 현재 실행 코드를 우선한다.

---

## 아키텍처

다음 계층 구조를 유지한다.

View

↓

ViewModel

↓

AgentApi 네트워크계층

↓

Backend

- 기존 계층을 우회하지 않는다.
- Repository 계층이 현재 존재하지 않는다면
- Android 구조를 맞추기 위해 임의로 추가하지 않는다.

- 새 기능도 기존 프로젝트의 계층 구조를 우선한다.

---

## UI 규칙

- 기존 SwiftUI View와 공통 Component를 우선 재사용한다.
- 화면 상태와 비즈니스 로직을 View에 직접 작성하지 않는다.
- View는 화면 구성과 사용자 이벤트 전달에 집중한다.
- 긴 View는 의미 있는 단위로 분리한다.
- 단순히 코드 줄 수를 줄이기 위한 과도한 Component 분리는 하지 않는다.
- 기존 NavigationStack과 화면 이동 구조를 유지한다.
- 기존 색상, 폰트, 간격, 버튼 스타일을 우선 재사용한다.
- 가능하면 Dynamic Type과 Safe Area를 고려한다.
- 고정 크기와 불필요한 하드코딩을 최소화한다.

---

## 상태 관리

- View가 직접 생성하고 소유하는 ViewModel은 @StateObject 사용한다.
- 외부에서 전달받은 ObservableObject는 기존 구조에 맞게 @ObservedObject를 사용한다.
- ViewModel에서 UI 상태를 변경하는 작업은 MainActor에서 수행한다.
- 기존 ViewModel에 @MainActor가 적용되어 있다면 유지한다.
- Loading, Success, Empty, Error 상태를 명확히 처리한다.
- 요청 시작 전 이전 오류 상태를 적절히 초기화한다.
- 요청 종료 시 성공과 실패 모두 Loading 상태가 해제되도록 한다.
- 필요한 경우 defer를 사용해 상태 복구 누락을 방지한다.

---

## API

- 기존 AgentApi와 URLSession 구성을 우선 재사용한다.
- 기존 Base URL 관리 방식을 유지한다.
- URL을 새로 하드코딩하지 않는다.
- 기존 API 계약을 임의로 변경하지 않는다.
- Request 및 Response 모델의 필드명을 임의로 변경하지 않는다.
- 서버 JSON과 Swift 프로퍼티 이름이 다르면 CodingKeys를 사용한다.
- Nullable 응답은 Optional로 명확하게 처리한다.
- HTTP Status Code를 확인한 후 Response를 Decode한다.
- Decode 실패 원인을 숨기지 않는다.
- Backend API 명세가 존재하면 해당 명세를 우선한다.

- Review와 Plan처럼 API 계약이 서로 다르면
- 억지로 하나의 Request 또는 Response 모델로 합치지 않는다.

---

## 코드 작성 규칙

- 기존 네이밍과 파일 구성 방식을 유지한다.
- Swift API Design Guidelines에 맞는 이름을 사용한다.
- 불필요한 Protocol과 추상화를 추가하지 않는다.
- 사용하지 않는 코드와 Import를 남기지 않는다.
- 강제 언래핑(!)을 새로 추가하지 않는다.
- 불필요한 try!와 as!를 사용하지 않는다.
- Access Control은 기존 프로젝트 규칙을 따른다.
- Preview가 기존 화면에 있다면 유지하고, 빌드를 깨뜨리지 않도록 한다.

---

## 비동기 처리

- 비동기 API는 async/await를 사용한다.
- UI 이벤트에서 비동기 함수를 호출할 때는 기존 방식에 맞게 Task를 사용한다.
- 오류 처리는 do-catch로 명확하게 처리한다.
- 취소가 필요한 요청은 Task cancellation을 고려한다.
- Main Thread를 차단하는 동기 작업을 추가하지 않는다.
- 장시간 Agent 요청에 기존 Timeout 정책을 유지한다.

---

## 작업 제한

- 신규 라이브러리 또는 Swift Package 추가 금지
- Android 그대로 복제 금지
- 새로운 Architecture 도입 금지
- 기존 기능 제거 금지
- 범위 밖 리팩토링 금지
- Swift Package 버전 수정 금지
- Signing 및 Provisioning 설정 변경 금지
- Bundle Identifier 변경 금지
- Deployment Target 변경 금지
- Info.plist와 Entitlement의 불필요한 수정 금지
- API 계약 임의 변경 금지
- .env 또는 보안 파일 수정 금지
- Git Commit / Push 금지

---

## 빌드 및 테스트

가능하면 다음을 수행한다.

- 변경 파일의 Compile Error 확인
- 사용하지 않는 Import 확인
- Preview 또는 관련 화면 확인
- 기존 기능 회귀 확인
- Xcode 프로젝트 또는 Workspace 기준 빌드

---

## 완료 보고

다음을 요약한다.

- 변경 파일
- 주요 변경 사항
- Build 결과
- 테스트 결과
- 확인이 필요한 사항
- 다른 프로젝트 변경 여부

## Cross Platform

iOS가 기준 플랫폼이 아니다.

필요한 경우

- Android
- Web

프로젝트와 UX를 비교하여

기능과 사용자 경험이 가능한 범위 내에서 일관성을 유지한다.

단,

플랫폼 특성에 맞는 구현 방식은 유지한다.
