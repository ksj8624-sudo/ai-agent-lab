# Login Authentication Design

## 1. 현재 구조

### Backend

- 현재 Backend는 Express 기반으로 구성되어 있으며, 진입점은 [src/index.js](../../private-agent-backend/src/index.js) 이다.
- `express.json()` 으로 JSON body를 수신하고, `/health`, `/api`, `/telegram`, `/github`, `/reviewHistory`, `/dev` 로 라우트를 분리하고 있다.
- 현재 DB는 SQLite 기반이며, 초기 테이블로 `review_histories`, `agent_histories` 가 생성된다.
- 현재 인증 미들웨어가 없고, `/api/*` 요청은 인증 없이 접근 가능하다.
- 실제 등록된 Router는 `/health`, `/api`, `/telegram`, `/github`, `/reviewHistory`, `/dev` 이며, 인증 적용 전에는 이 경로들이 모두 기본적으로 공개 상태다.
- 현재 프로젝트에 인증 관련 라이브러리는 이미 존재한다.
  - `bcryptjs`: 비밀번호 해시 저장
  - `jsonwebtoken`: JWT 발급/검증
  - `better-sqlite3`: 사용자 정보 저장

### Web

- Web은 React + TypeScript + Vite 구조이며, 로그인 화면은 [src/pages/LoginPage/LoginPage.tsx](../../ai-agent-lab/src/pages/LoginPage/LoginPage.tsx) 에 구현되어 있다.
- 현재 로그인 버튼 클릭 시 바로 다음 화면으로 이동한다.
- 기존 API 통신은 [src/api/apiClient.ts](../../ai-agent-lab/src/api/apiClient.ts) 에서 `fetch` 기반으로 처리되고 있다.
- 현재 로그인 UI에는 실제 인증 API 연동이 없다.

---

## 2. 목표 인증 흐름

### 목표

- Web 로그인 화면에서 이메일/비밀번호를 입력받아 Backend 인증을 수행한다.
- Backend는 사용자를 인증하고 JWT 기반 토큰을 발급한다.
- 인증이 필요한 API는 토큰 검증 후 접근 가능해야 한다.
- 회원가입, 비밀번호 찾기, 소셜 로그인은 이번 범위에서 제외한다.

### 목표 흐름

1. Web에서 이메일/비밀번호 입력
2. Backend `POST /api/auth/login` 호출
3. Backend가 사용자 존재 여부 및 비밀번호 일치 여부 확인
4. Access Token과 Refresh Token 발급
5. Web은 토큰을 `sessionStorage`에 저장하고 이후 요청에 포함
6. `POST /api/auth/refresh`로 Access Token 재발급 가능
7. `POST /api/auth/logout`로 Refresh Token 폐기
8. 보호된 API는 Access Token 검증 후 실행

---

## 3. 선택지 비교

### 3.1 Session vs JWT

| 방식    | 장점                                                                 | 단점                                        | 평가                                                                  |
| ------- | -------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| Session | 서버에서 세션 상태 관리 가능, 토큰 탈취 시 서버에서 즉시 무효화 용이 | 세션 저장소 필요, 확장 시 별도 관리 필요    | 현재 프로젝트 규모에서는 가능하지만 추가 세션 저장소/관리 부담이 있음 |
| JWT     | Stateless, Web/Mobile 공통 적용 쉬움, 토큰 기반 인증 구조가 단순     | 토큰 자체 무효화가 어려움, 만료 관리가 중요 | 현재 프로젝트와 향후 모바일 연동을 고려하면 가장 적합                 |

추천: JWT 기반 인증

### 3.2 Access Token only vs Refresh Token

| 방식                         | 장점                                                                  | 단점                                                  | 평가                                      |
| ---------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------- |
| Access Token only            | 구현 단순                                                             | 토큰 만료 시 재로그인 필요, 보안상 장기 유효화 어려움 | 초기 구현에는 단순하지만 UX 측면에서 불리 |
| Access Token + Refresh Token | 짧은 Access Token과 긴 Refresh Token 조합 가능, 보안성과 UX 균형 우수 | 구현 복잡도 증가                                      | 1차 구현 범위로 권장                      |

추천: Access Token + Refresh Token

### 3.3 Web Token 저장 방식

| 방식           | 장점                                                  | 단점                               | 평가                         |
| -------------- | ----------------------------------------------------- | ---------------------------------- | ---------------------------- |
| localStorage   | 구현 쉬움, 새로고침 시 유지                           | XSS 취약, 민감 정보 노출 가능      | 1차 구현에서는 권장하지 않음 |
| sessionStorage | 탭 세션 단위로 유지, localStorage보다 상대적으로 안전 | 탭 종료 시 사라짐                  | 1차 구현 정책으로 권장       |
| 메모리 기반    | 가장 안전, XSS 영향 적음                              | 새로고침 시 사라짐, 상태 복구 불가 | UX 측면에서 불편             |

추천: Web은 `sessionStorage` 사용

---

## 4. 권장 설계

### 4.1 인증 방식

- 인증 방식: JWT 기반
- Access Token 만료: 15분
- Refresh Token 만료: 7일
- 토큰은 `Authorization: Bearer <token>` 헤더로 전달
- Refresh Token은 DB에 해시 형태로 저장하고, logout 시 폐기 또는 무효화
- Refresh Token Rotation 권장: 재발급 시 기존 Refresh Token은 폐기하고 새 Refresh Token을 발급
- Logout 정책은 2안으로 확정한다: Access Token은 선택이며, 유효한 Refresh Token으로 logout 요청을 처리한다.

### 4.2 사용자 계정 정책

- 로그인 식별자는 `email` 사용
- `username`, `loginId`는 사용하지 않음
- 비밀번호는 평문 저장하지 않고 bcrypt 해시 저장
- 회원가입 기능은 이번 범위에서 제외
- 초기 사용자는 별도의 Seed Script로 생성
- 권한(Role) 분리는 이번 범위에서 구현하지 않음

### 4.3 보안 원칙

- 비밀번호는 `bcrypt.compare()`로 검증
- 비밀키는 환경 변수로 관리
- 로그에는 비밀번호, 토큰, 시크릿 값 출력 금지
- 인증 실패 시 민감 정보 노출 금지
- Refresh Token 원문을 로그나 응답에 직접 노출하지 않음

### 4.4 인증 실패 처리

- 잘못된 이메일/비밀번호: `401 Unauthorized`
- 토큰 누락: `401 Unauthorized`
- 토큰 만료: `401 Unauthorized`
- 로그인 과다 시도: `429 Too Many Requests`
- Refresh Token 폐기/만료/불일치: `401 Unauthorized`
- 모든 인증 실패 응답은 공통 형식으로 반환한다.
  - `error`: `invalid_credentials` / `invalid_token` / `token_expired` / `invalid_refresh_token` / `refresh_token_revoked`
  - `message`: 사용자에게 노출 가능한 짧은 안내 문구

---

## 5. API 초안

### 5.1 POST /api/auth/login

- Method: `POST`
- Endpoint: `/api/auth/login`
- Success Response Convention:
  - 성공 응답에는 `ok` 필드를 사용하지 않는다.
  - 대신 `accessToken`, `refreshToken`, `expiresAt`, `user` 형태로 직접 반환한다.
- Request:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Response (성공):
  ```json
  {
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "random-refresh-token",
    "expiresAt": "2026-08-06T10:00:00.000Z",
    "user": {
      "id": 1,
      "email": "user@example.com"
    }
  }
  ```
- HTTP Status:
  - `200 OK`: 로그인 성공
  - `400 Bad Request`: validation 실패
  - `401 Unauthorized`: 인증 실패
  - `429 Too Many Requests`: 과다 시도
- Error:
  ```json
  {
    "error": "invalid_credentials",
    "message": "이메일 또는 비밀번호가 올바르지 않습니다."
  }
  ```
- 인증 필요 여부: 필요 없음

### 5.2 POST /api/auth/refresh

- Method: `POST`
- Endpoint: `/api/auth/refresh`
- Success Response Convention:
  - 성공 응답에는 `ok` 필드를 사용하지 않는다.
  - 대신 새 토큰과 사용자 정보를 직접 반환한다.
- Request:
  ```json
  {
    "refreshToken": "..."
  }
  ```
- Response (성공):
  ```json
  {
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "new-refresh-token",
    "expiresAt": "2026-08-06T10:15:00.000Z",
    "user": {
      "id": 1,
      "email": "user@example.com"
    }
  }
  ```
- HTTP Status:
  - `200 OK`: Access Token 재발급 성공
  - `400 Bad Request`: validation 실패
  - `401 Unauthorized`: Refresh Token 누락, 만료, 폐기, 불일치
- Error:
  ```json
  {
    "error": "invalid_refresh_token",
    "message": "세션이 만료되었거나 유효하지 않습니다."
  }
  ```
- 인증 필요 여부: 필요 없음(Access Token 대신 Refresh Token 사용)
- 만료/폐기된 Refresh Token 처리: `401 Unauthorized`로 응답하고, DB에서 해당 토큰을 즉시 무효화/삭제한다.
- Access Token 재발급 흐름:
  1. Refresh Token 검증
  2. DB에 저장된 해시값과 비교
  3. 만료 여부와 revoked 여부 확인
  4. 새 Access Token 발급
  5. Rotation 정책 적용 시 기존 Refresh Token 폐기 후 새 Refresh Token 발급
- Refresh Token Rotation 적용 여부와 추천안:
  - 권장: 적용
  - 이유: 토큰 탈취 시 재사용 가능성을 낮추고, 세션 회전 효과를 얻음
  - 구현 방식: 재발급 성공 시 기존 Refresh Token은 revoke 처리하고 새 Refresh Token만 반환
  - 동일한 Refresh Token으로 여러 번 재발급 요청이 들어오면, 1회성 사용으로 처리하여 재사용을 차단한다.
  - 이전 Refresh Token이 다시 사용되면 `invalid_refresh_token`으로 처리하고, 재사용된 것으로 간주한다.

### 5.3 POST /api/auth/logout

- Method: `POST`
- Endpoint: `/api/auth/logout`
- Success Response Convention:
  - 성공 응답에는 `ok` 필드를 사용하지 않는다.
  - 대신 `{ "message": "logged_out" }` 형태로 반환한다.
- Header:
  ```text
  Authorization: Bearer <accessToken>
  ```
  Access Token은 선택값으로 처리한다. 만료된 Access Token이어도 Refresh Token이 유효하면 logout을 계속 처리할 수 있다.
- Request Body:
  ```json
  {
    "refreshToken": "..."
  }
  ```
- Response (성공):
  ```json
  {
    "message": "logged_out"
  }
  ```
- HTTP Status:
  - `200 OK`: 로그아웃 성공
  - `400 Bad Request`: Refresh Token 누락 또는 형식 오류
  - `401 Unauthorized`: Refresh Token이 유효하지 않거나, 이미 폐기/만료된 경우
- Error:
  ```json
  {
    "error": "unauthorized",
    "message": "인증이 필요합니다."
  }
  ```
- 인증 필요 여부: 필요
- 처리 방식:
  - Access Token 누락: 허용한다. Refresh Token만으로 logout 처리 가능해야 한다.
  - Access Token 만료: 허용한다. Refresh Token이 유효하면 logout 처리 가능해야 한다.
  - Refresh Token 누락: `400 Bad Request`
  - 이미 폐기된 Refresh Token: `401 Unauthorized`
  - 다른 사용자의 Refresh Token 전달: `401 Unauthorized`
  - 정상 요청 시: Refresh Token을 기준으로 사용자 식별 후 해당 Refresh Token만 DB에서 폐기한다.
- 동작 방식: Access Token 검증은 선택이며, Refresh Token이 유효하면 해당 토큰을 DB에서 폐기하거나 무효화한다.

### 5.4 GET /api/auth/me

- Method: `GET`
- Endpoint: `/api/auth/me`
- Success Response Convention:
  - 성공 응답에는 `ok` 필드를 사용하지 않는다.
  - 대신 `{ "user": ... }` 형태로 직접 반환한다.
- Request: `Authorization: Bearer <accessToken>`
- Response (성공):
  ```json
  {
    "user": {
      "id": 1,
      "email": "user@example.com"
    }
  }
  ```
- HTTP Status:
  - `200 OK`
  - `401 Unauthorized`
- Error:
  ```json
  {
    "error": "unauthorized",
    "message": "인증이 필요합니다."
  }
  ```
- 인증 필요 여부: 필요

### 5.5 Input Validation

#### Login

- `email` 필수
- `password` 필수
- 빈 문자열 및 공백만 입력된 값 차단
- 이메일 형식 검증
- 비밀번호 최소 길이 적용 여부는 1차 구현에서는 기본값 미적용으로 정리하되, 필요 시 추후 강화 가능
- Validation 실패 시 `400 Bad Request`
- 검증 실패 응답은 공통 형식으로 반환한다.
  - `error`: `validation_failed`
  - `message`: `입력값이 올바르지 않습니다.`

#### Refresh

- `refreshToken` 필수
- 빈 문자열 및 공백 입력 차단
- 형식 오류, 만료, 폐기, 미등록 Token은 구분하여 처리
- 외부 응답은 민감한 세부 원인을 과도하게 노출하지 않음
- Refresh Token 검증 실패 시 `401 Unauthorized`를 사용하고, 세부 사유는 `error` 코드로 구분한다.

오류 Response 형식은 기존 Backend의 `error`와 `message` 규칙과 충돌하지 않도록 유지한다.

---

## 6. Database 설계

### 6.1 사용자 테이블

기존 SQLite DB에 아래 테이블을 추가한다.

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 6.2 Refresh Token 테이블

```sql
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  revoked_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 6.3 추가 설계 포인트

- `updated_at`은 비밀번호 변경, 계정 활성화 변경, 로그인 성공 시 갱신한다.
- SQLite에서는 `updated_at`이 자동으로 갱신되는 컬럼이 아니므로, Repository 또는 Service 레벨에서 `UPDATE ... SET updated_at = CURRENT_TIMESTAMP` 형태로 명시적으로 갱신해야 한다.
- 사용자 삭제 시 Refresh Token도 함께 삭제하거나 무효화한다.
- 만료된 Refresh Token은 정기 정리 대상이 되며, 구현 시 삭제 또는 `revoked_at` 기록 방식으로 관리한다.
- 동일 사용자 다중 로그인 허용 여부는 1차 구현에서는 허용으로 정리하고, 필요 시 세션당 1개로 제한할 수 있다.
- 사용자별 활성 Refresh Token 개수 정책은 1차 구현에서는 제한 없이 관리하되, 향후 개수 제한을 검토한다.
- SQLite의 Foreign Key 지원 여부는 초기화 시 활성화 상태를 확인한다.
- 초기화 코드에서 `PRAGMA foreign_keys = ON;`을 적용한다.
- `refresh_tokens` 테이블에는 `user_id`, `token_hash`, `expires_at`, `revoked_at`에 대한 인덱스를 추가한다.
- `users.email`은 조회 빈도가 높으므로 인덱스를 권장한다.

### 6.4 초기 관리자 계정 생성

- 회원가입은 제외하므로 초기 관리자 계정은 Seed Script로 생성한다.
- 예시: `scripts/seed-admin-user.js`
- 입력값은 환경 변수로 받는다.
  - `INITIAL_ADMIN_EMAIL`
  - `INITIAL_ADMIN_PASSWORD`
- 생성 시 비밀번호는 bcrypt 해시로 저장한다.

### 6.5 Migration 방식

- 현재 프로젝트는 DB 초기화 코드가 `src/db/sqlite.js` 에서 실행되고 있으므로,
  새 테이블도 해당 초기화 로직에 `CREATE TABLE IF NOT EXISTS` 형태로 추가한다.
- 별도 런타임 마이그레이션 도구는 사용하지 않는다.

### 6.6 기존 데이터 영향

- 기존 `review_histories`, `agent_histories` 테이블은 유지한다.
- 기존 데이터에 인증 관련 데이터는 추가되지 않는다.
- 기존 API 동작에 영향이 없도록 기존 테이블 구조는 변경하지 않는다.

---

## 7. 파일 변경 예상 목록

### Backend

- `src/index.js`
  - 인증 라우터 등록
  - CORS 허용 origin 설정 반영
- `src/routes/auth.js` (신규)
  - `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`, `/api/auth/me` 라우팅
- `src/controllers/authController.js` (신규)
  - Request 해석 및 HTTP 응답 처리
- `src/services/authService.js` (신규)
  - 로그인, 토큰 발급, Refresh 재발급, 검증, 로그아웃 로직
- `src/repositories/userRepository.js` (신규)
  - 사용자 조회/저장/토큰 저장 처리
- `src/db/sqlite.js`
  - `users`, `refresh_tokens` 테이블 추가
- `src/config/env.js`
  - `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN` 환경변수 추가
- `scripts/seed-admin-user.js` (신규)
  - 초기 관리자 계정 생성

### Web

- `src/pages/LoginPage/LoginPage.tsx`
  - `email`, `password` 기반 입력 상태 관리
  - 로그인 API 호출 및 실패 메시지 표시
- `src/api/apiClient.ts`
  - 인증용 API helper 추가
  - `sessionStorage` 기반 토큰 저장/조회/삭제 로직 추가
- `src/router/AppRouter.tsx` (가능 시)
  - 인증되지 않은 사용자의 보호 페이지 접근 차단

---

## 8. Backend 인증 흐름

### 로그인 흐름

1. `POST /api/auth/login` 진입
2. `email`, `password` 입력값 검증
3. `users` 테이블에서 이메일 조회
4. 계정 존재 여부 확인
5. bcrypt로 비밀번호 비교
6. 로그인 성공 시 Access Token, Refresh Token 발급
7. Refresh Token은 해시 후 DB 저장
8. 응답에 토큰과 사용자 정보 반환

### Refresh 흐름

1. `POST /api/auth/refresh` 진입
2. `refreshToken` 입력값 검증
3. DB에 저장된 해시값과 비교
4. 만료/폐기 여부 확인
5. 유효하면 새 Access Token 발급
6. Rotation 정책 적용 시 기존 Refresh Token은 폐기하고 새 Refresh Token 발급

### 인증 미들웨어 흐름

1. 요청 헤더에서 `Authorization` 값 추출
2. Bearer 형식인지 확인
3. JWT 서명/만료 여부 검증
4. 사용자 정보 조회
5. 유효하면 `req.user`에 주입
6. 실패 시 `401` 응답

### 보호 대상 API 범위

현재 Backend의 실제 등록된 Router 기준으로 분류하면 다음과 같다.

- 공개 API:
  - `/health`
  - `/api/ping`
  - `/api/auth/login`
- 인증 필요 API:
  - `/api/auth/refresh` (Refresh Token 사용)
  - `/api/auth/logout` (Refresh Token 사용, Access Token은 선택)
  - `/api/auth/me`
  - `/api/ask`
  - `/api/plan`
  - `/api/review`
  - `/reviewHistory`
- 내부 또는 정책 확인 필요 API:
  - `/telegram/help`
  - `/github/webhook`
  - `/dev/agent/history`
  - `/dev/agent`

이 분류는 실제 등록된 Method와 Endpoint를 기준으로 하며,
`backend-api-spec.xlsx`와 다를 경우 현재 코드 기준으로 설계한다.

---

## 9. Web 인증 흐름

### 로그인 화면

- Web UI는 로그인 입력 필드를 `email`, `password`로 사용한다.
- 별도의 `userId → email` 변환 로직은 추가하지 않는다.
- Label은 `이메일`, `비밀번호`로 표현한다.

### 토큰 저장 방식

- 1차 구현 정책으로 Web은 `sessionStorage`에 Access Token과 Refresh Token을 함께 저장한다.
- 새로고침 시에도 로그인 상태를 유지하도록 `sessionStorage` 기반으로 처리한다.
- 토큰 저장 시 비밀번호나 민감 정보는 저장하지 않는다.
- 보안 한계:
  - JavaScript에서 접근 가능
  - XSS 발생 시 토큰 노출 가능
  - 운영 배포 전 `HttpOnly`, `Secure`, `SameSite` Cookie 전환 검토 필요

### 요청 적용 방식

- 인증이 필요한 API 호출 시 `Authorization: Bearer <accessToken>` 헤더를 추가한다.
- `401` 응답 시 Access Token 만료로 간주하고 `POST /api/auth/refresh`로 재발급을 시도한다.

---

## 10. 향후 Android/iOS 적용 방식

- Android/iOS는 같은 Backend API 계약을 사용한다.
- Access Token은 메모리 또는 안전한 저장소에 보관한다.
- Refresh Token은 Android의 `EncryptedSharedPreferences`, iOS의 Keychain에 저장하는 방식이 적합하다.
- Web과 동일한 JSON Request/Response Schema를 사용하므로 클라이언트별 차이는 최소화된다.
- 향후 모바일에서는 토큰 자동 재발급 플로우를 추가할 수 있다.

---

## 11. 보안 위험

### 11.1 주요 위험 요소

- 비밀번호 평문 저장
- JWT secret 하드코딩
- 토큰 노출 및 탈취
- XSS로 인한 토큰 유출
- 로그인 남용/브루트포스 공격
- Refresh Token 재사용

### 11.2 대응 방안

- 비밀번호는 bcrypt로 해시 저장
- JWT secret은 환경 변수로 관리
- Access Token은 짧은 수명 사용
- Refresh Token은 해시 저장 및 revoke 가능하도록 설계
- Refresh Token Rotation 적용 권장
- 로그에 토큰/비밀번호 출력 금지
- 로그인 API에 간단한 rate limit 적용 권장
- CORS는 허용 origin을 명시적으로 제한

---

## 12. 구현 순서

1. 최종 인증 설계 확정
2. `backend-api-spec.xlsx`에 Auth API 계약 추가
3. Database Table 및 초기화 방식 구현
4. User Repository 구현
5. Token Service 및 Auth Service 구현
6. Login API 구현
7. Refresh API 구현
8. Auth Middleware 구현
9. Logout 및 Me API 구현
10. 실제 Route 기준 인증 보호 적용
11. Seed Script 구현
12. Backend API 테스트
13. Web 로그인 연동
14. Android 연동
15. iOS 연동
16. 기능 리뷰

---

## 13. 테스트 계획

### Backend

- 정상 로그인 시 토큰 발급 확인
- 잘못된 비밀번호 시 `401` 응답 확인
- 빈 문자열/공백 입력 시 `400` 응답 확인
- 잘못된 이메일 형식 시 `400` 응답 확인
- Refresh Token 재발급 시 새 토큰 발급 및 이전 토큰 무효화 확인
- 만료된 Refresh Token 검증 확인
- 로그아웃 후 Refresh Token 재사용 차단 확인
- Access Token 없이 보호 API 호출 시 `401` 응답 확인

### Web

- 로그인 성공 시 토큰 저장 확인
- 로그인 실패 시 에러 메시지 표시 확인
- 인증이 필요한 페이지 진입 시 토큰이 없으면 로그인 화면으로 이동 확인
- 새로고침 후 인증 상태가 유지되는지 확인

---

## 14. 예상 난이도

- Backend: 중간
  - 인증 라우트, 미들웨어, 토큰 저장/검증, Refresh 흐름까지 포함되어 구현 범위는 중간 수준
- Web: 중간
  - 기존 로그인 UI에 실제 API 연동과 토큰 저장 로직이 필요
- Database: 낮음~중간
  - SQLite에 테이블 추가와 초기화만으로 충분

---

## 15. 완료 기준

다음 조건이 충족되면 설계 단계 완료로 간주한다.

- 1차 구현 API 4개가 명확히 정의되었다.
- Refresh Token 재발급 흐름이 정리되었다.
- Logout 인증 계약이 정리되었다.
- Role 제거가 반영되었다.
- `email`, `password` 필드가 Web/API 기준으로 일관되게 정리되었다.
- 실제 Route 기반 보호 범위가 정리되었다.
- Web Token 저장의 1차 정책과 보안 한계가 구분되었다.
- Database Table 최종안이 정리되었다.
- Input Validation과 구현 순서가 정리되었다.

---

## 16. 확인 필요 사항

다음 항목은 구현 전 확인이 필요하다.

- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` 값 관리 방식
- Access Token/Refresh Token 만료 기간
- Web의 실제 로그인 필드명과 API 요청 형식
- 보호 대상 API의 우선순위
- CORS 허용 origin 목록
- 초기 관리자 계정 생성 방법과 비밀번호 관리 방식
- Refresh Token Rotation 적용 여부
