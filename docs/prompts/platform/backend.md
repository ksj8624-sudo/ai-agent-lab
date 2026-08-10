# Backend Platform Rules

## 프로젝트

Backend 프로젝트에서 작업할 때 항상 아래 규칙을 따른다.

현재 프로젝트 구조와 코딩 스타일을 우선하며,
요청 범위를 벗어난 리팩토링은 하지 않는다.

실제 실행 코드와 현재 등록된 Route를 기준으로 판단한다.

---

## 기술 스택

- Runtime: Node.js
- Language: JavaScript
- Framework: Express
- Database: 현재 프로젝트에서 사용하는 Database와 Repository 구조
- HTTP: Express Router, Controller
- External API: 기존 OpenAI 연동
- External CLI: Cursor, Codex, Claude
- Async: Promise, `async/await`
- Environment: 기존 환경 변수 관리 방식

새로운 라이브러리는 임의로 추가하지 않는다.

실제 프로젝트가 위 구조와 다르면
문서보다 현재 실행 코드를 우선한다.

---

## 아키텍처

현재 프로젝트에서 사용하는 다음 계층 구조를 유지한다.

Route
→ Controller
→ Service
→ Repository 또는 External Client
→ Database / External API / CLI

각 계층의 책임을 유지한다.

- Route는 Endpoint 등록과 Middleware 연결에 집중한다.
- Controller는 Request를 해석하고 Response를 반환한다.
- Service는 비즈니스 로직과 실행 흐름을 담당한다.
- Repository는 Database 접근을 담당한다.
- External Client 또는 Executor는 외부 API와 CLI 실행을 담당한다.

기존에 존재하지 않는 계층을 형식만 맞추기 위해 임의로 추가하지 않는다.

단순 기능에 불필요한 추상화를 만들지 않는다.

---

## Route 규칙

- 기존 Router 등록 방식을 유지한다.
- Endpoint와 HTTP Method를 임의로 변경하지 않는다.
- 신규 API는 승인된 API 명세를 기준으로 구현한다.
- 기존 API 명세가 있다면 해당 명세를 우선한다.
- Route 경로를 여러 파일에 중복 등록하지 않는다.
- Route에서는 복잡한 비즈니스 로직을 작성하지 않는다.
- Request Validation Middleware가 이미 있다면 재사용한다.
- 등록되지 않은 오래된 Route를 작업 범위 밖에서 임의로 활성화하지 않는다.

---

## Controller 규칙

- Controller는 Request의 Path, Query, Header, Body를 읽고 검증된 값을 Service에 전달한다.
- 비즈니스 로직을 Controller에 과도하게 작성하지 않는다.
- HTTP Status와 Response Body는 기존 API 계약을 따른다.
- 성공 응답과 실패 응답의 기존 구조를 임의로 통일하지 않는다.
- `res.json()`, `res.send()`, `res.status()` 호출 후 중복 응답이 발생하지 않도록 한다.
- 오류는 기존 Error Handler 또는 현재 프로젝트의 오류 처리 방식으로 전달한다.
- Controller 내부에서 Database에 직접 접근하지 않는다.
- Controller 내부에서 CLI를 직접 실행하지 않는다.

---

## Service 규칙

- 비즈니스 로직과 작업 흐름은 Service에 둔다.
- 기존 Service의 역할과 네이밍을 유지한다.
- Agent 선택, Workspace 선택, Task Type 처리 등 기존 도메인 규칙을 우선한다.
- Review와 Plan처럼 계약과 처리 흐름이 다르면 억지로 하나의 함수로 합치지 않는다.
- 공통화는 실제 중복과 책임이 명확할 때만 수행한다.
- 장시간 작업은 Timeout과 오류 복구를 고려한다.
- 외부 API 또는 CLI 결과를 무조건 성공으로 간주하지 않는다.
- 오류를 빈 문자열이나 임의의 성공 응답으로 숨기지 않는다.

---

## Repository 및 Database 규칙

- Database 접근은 기존 Repository 또는 Database 계층을 사용한다.
- Controller나 Route에서 SQL을 직접 실행하지 않는다.
- 기존 Table과 Column 이름을 임의로 변경하지 않는다.
- 기존 데이터를 삭제하거나 초기화하지 않는다.
- Migration이 필요하면 구현 전에 명세와 영향 범위를 확인한다.
- 조회 결과가 없을 때의 반환 방식은 기존 Repository 규칙을 따른다.
- Insert, Update, Delete 실패를 숨기지 않는다.
- History 저장 실패가 Agent 실행 결과까지 실패시킬지 여부는 기존 정책을 따른다.
- Query Parameter를 SQL 문자열에 직접 연결하지 않는다.
- Parameter Binding 또는 현재 프로젝트의 안전한 Query 방식을 사용한다.

---

## API 계약

- API 명세가 존재하면 명세를 구현 기준으로 사용한다.
- Method, Endpoint, Request, Response, Error 계약을 임의로 변경하지 않는다.
- Request 필드명을 보기 좋게 바꾸지 않는다.
- Response 필드를 임의로 추가하거나 제거하지 않는다.
- Allowed Values와 Enum은 실제 코드와 API 명세를 일치시킨다.
- Nullable과 Optional 필드를 명확하게 처리한다.
- API 변경이 필요하면 코드를 먼저 수정하지 않고 명세 변경 필요성을 보고한다.
- 기존 구현을 문서화하는 작업에서는 실제 실행 코드를 기준으로 As-Is를 기록한다.

Review와 Plan처럼 API 계약이 다르면
하나의 DTO 또는 공통 Response로 억지로 합치지 않는다.

---

## Validation 규칙

- 필수값 누락을 명확히 검사한다.
- 문자열 입력은 필요한 경우 앞뒤 공백을 제거한다.
- 빈 문자열과 값 누락을 구분해야 하는 경우 기존 정책을 따른다.
- Agent Type, Workspace, Task Type은 실제 허용 값만 받는다.
- 잘못된 Enum은 실행 계층까지 전달하지 않는다.
- Validation 실패 시 기존 HTTP Status와 Response 형식을 유지한다.
- Validation 규칙을 Controller, Service 여러 곳에 중복 작성하지 않는다.
- 새로운 Validation Library를 임의로 추가하지 않는다.

---

## Agent 및 CLI 실행 규칙

- 기존 공통 CLI Executor를 우선 재사용한다.
- Cursor, Codex, Claude별 Executor 또는 Service 책임을 유지한다.
- Workspace 경로는 기존 Workspace 설정을 통해 조회한다.
- 절대 경로를 실행 코드에 새로 하드코딩하지 않는다.
- Command, Args, Working Directory를 명확히 구분한다.
- `stdout`, `stderr`, Exit Code를 확인한다.
- CLI 종료 실패를 성공 응답으로 처리하지 않는다.
- 장시간 실행에 기존 Timeout 정책을 유지한다.
- Process가 종료되지 않고 남는 경우를 고려한다.
- 비밀 정보와 전체 환경 변수를 로그에 출력하지 않는다.
- 사용자 Prompt를 로그에 남길 때 민감 정보 가능성을 고려한다.
- 여러 Agent의 실행 계약이 다르면 각 Executor에서 차이를 유지한다.

---

## 비동기 및 오류 처리

- 비동기 함수는 `async/await`와 기존 Promise 패턴을 일관되게 사용한다.
- 처리되지 않은 Promise가 남지 않도록 한다.
- `try-catch`는 오류를 실제로 처리하거나 문맥을 추가할 때 사용한다.
- 오류를 잡은 뒤 로그만 남기고 성공처럼 반환하지 않는다.
- 필요한 정리 작업은 `finally` 또는 기존 정리 방식으로 수행한다.
- Timeout, 외부 API 오류, CLI 오류, Database 오류를 가능한 범위에서 구분한다.
- 오류 메시지에 API Key, Token, Password, 환경 변수 값을 포함하지 않는다.
- Stack Trace 노출은 기존 개발 및 운영 환경 정책을 따른다.

---

## Response 규칙

- 기존 API의 성공 및 오류 Response 구조를 유지한다.
- `ok`, `answer`, `topic`, `message`, `error`, `items` 등의 사용 방식을 임의로 통일하지 않는다.
- HTTP Status와 Response Body가 서로 모순되지 않도록 한다.
- 실패 응답에 성공 상태를 의미하는 값을 넣지 않는다.
- 긴 Agent 응답과 Markdown 문자열을 손상시키지 않는다.
- `undefined` 값이 의도치 않게 JSON에서 누락되는지 확인한다.
- Response를 여러 번 보내지 않는다.

---

## 환경 변수 및 보안

- 기존 환경 변수 이름과 로딩 방식을 유지한다.
- `.env` 실제 값을 출력하거나 문서에 복사하지 않는다.
- API Key, Token, Password를 코드에 하드코딩하지 않는다.
- 새로운 환경 변수가 필요하면 이름과 목적만 제안하고 실제 값을 만들지 않는다.
- 로그에 전체 Request Header 또는 인증 정보를 출력하지 않는다.
- CORS, 인증, 권한 정책을 작업 범위 밖에서 임의로 완화하지 않는다.
- 파일 시스템 접근 경로가 Workspace 범위를 벗어나지 않도록 한다.

---

## 로그 규칙

- 기존 로그 Prefix와 형식을 유지한다.
- Route 진입, Agent 실행 시작, 완료, 실패를 구분한다.
- 디버깅 로그를 과도하게 추가하지 않는다.
- 작업 완료 후 불필요한 임시 로그는 제거한다.
- 오류 로그에는 실행 위치와 필요한 문맥을 포함한다.
- 비밀 정보와 민감한 Prompt 내용은 노출하지 않는다.

---

## 코드 작성 규칙

- CommonJS 또는 ES Module 방식은 현재 프로젝트 설정을 따른다.
- 기존 네이밍과 파일 배치 방식을 유지한다.
- 사용하지 않는 함수, 변수, Import를 남기지 않는다.
- 불필요한 Class, Factory, Interface 구조를 추가하지 않는다.
- 같은 의미의 상수와 Alias를 여러 파일에 중복 정의하지 않는다.
- Magic String은 기존 Constants 구조가 있을 때 재사용한다.
- 함수가 하나 이상의 책임을 과도하게 가지지 않도록 한다.
- 단순 코드에 과도한 추상화를 도입하지 않는다.
- 주석은 코드로 드러나지 않는 의도와 제약을 설명할 때만 작성한다.

---

## 작업 제한

- 새로운 Architecture 도입 금지
- 기존 기능 제거 금지
- 요청 범위 밖 리팩토링 금지
- 신규 패키지 추가 금지
- Node.js 또는 Express 버전 변경 금지
- Database 종류 변경 금지
- Table 및 Column 임의 변경 금지
- API 계약 임의 변경 금지
- Workspace 경로 하드코딩 추가 금지
- `.env` 및 보안 파일 수정 금지
- API Key, Token, Password 출력 금지
- 다른 프로젝트 수정 금지
- Git Commit 및 Push 금지

---

## 다른 프로젝트와의 경계

`private-agent-backend`와 다른 프로젝트의 책임을 혼동하지 않는다.

다음 기능이 다른 프로젝트에 존재한다면
Backend 작업 범위에 임의로 포함하지 않는다.

- Telegram Bot Command 처리
- Lambda 실행
- Telegram Polling 또는 Webhook
- Client UI 구현
- Android, iOS, Web 상태 관리

다른 프로젝트의 코드가 참고 대상으로 제공되더라도
명시된 수정 대상만 변경한다.

---

## 빌드 및 테스트

작업 후 가능한 범위에서 다음을 수행한다.

- Syntax Error 확인
- 사용하지 않는 Import와 변수 확인
- 관련 API 수동 테스트
- 기존 API 회귀 확인
- Lint 또는 Test Script 실행
- 서버 시작 확인

프로젝트의 실제 `package.json` Script를 먼저 확인한 뒤 적절한 명령을 사용한다.

예:

```bash
npm run lint
npm test
npm start
```

실제 Script가 없으면 임의로 만들지 않는다.

Agent나 CLI를 실제 실행해야 하는 테스트는
비용, 실행 시간, 파일 변경 가능성을 고려한다.

실제 실행하지 못한 테스트는 성공했다고 보고하지 않는다.

---

## 완료 보고

다음을 요약한다.

- 변경한 파일
- 주요 변경 사항
- 유지한 기존 구조
- API 계약 변경 여부
- Database 변경 여부
- 실행한 테스트 또는 검증 명령
- 테스트 결과
- 확인이 필요한 사항
- 다른 프로젝트 변경 여부
