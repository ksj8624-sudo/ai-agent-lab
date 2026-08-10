# Backend As-Is API 명세서 작성 요청

## 1. 작업 목표

현재 구현이 완료된 Backend 프로젝트의 실제 코드를 분석해서,
클라이언트 개발자가 서버 코드를 직접 열어보지 않고도 연동할 수 있는
As-Is API 명세서를 작성해줘.

이 문서는 신규 API 설계 문서가 아니다.

현재 실행되는 Backend 코드가 제공하는 실제 계약을 문서화하는 것이 목적이다.

서버 코드는 수정하지 말고 문서만 생성해줘.

---

## 2. 분석 대상

### Backend 프로젝트 경로

- `/Users/kimseongjin/Desktop/workspace/private-agent-backend`

### 문서 저장 경로

- `/Users/kimseongjin/Desktop/workspace/private-agent-backend/docs/backend-api-spec.xlsx`

Google Drive에 직접 저장하거나 업로드할 수 있는 기능이 실제로 연결되어 있다면,
로컬 XLSX 파일 생성 후 지정된 Google Drive 계정에도 업로드해줘.

Google Drive 업로드가 불가능하다면 임의로 성공했다고 판단하지 말고,
로컬 파일만 생성한 뒤 업로드하지 못한 이유를 결과에 작성해줘.

### 문서 형식

- Microsoft Excel `.xlsx`
- Google Sheets에서 바로 열 수 있는 테이블 구조
- 한 개의 통합 문서 안에 여러 시트로 구성

### 명세 범위

- 현재 애플리케이션 진입점에서 실제로 등록된 전체 HTTP API
- Health
- OpenAI 질의
- Plan
- Agent 실행
- Agent 실행 이력
- Telegram 관련 HTTP API
- GitHub Webhook 관련 HTTP API
- 기타 실제 Route에 등록된 API

### 명세에서 제외할 범위

- Android, iOS, Web 클라이언트 구현 방식
- Telegram Bot 명령어 파싱 자체
- UI 설계
- 실제 환경 변수 값
- API Key, Token, 비밀번호
- 등록되지 않았거나 실행되지 않는 오래된 코드
- 신규 API 설계 및 Backend 코드 개선

---

## 3. 현재 알려진 프로젝트 정보

### 기술 스택

- Runtime: Node.js
- Framework: Express
- Language: JavaScript
- Database: 실제 Database 초기화 코드와 Repository를 확인해 작성
- 외부 연동: OpenAI
- 외부 CLI: Cursor, Codex, Claude

### 주요 기능

- Health 상태 확인
- OpenAI 질의 요청
- 개발 계획 생성
- Cursor, Codex, Claude 기반 Agent 실행
- Workspace 및 작업 유형 선택
- Agent 실행 이력 저장 및 조회
- Telegram 연동
- GitHub Webhook 및 코드 리뷰 연동

### 주요 Route 또는 기능 영역

- Health
- API 또는 OpenAI
- Dev / Agent
- Plan
- Review History 또는 Agent History
- Telegram
- GitHub

위 명칭은 현재 알려진 정보이므로,
실제 등록된 Route와 다르면 실행 코드를 기준으로 작성해줘.

### 이미 알고 있는 특이사항

- Review와 Plan은 요청 API 또는 Request Body 계약이 다를 수 있다.
- Plan은 `topic` 하나만 요청 Body로 전달하는 API가 존재한다.
- Agent 실행 API는 `agentType`, `workspace`, `taskType`, `task`를 사용할 수 있다.
- Agent 요청은 실행 시간이 길어질 수 있다.
- Cursor, Codex, Claude를 지원한다.
- Telegram 명령 Alias와 Backend API의 실제 값은 다를 수 있다.
- 인증은 아직 구현되지 않았을 가능성이 있다.
- API마다 성공 및 오류 응답 형식이 다를 수 있다.
- 위 내용도 실제 코드와 다르면 코드 기준으로 작성하고 불일치를 기록해줘.

---

## 4. 분석 우선순위

다음 순서로 실제 코드를 추적해줘.

1. 애플리케이션 진입점과 Route 등록
2. Router
3. Controller
4. Request validation
5. Service
6. Repository 및 Database
7. 외부 API 또는 CLI 호출
8. 공통 응답 처리
9. 전역 오류 처리
10. 환경 변수 사용 위치

README나 주석보다 실제 실행 코드를 우선해.

사용되지 않는 파일이 존재할 수 있으므로,
단순히 파일이 존재한다는 이유만으로 명세에 포함하지 마.

실제 Route에 등록되어 호출 가능한 API를 우선 문서화해.

---

## 5. Excel 시트 구성

다음 시트로 구성해줘.

1. `API 목록`
2. `Request 명세`
3. `Response 명세`
4. `Error 명세`
5. `Enum 및 Alias`
6. `공통 규칙`
7. `확인 필요 사항`
8. `변경 이력`

---

## 6. API 목록 작성

현재 서버에서 실제 호출 가능한 API를 모두 찾아 다음 항목을 작성해줘.

| API ID | 기능명 | Method | Endpoint | 인증 | Request 요약 | Response 요약 | 구현 상태 | 비고 |
|---|---|---|---|---|---|---|---|---|

API ID는 다음 원칙으로 생성해줘.

```text
영역명-3자리 순번

예:
HEALTH-001
AGENT-001
PLAN-001
HISTORY-001

### Excel 작성 규칙

- 첫 번째 행은 헤더로 사용한다.
- 헤더에는 굵은 글씨와 배경색을 적용한다.
- 각 시트에 자동 필터를 적용한다.
- 첫 번째 행을 고정한다.
- 컬럼 너비를 내용에 맞게 조정한다.
- 긴 설명은 줄바꿈되도록 설정한다.
- Request와 Response JSON 예시는 셀 안에서 읽을 수 있도록 줄바꿈한다.
- 필수 여부는 `Y` 또는 `N`으로 통일한다.
- Nullable 여부는 `Y` 또는 `N`으로 통일한다.
- 확인되지 않은 값은 빈칸으로 두지 말고 `확인 필요`로 작성한다.
- 실제 코드에 없는 내용을 예쁘게 보이기 위해 임의로 추가하지 않는다.