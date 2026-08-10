# Login Authentication Design Request

## 1. 작업 목표

현재 UI만 존재하는 로그인 화면에 실제 Backend 인증 기능을 추가하기 위한
로그인 시스템을 설계한다.

이번 단계에서는 설계 문서만 작성한다.

코드와 Database는 수정하지 않는다.

## 2. 분석 대상 프로젝트

### Backend

- `/Users/kimseongjin/Desktop/workspace/private-agent-backend`

### 향후 연동 대상

- Web: `/Users/kimseongjin/Desktop/workspace/ai-agent-lab`
- Android: `/Users/kimseongjin/Desktop/workspace/private-agent`
- iOS: `/Users/kimseongjin/Desktop/workspace/PrivateAgent`

## 3. 참고 문서

- `docs/prompts/platform/backend.md`
- `docs/prompts/platform/web.md`
- `docs/prompts/tasks/design.md`
- `docs/api/backend-api-spec.xlsx`
- `docs/prompts/workflows/login-page.md`

## 4. 현재 상태

- Web, Android, iOS에 로그인 UI가 존재한다.
- 현재 로그인 API는 없다.
- 로그인 버튼 클릭 후 다음 화면으로 바로 이동한다.
- Backend에는 현재 인증 Middleware가 없는 것으로 보인다.
- 기존 API는 인증 없이 호출되는 상태다.
- Database 구조는 실제 Backend 코드를 확인한다.

## 사용자 계정 정책

- 사용자 계정은 Backend Database에 저장한다.
- 로그인 식별자는 `email`을 사용한다.
- 별도의 `username` 또는 `loginId`는 사용하지 않는다.
- 비밀번호는 평문으로 저장하지 않고 Hash로 저장한다.
- 회원가입 기능은 이번 범위에서 제외한다.
- 초기 사용자는 별도의 Seed 또는 관리자용 Script를 통해 생성한다.

## 5. 설계 요구사항

다음을 실제 프로젝트 구조를 분석해서 설계한다.

- 사용자 계정 저장 구조
- 초기 관리자 계정 생성 방식
- 로그인 Request와 Response
- 비밀번호 Hash 저장
- 인증 Token 방식
- Token 만료 정책
- 인증 Middleware
- 보호 대상 API 범위
- 로그아웃 처리
- 인증 실패 처리
- Web Token 저장 및 요청 적용 방식
- 향후 Android/iOS 적용 방식
- 기존 API 및 클라이언트 영향 범위
- input parameter validation 에러 처리 적용
- `email`, `password` 필수값 검사
  - 빈 문자열과 공백 입력 처리
  - 이메일 형식 검증
  - Validation 실패 HTTP Status와 Response 형식

회원가입, 비밀번호 찾기, 소셜 로그인은 이번 범위에서 제외한다.

## 6. 비교할 선택지

다음 항목은 장단점과 추천안을 제시한다.

- Session vs JWT
- Access Token only vs Refresh Token
- localStorage vs sessionStorage vs 메모리 기반 Web Token 저장

최종 추천은 현재 개인 Agent 프로젝트 규모와
향후 모바일 연동을 고려해서 제안한다.

## 7. API 설계 초안

최소한 다음 API 필요 여부를 검토한다.

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

각 API에 대해 다음을 작성한다.

- Method
- Endpoint
- Request
- Response
- HTTP Status
- Error
- 인증 필요 여부

이는 설계 초안이며 아직 Backend에 구현하지 않는다.

## 8. Database 영향

- 사용자 Table 필요 여부
- 필드 구성
- 비밀번호 Hash
- 생성 및 수정 시각
- 활성 상태
- Migration 방식
- 기존 데이터 영향

## 9. 보안 요구사항

- 평문 비밀번호 저장 금지
- 로그에 비밀번호와 Token 출력 금지
- 비밀키 하드코딩 금지
- 일반 문자열 비교로 비밀번호 검증 금지
- 인증 실패 시 민감 정보 노출 금지
- Token 서명 및 만료 검증
- CORS 영향 검토
- Rate Limit 필요 여부 검토

## 10. 산출물

다음 경로에 설계 문서를 생성한다.

- `docs/designs/login-auth.md`

설계 문서에는 다음을 포함한다.

1. 현재 구조
2. 목표 인증 흐름
3. 선택지 비교
4. 권장 설계
5. API 초안
6. Database 설계
7. 파일 변경 예상 목록
8. Backend 인증 흐름
9. Web 인증 흐름
10. 향후 Android/iOS 적용 방식
11. 보안 위험
12. 구현 순서
13. 테스트 계획
14. 예상 난이도
15. 완료 기준
16. 확인 필요 사항

## 11. 작업 제한

- 실제 코드를 수정하지 않는다.
- Database를 생성하거나 변경하지 않는다.
- 패키지를 설치하지 않는다.
- API 명세 XLSX를 수정하지 않는다.
- Web 로그인 동작을 수정하지 않는다.
- Git Commit 또는 Push를 하지 않는다.

## 12. 완료 기준

- 현재 코드 기반 인증 설계가 작성된다.
- 로그인 API 계약 초안이 작성된다.
- 인증 방식의 선택 근거가 작성된다.
- Database 영향이 작성된다.
- Backend, Web, 모바일 영향 범위가 구분된다.
- 보안 요구사항과 위험 요소가 작성된다.
- 코드는 변경되지 않는다.
