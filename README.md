<<<<<<< HEAD
# 📚 DevPath — 백엔드·임베디드·데브옵스 대학생용 실무 튜토리얼 공유 서비스

> **학번**: 20240884  
> **프로젝트 유형**: 1인 개발 · Agile Scrum 7일 스프린트  
> **개발 기간**: 2026년 6월 (1주 스프린트)

---

## 🧩 프로젝트 소개

DevPath는 백엔드(Backend), 임베디드(Embedded), 데브옵스(DevOps)를 지망하는  
대학생 개발자를 위한 **직무별 실무 튜토리얼 공유 웹 서비스**입니다.

기술 블로그를 읽는 데 그치지 않고, 직접 인터랙티브 학습 트리를 따라가며  
단계별 레슨 콘텐츠를 읽고, 외부 레퍼런스를 확인하며, Q&A 게시판에서  
동료 학습자들과 질문과 답변을 나눌 수 있는 **커뮤니티형 학습 대시보드**를 목표로 합니다.

---

## ✨ 핵심 기능

### 1. 📋 Q&A 게시판 (최대 20개 질문 제한)
- 백엔드 / 임베디드 / 데브옵스 직무별 태그 기반 질문 분류
- 질문 등록 시 자동으로 20개 상한 검사 → 초과 시 등록 차단 UI 표시
- 상단에 **"현재 질문 수: N / 20"** 실시간 카운터 노출
- 답변 작성 및 추천(Upvote) 기능 → 참여 시 XP 보상

### 2. 🌳 튜토리얼 학습 트리 컴포넌트
- `Backend / Embedded / DevOps` 3개 직무 탭 전환형 학습 경로
- 각 직무별 3단계 핵심 레슨 (총 9개 레슨)
- 레슨 노드: ✅ 완료 / 🔵 활성 / 🔒 잠금 세 가지 상태 시각화
- 노드 사이 수직 연결선(Tree Line)으로 직관적인 계층 구조 표현
- 레슨 완료 시 퀴즈 정답 → +100 XP 보상 및 완료 표시

### 3. 🔗 외부 레퍼런스 링크 삽입
- 각 튜토리얼 레슨 카드 하단에 **"📚 추천 레퍼런스"** 섹션 탑재
- 링크 유형별 아이콘 구분 (공식 문서 📄 / 블로그 📝 / GitHub 🔗)
- `target="_blank"` + `rel="noreferrer"` 적용 → 안전한 새 탭 열기

### 4. 🗺️ 직무별 학습 로드맵 (총 18단계)
- **백엔드**: HTTP 기초 → 언어 → 프레임워크 → DB → Redis → AWS 클라우드
- **임베디드**: C/C++ → 컴퓨터 구조 → MCU 주변장치 → 레지스터 → RTOS → 디버깅
- **데브옵스**: Linux → 네트워크 → Docker → CI/CD → Terraform → Kubernetes
- 노드 완료 클릭 시 실시간 XP 증감 및 대시보드 진행률 갱신

### 5. 📊 학습 현황 대시보드
- 로드맵 진행률 (N / 18 노드 완료)
- 튜토리얼 진행률 (N / 9 레슨 완료)
- 총 획득 XP 및 다음 레벨까지 남은 XP 표시
- 최근 활동 내역 타임라인

---

## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| **UI 라이브러리** | React 18 (CSR, Hooks 기반) |
| **빌드 도구** | Vite 6 |
| **스타일링** | Vanilla CSS (디자인 토큰, 글래스모피즘) |
| **상태 관리** | React useState / useEffect |
| **데이터 저장** | localStorage (클라이언트 사이드 퍼시스턴스) |
| **패키지 관리** | npm |
| **버전 관리** | Git (1일 1커밋 Micro Commit 전략) |

---

## 🚀 로컬 실행 방법

### 사전 요구 사항
- Node.js 18 이상 설치
- npm 9 이상 설치

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone <repository-url>
cd tutorial

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
# → http://localhost:5173 에서 확인
```

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

---

## 📅 Agile Scrum 스프린트 이력 (7일)

| Day | 작업 영역 | 핵심 달성 내용 | 커밋 |
|-----|----------|--------------|------|
| Day 1 | 프로젝트 초기 세팅 | Git 초기화, 폴더 구조 정비, CSS 토큰 정의 | `chore: 초기 뼈대 세팅 (#day1)` |
| Day 2 | Q&A 기능 | 20개 제한 로직, 카운터 UI, 직무 태그 필터 | `feat: Q&A 20개 제한 구현 (#day2)` |
| Day 3 | 튜토리얼 트리 UI | 직무 탭, 트리 렌더링, 잠금/활성/완료 상태 | `feat: 튜토리얼 트리 컴포넌트 구현 (#day3)` |
| Day 4 | 외부 링크 기능 | resources 필드, 아이콘 구분, 안전한 링크 렌더링 | `feat: 외부 레퍼런스 링크 삽입 기능 (#day4)` |
| Day 5 | 로드맵 완성 | 3개 직무 18개 노드, XP 연동 | `feat: 로드맵 18노드 및 XP 연동 (#day5)` |
| Day 6 | 대시보드 통계 | 18노드/9레슨 기준 진행률, 직무 배지, 활동 로그 | `feat: 대시보드 통계 및 UX 정비 (#day6)` |
| Day 7 | 최종 검증 & README | 전체 통합 테스트, README 완성, 빌드 확인 | `docs: README 최종 완성 (#day7)` |

---

## 📂 프로젝트 구조

```
tutorial/
├── public/
├── src/
│   ├── App.jsx                          ← 전역 상태 관리 (XP, 완료 내역, Q&A)
│   ├── main.jsx
│   ├── index.css                        ← 디자인 토큰, 글래스모피즘 스타일
│   └── component/
│       ├── common/Layout/
│       │   ├── Layout.jsx               ← 그리드 레이아웃
│       │   ├── Sidebar.jsx              ← 네비게이션 메뉴
│       │   ├── Header.jsx               ← XP 레벨 바, 직무 배지
│       │   └── Footer.jsx
│       ├── dashboard/
│       │   └── Dashboard.jsx            ← 통계 카드 (18노드/9레슨 진행률)
│       ├── roadmap/
│       │   └── Roadmap.jsx              ← 3개 직무 탭 + 각 6단계 트리 노드
│       ├── tutorial/
│       │   └── Tutorial.jsx             ← 직무 탭 + 트리 UI + 외부 링크
│       └── qa/
│           └── QA.jsx                   ← Q&A 피드 (20개 제한, 태그 필터)
├── README.md
├── package.json
└── vite.config.js
```

---

## 📂 주요 컴포넌트 설명

### `App.jsx` — 전역 상태 허브
전체 앱의 루트 컴포넌트. `completedRoadmapNodes`, `completedLessons`, `questions`, `userStats`를 중앙 관리하며 localStorage에 상태를 동기화합니다. XP 증감 함수 `addXp()`, 노드/레슨 토글 함수를 하위 컴포넌트에 prop으로 전달합니다.

### `Tutorial.jsx` — 직무별 트리 + 레슨 + 외부 링크
직무 탭 선택 상태와 각 직무별 레슨 데이터를 관리합니다. 퀴즈 정답 판별 및 최초 완료 시 XP를 지급하며, 레슨 하단 `resources` 배열로 외부 링크를 렌더링합니다.

### `Roadmap.jsx` — 3개 직무 로드맵 트리
직무 탭 선택 시 완전히 다른 노드 목록으로 전환됩니다. 노드 완료/취소 클릭 → `toggleNodeCompletion()` + `addXp()` 를 호출하며 완료/활성/잠금 상태에 따라 아이콘 및 색상이 변화합니다.

### `QA.jsx` — 질문 게시판
20개 초과 시 등록 버튼 비활성화 + 경고 메시지를 표시합니다. 실시간 질문 수 카운터(`N / 20`)와 직무별 태그 기반 필터링(`Backend`, `Embedded`, `DevOps`, `Database`, `C-Language`, `Docker`, `Linux`)을 제공합니다.

---

## 🎯 학습 포인트 (초중급자 가이드)

| React 개념 | 어디서 확인하나요? |
|------------|-----------------|
| `useState` — 상태 변수 선언 | `Tutorial.jsx` 탭 전환 / `QA.jsx` 폼 입력 |
| `useEffect` — 사이드 이펙트 처리 | `App.jsx` localStorage 동기화 |
| Props 전달 — 부모→자식 데이터 흐름 | `App.jsx` → 모든 페이지 컴포넌트 |
| 조건부 렌더링 | 트리 노드 아이콘, Q&A 등록 제한 메시지 |
| 배열 `.map()` — 리스트 렌더링 | 레슨 목록, 로드맵 노드, Q&A 피드 |
| `localStorage` — 브라우저 저장 | `App.jsx` 완료 이력 퍼시스턴스 |
| 이벤트 핸들링 | 버튼 클릭, 폼 제출, 입력 onChange |

---

## 📌 향후 개선 아이디어 (백로그)

- [ ] 백엔드 API 서버 연동 (Express.js / Spring Boot)
- [ ] 실제 데이터베이스 연결 (PostgreSQL / MongoDB)
- [ ] 사용자 로그인 인증 (JWT 기반)
- [ ] 마크다운(Markdown) 기반 튜토리얼 콘텐츠 에디터
- [ ] 다크/라이트 테마 전환 토글
- [ ] 반응형 모바일 레이아웃 개선
- [ ] Q&A 페이지네이션 및 검색 고도화

---

## 💡 Git 커밋 컨벤션

```bash
feat:     새로운 기능 추가
fix:      버그 수정
docs:     문서 작성/수정
style:    코드 스타일 변경 (기능 변화 없음)
refactor: 기능 변경 없이 코드 구조 개선
chore:    빌드 설정, 패키지 변경 등 기타
```

---

*© 2026 DevPath · Student ID 20240884 · 1인 Agile 개발 프로젝트*
=======
# tutorial
>>>>>>> 1c3513fd0da9c100ab663b26b33de32584ce76cc
