import { useState } from 'react'

const allLessons = {
    backend: [
      {
        id: 'backend-rest',
        title: 'REST API와 HTTP 메서드',
        difficulty: '초급',
        duration: '12분',
        desc: 'REST 아키텍처 원칙과 GET·POST·PUT·DELETE 메서드 설계 방식을 실습합니다.',
        content: (
          <>
            <p className="lesson-text">
              REST(Representational State Transfer)는 HTTP를 기반으로 자원(Resource)을 URI로 표현하고, 
              HTTP 메서드(GET, POST, PUT, DELETE)로 행위를 정의하는 아키텍처 스타일입니다.
            </p>
            <p className="lesson-text" style={{ fontWeight: 600 }}>4가지 핵심 HTTP 메서드:</p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
              <li><strong>GET</strong>: 리소스 조회 — 서버 상태를 변경하지 않는 안전한 읽기 전용 요청</li>
              <li><strong>POST</strong>: 리소스 생성 — 요청 본문(Body)에 데이터를 담아 서버에 새 자원을 등록</li>
              <li><strong>PUT</strong>: 리소스 전체 교체 — 지정된 URI의 자원을 완전히 새 내용으로 대체</li>
              <li><strong>DELETE</strong>: 리소스 삭제 — 지정된 URI의 자원을 서버에서 제거</li>
            </ul>
            <div className="lesson-code-block">
{`// REST API 설계 예시
GET    /api/users          → 전체 사용자 목록 조회
POST   /api/users          → 신규 사용자 등록
PUT    /api/users/:id      → 특정 사용자 정보 전체 수정
DELETE /api/users/:id      → 특정 사용자 삭제`}
            </div>
          </>
        ),
        codePreset: `// REST API 라우터 가상 시뮬레이션
const routes = [
  { method: 'GET',    path: '/api/users',     handler: () => '사용자 목록 반환' },
  { method: 'POST',   path: '/api/users',     handler: () => '새 사용자 생성 완료' },
  { method: 'DELETE', path: '/api/users/42',  handler: () => 'ID 42 사용자 삭제 완료' },
];

function mockRequest(method, path) {
  const route = routes.find(r => r.method === method && path.startsWith(r.path.split(':')[0]));
  if (route) console.log(\`[\${method}] \${path} → \${route.handler()}\`);
  else console.log(\`404 Not Found: [\${method}] \${path}\`);
}

mockRequest('GET',    '/api/users');
mockRequest('POST',   '/api/users');
mockRequest('DELETE', '/api/users/42');
mockRequest('PATCH',  '/api/users/1');`,
        resources: [
          { name: 'MDN Web Docs — HTTP 메서드 레퍼런스', url: 'https://developer.mozilla.org/ko/docs/Web/HTTP/Methods', type: 'docs' },
          { name: 'REST API 설계 가이드 (restfulapi.net)', url: 'https://restfulapi.net/', type: 'blog' },
        ],
        quiz: {
          question: 'REST API에서 기존 서버 자원을 완전히 새 데이터로 교체할 때 사용하는 HTTP 메서드는?',
          options: [
            'GET — 리소스 조회에 사용하며 서버 상태를 변경하지 않는다.',
            'POST — 새로운 자원을 생성할 때 사용하는 메서드이다.',
            'PUT — 지정된 URI의 자원을 전달된 내용으로 완전히 대체한다.',
            'DELETE — 서버에서 특정 자원을 삭제할 때 사용한다.'
          ],
          correctIndex: 2,
          hint: '전체 교체(Replace)와 부분 수정(PATCH)을 구분해 보세요!'
        }
      },
      {
        id: 'backend-db',
        title: '데이터베이스와 SQL 기초',
        difficulty: '초급',
        duration: '15분',
        desc: 'RDB 설계 원리와 SELECT, JOIN, WHERE 등 실무 SQL 문법을 학습합니다.',
        content: (
          <>
            <p className="lesson-text">
              관계형 데이터베이스(RDB)는 데이터를 테이블(Table) 형태로 저장하고, SQL(Structured Query Language)로 
              데이터를 조회·조작합니다. 백엔드 개발자에게 SQL은 필수 역량입니다.
            </p>
            <p className="lesson-text" style={{ fontWeight: 600 }}>핵심 SQL 구문 4종:</p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
              <li><strong>SELECT</strong>: 원하는 컬럼 데이터를 테이블에서 조회</li>
              <li><strong>WHERE</strong>: 조건식으로 조회 결과를 필터링</li>
              <li><strong>JOIN</strong>: 두 개 이상의 테이블을 관계 키로 병합</li>
              <li><strong>GROUP BY</strong>: 동일 값끼리 묶어 집계 함수(SUM, COUNT) 적용</li>
            </ul>
            <div className="lesson-code-block">
{`SELECT u.name, COUNT(o.id) AS order_count
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.active = true
GROUP BY u.name
ORDER BY order_count DESC;`}
            </div>
          </>
        ),
        codePreset: `// 가상 인메모리 DB 쿼리 시뮬레이션
const users = [
  { id: 1, name: '김철수', active: true },
  { id: 2, name: '이영희', active: false },
  { id: 3, name: '박민준', active: true },
];
const orders = [
  { id: 1, userId: 1 }, { id: 2, userId: 1 }, { id: 3, userId: 3 }
];

// SELECT name, COUNT(orders) WHERE active=true GROUP BY name
const result = users
  .filter(u => u.active)
  .map(u => ({
    name: u.name,
    orderCount: orders.filter(o => o.userId === u.id).length
  }))
  .sort((a, b) => b.orderCount - a.orderCount);

console.log('쿼리 결과:');
result.forEach(r => console.log(\`  \${r.name}: \${r.orderCount}건\`));`,
        resources: [
          { name: 'PostgreSQL 공식 문서 (한국어)', url: 'https://www.postgresql.org/docs/', type: 'docs' },
          { name: 'SQL 시각화 튜토리얼 — SQLBolt', url: 'https://sqlbolt.com/', type: 'blog' },
        ],
        quiz: {
          question: 'SQL에서 두 개의 테이블을 공통 키 컬럼을 기준으로 연결하여 조회하는 구문은?',
          options: [
            'GROUP BY — 동일한 값의 행을 묶어 집계 함수를 적용한다.',
            'WHERE — 조건에 맞는 행만 필터링하여 결과를 반환한다.',
            'ORDER BY — 조회 결과를 특정 컬럼 기준으로 오름/내림차순 정렬한다.',
            'JOIN — 두 테이블의 관련 행을 관계 키로 병합하여 조회한다.'
          ],
          correctIndex: 3,
          hint: '두 테이블을 "연결"하는 SQL 구문을 생각해 보세요!'
        }
      },
      {
        id: 'backend-auth',
        title: 'JWT 토큰 인증 기법',
        difficulty: '중급',
        duration: '18분',
        desc: 'JWT(JSON Web Token)의 구조와 서명 검증 원리, 실무 인증 흐름을 배웁니다.',
        content: (
          <>
            <p className="lesson-text">
              JWT(JSON Web Token)는 서버-클라이언트 간 인증 정보를 JSON 형태로 안전하게 전달하기 위한 
              표준(RFC 7519)입니다. 세션 방식과 달리 서버가 별도의 상태를 저장하지 않는 **Stateless** 방식입니다.
            </p>
            <p className="lesson-text" style={{ fontWeight: 600 }}>JWT의 3가지 구성 요소:</p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
              <li><strong>Header</strong>: 토큰 유형(typ)과 서명 알고리즘(alg) — Base64URL 인코딩</li>
              <li><strong>Payload</strong>: 사용자 식별 정보(Claim) — 만료 시간(exp), userId 등</li>
              <li><strong>Signature</strong>: Header+Payload를 서버 비밀키로 HMAC 서명한 값</li>
            </ul>
            <div className="lesson-code-block">
{`// JWT 구조: header.payload.signature
eyJhbGciOiJIUzI1NiJ9   ← Header
.eyJ1c2VySWQiOjEyM30  ← Payload (userId: 123)
.SflKxwRJSMeKKF2QT4fw  ← Signature`}
            </div>
          </>
        ),
        codePreset: `// JWT 페이로드 디코딩 시뮬레이션
function base64Decode(str) {
  try { return JSON.parse(atob(str)); }
  catch { return null; }
}

const mockJwt = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyMywidXNlcm5hbWUiOiLqtIDsnqUiLCJleHAiOjE3OTk5OTk5OTl9.sig';
const [header, payload, sig] = mockJwt.split('.');

console.log('[JWT 파싱 결과]');
console.log('Header:', JSON.stringify(base64Decode(header)));
console.log('Payload:', JSON.stringify(base64Decode(payload)));
console.log('Signature 부분:', sig.substring(0, 10) + '...');
console.log('서명 검증은 서버의 SECRET KEY로 수행!');`,
        resources: [
          { name: 'JWT 공식 소개 — jwt.io', url: 'https://jwt.io/introduction', type: 'docs' },
          { name: 'Spring Security JWT 인증 구현 가이드', url: 'https://spring.io/guides', type: 'blog' },
        ],
        quiz: {
          question: 'JWT(JSON Web Token)의 Payload에 저장되는 정보에 대한 설명으로 올바른 것은?',
          options: [
            'Payload는 HTTPS 없이도 완전히 암호화되어 외부에서 내용을 볼 수 없다.',
            'Payload는 Base64URL로 인코딩되어 있어 누구나 디코딩해 내용을 볼 수 있다.',
            'Payload는 서버의 비밀키(Secret Key) 없이는 절대 디코딩이 불가능하다.',
            'Payload에는 반드시 사용자 비밀번호(password)가 포함되어야 한다.'
          ],
          correctIndex: 1,
          hint: 'Base64는 암호화가 아닌 인코딩입니다! 민감 정보를 Payload에 담으면 안 됩니다.'
        }
      }
    ],
    embedded: [
      {
        id: 'embed-c',
        title: 'C 언어 포인터와 메모리 구조',
        difficulty: '초급',
        duration: '15분',
        desc: '포인터의 개념, 주소 연산자(&)와 역참조 연산자(*)의 활용법을 이해합니다.',
        content: (
          <>
            <p className="lesson-text">
              C 언어의 **포인터(Pointer)**는 변수의 메모리 주소를 저장하는 특수 변수입니다. 
              임베디드 개발에서 포인터는 레지스터 직접 접근, 동적 메모리 관리, 하드웨어 인터페이스에 핵심적으로 활용됩니다.
            </p>
            <p className="lesson-text" style={{ fontWeight: 600 }}>2가지 핵심 포인터 연산자:</p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
              <li><strong>&(주소 연산자)</strong>: 변수가 저장된 메모리 주소를 반환합니다.</li>
              <li><strong>*(역참조 연산자)</strong>: 포인터가 가리키는 메모리 주소의 값을 읽거나 씁니다.</li>
            </ul>
            <div className="lesson-code-block">
{`int value = 42;
int *ptr = &value;   // ptr에 value의 주소 저장
printf("%d", *ptr);  // ptr이 가리키는 값 = 42
*ptr = 100;          // 역참조로 value를 100으로 변경`}
            </div>
          </>
        ),
        codePreset: `// 포인터 메모리 구조 자바스크립트 시뮬레이션
// (실제 C에서는 메모리 주소가 16진수로 표현됩니다)
const memory = new Map();

function allocate(varName, value) {
  const addr = '0x' + (Math.floor(Math.random() * 0xFFFF)).toString(16).padStart(4, '0');
  memory.set(addr, { name: varName, value });
  return addr;
}

const valueAddr = allocate('value', 42);
const ptrAddr   = allocate('ptr', valueAddr); // 포인터는 주소를 값으로 가짐

console.log('[메모리 레이아웃]');
memory.forEach((v, addr) => console.log(\`  \${addr}: \${v.name} = \${v.value}\`));

console.log('\\n[포인터 역참조 (*ptr)]');
const pointedAddr = memory.get(ptrAddr).value;
console.log('ptr이 가리키는 주소:', pointedAddr);
console.log('*ptr 의 값:', memory.get(pointedAddr).value);`,
        resources: [
          { name: 'C 포인터 완벽 가이드 — cppreference.com', url: 'https://en.cppreference.com/w/c/language/pointer', type: 'docs' },
          { name: 'ARM Cortex-M 임베디드 C 프로그래밍', url: 'https://developer.arm.com/documentation', type: 'docs' },
        ],
        quiz: {
          question: 'C 언어에서 포인터 변수 ptr이 가리키는 메모리 주소의 값을 읽는 올바른 코드는?',
          options: [
            '&ptr — ptr 변수 자체의 메모리 주소를 반환한다.',
            '*ptr — ptr이 가리키는 메모리 주소에 저장된 값을 읽는다.',
            'ptr++ — 포인터를 다음 주소로 이동시킨다.',
            'sizeof(ptr) — 포인터 변수의 바이트 크기를 반환한다.'
          ],
          correctIndex: 1,
          hint: '역참조(Dereference) 연산자가 무엇인지 떠올려 보세요!'
        }
      },
      {
        id: 'embed-gpio',
        title: 'GPIO 레지스터 비트마스킹',
        difficulty: '중급',
        duration: '18분',
        desc: 'GPIO 레지스터를 비트 연산(AND·OR·XOR·NOT)으로 정밀 제어하는 방법을 배웁니다.',
        content: (
          <>
            <p className="lesson-text">
              마이크로컨트롤러(MCU)에서 LED, 버튼, 센서는 GPIO(General Purpose Input/Output) 핀으로 연결됩니다. 
              GPIO 제어는 레지스터의 특정 비트를 설정/해제하는 **비트마스킹** 기법을 사용합니다.
            </p>
            <p className="lesson-text" style={{ fontWeight: 600 }}>3가지 핵심 비트 마스킹 패턴:</p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
              <li><strong>비트 세트(Set)</strong>: <code>reg |= (1 &lt;&lt; n)</code> — n번 비트를 1로 설정</li>
              <li><strong>비트 클리어(Clear)</strong>: <code>reg &amp;= ~(1 &lt;&lt; n)</code> — n번 비트를 0으로 해제</li>
              <li><strong>비트 토글(Toggle)</strong>: <code>reg ^= (1 &lt;&lt; n)</code> — n번 비트를 반전</li>
            </ul>
            <div className="lesson-code-block">
{`uint8_t GPIO_ODR = 0b00000000; // 초기 레지스터 값
GPIO_ODR |=  (1 << 3);         // 3번 핀(LED) ON  → 0b00001000
GPIO_ODR &= ~(1 << 3);         // 3번 핀(LED) OFF → 0b00000000
GPIO_ODR ^=  (1 << 3);         // 3번 핀(LED) 토글`}
            </div>
          </>
        ),
        codePreset: `// GPIO 레지스터 비트마스킹 시뮬레이션
let GPIO_ODR = 0b00000000; // 8-bit GPIO Output Data Register

function printReg(label) {
  const bin = GPIO_ODR.toString(2).padStart(8, '0');
  console.log(\`\${label}: 0b\${bin} (0x\${GPIO_ODR.toString(16).toUpperCase()})\`);
}

printReg('초기 상태');

// 3번 핀 LED ON (|= 비트 세트)
GPIO_ODR |= (1 << 3);
printReg('PIN3 LED ON ');

// 3번 핀 LED OFF (&= ~ 비트 클리어)
GPIO_ODR &= ~(1 << 3);
printReg('PIN3 LED OFF');

// 5번 핀 토글 (^= XOR)
GPIO_ODR ^= (1 << 5);
printReg('PIN5 토글  ');

GPIO_ODR ^= (1 << 5);
printReg('PIN5 재토글 ');`,
        resources: [
          { name: 'STM32 GPIO 레지스터 공식 레퍼런스', url: 'https://www.st.com/resource/en/reference_manual/rm0390-stm32f405415-stm32f407417-stm32f427437-and-stm32f429439-advanced-armbased-32bit-mcus-stmicroelectronics.pdf', type: 'docs' },
          { name: '비트 연산 완벽 정리 블로그', url: 'https://en.wikipedia.org/wiki/Bitwise_operation', type: 'blog' },
        ],
        quiz: {
          question: 'GPIO 레지스터의 2번 비트(PIN2)를 0으로 클리어(해제)하는 올바른 C 비트마스킹 코드는?',
          options: [
            'reg |= (1 << 2)  — OR 연산으로 2번 비트를 1로 세트한다.',
            'reg ^= (1 << 2)  — XOR 연산으로 2번 비트를 현재 값과 반전시킨다.',
            'reg &= ~(1 << 2) — AND NOT 연산으로 2번 비트만 선택적으로 0으로 클리어한다.',
            'reg >> 2         — 레지스터 전체를 오른쪽으로 2비트 쉬프트한다.'
          ],
          correctIndex: 2,
          hint: '특정 비트를 0으로 만들려면 해당 비트만 0이고 나머지는 1인 마스크와 AND 연산하세요!'
        }
      },
      {
        id: 'embed-interrupt',
        title: '인터럽트(Interrupt)와 폴링',
        difficulty: '중급',
        duration: '20분',
        desc: '폴링(Polling)과 인터럽트(ISR) 방식의 차이점과 임베디드 실무 적용 기준을 이해합니다.',
        content: (
          <>
            <p className="lesson-text">
              외부 이벤트(버튼 입력, 타이머, UART 수신)를 처리하는 방식에는 **폴링(Polling)**과 
              **인터럽트(Interrupt)** 두 가지가 있습니다. 선택 기준은 실시간성과 CPU 효율입니다.
            </p>
            <p className="lesson-text" style={{ fontWeight: 600 }}>폴링 vs 인터럽트 비교:</p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
              <li><strong>폴링(Polling)</strong>: CPU가 주기적으로 상태를 직접 확인 → 구현 단순, CPU 낭비</li>
              <li><strong>인터럽트(ISR)</strong>: 이벤트 발생 시 하드웨어가 CPU를 즉시 호출 → 실시간성 우수, 복잡도 증가</li>
            </ul>
            <div className="lesson-code-block">
{`// 인터럽트 서비스 루틴 (ISR) 예시
void EXTI0_IRQHandler(void) {
    if (EXTI->PR & (1 << 0)) {  // 인터럽트 발생 확인
        LED_Toggle();            // 이벤트 처리
        EXTI->PR |= (1 << 0);   // 인터럽트 플래그 클리어
    }
}`}
            </div>
          </>
        ),
        codePreset: `// 폴링 vs 인터럽트 이벤트 시뮬레이션
let buttonPressed = false;
let cpuCycles = 0;

// 폴링 방식: 매 사이클마다 상태 확인
console.log('[폴링 방식 시뮬레이션]');
for (let i = 0; i < 10; i++) {
  cpuCycles++;
  if (i === 6) buttonPressed = true; // 6번째 사이클에 버튼 이벤트 발생
  if (buttonPressed) {
    console.log(\`사이클 \${i}: 버튼 감지! (폴링으로 \${cpuCycles}번 확인 후 발견)\`);
    break;
  }
  console.log(\`사이클 \${i}: 폴링 중... (이벤트 없음)\`);
}

console.log('');
console.log('[인터럽트 방식 시뮬레이션]');
console.log('CPU: 메인 작업 실행 중...');
console.log('CPU: 메인 작업 실행 중...');
// 이벤트 발생 시 즉시 ISR 호출
function ISR_Button() { console.log('▶ ISR 호출! 버튼 이벤트 즉시 처리 완료'); }
ISR_Button();
console.log('CPU: 인터럽트 처리 후 메인 작업 복귀');`,
        resources: [
          { name: 'FreeRTOS 인터럽트 관리 공식 가이드', url: 'https://www.freertos.org/RTOS-Cortex-M3-M4.html', type: 'docs' },
          { name: 'ARM 인터럽트 처리 아키텍처 문서', url: 'https://developer.arm.com/documentation/100166/0001/Programmers-Model/Exceptions', type: 'docs' },
        ],
        quiz: {
          question: '임베디드 시스템에서 인터럽트(ISR) 방식이 폴링(Polling) 방식보다 유리한 경우는?',
          options: [
            '이벤트 발생 빈도가 매우 높고 CPU가 항상 이벤트를 우선 처리해야 할 때',
            '코드 구현을 최대한 단순하게 유지하고 CPU 점유율은 무관할 때',
            '실시간 응답성이 중요하고 이벤트 발생이 불규칙적·드문드문 일어날 때',
            '단일 이벤트 소스만 처리하면 되고 다중 인터럽트 우선순위 관리가 불필요할 때'
          ],
          correctIndex: 2,
          hint: '인터럽트는 이벤트가 발생할 때만 CPU를 "방해"합니다. 평소에 CPU를 자유롭게 놔둡니다!'
        }
      }
    ],
    devops: [
      {
        id: 'devops-docker',
        title: 'Docker와 컨테이너 환경 구축',
        difficulty: '초급',
        duration: '15분',
        desc: 'Docker 이미지·컨테이너 개념과 Dockerfile 작성 방법, 기본 CLI 명령어를 배웁니다.',
        content: (
          <>
            <p className="lesson-text">
              Docker는 애플리케이션을 **컨테이너(Container)**라는 격리된 실행 환경으로 패키징하는 플랫폼입니다. 
              "내 PC에서는 되는데 서버에서는 안 돼요" 문제를 근본적으로 해결합니다.
            </p>
            <p className="lesson-text" style={{ fontWeight: 600 }}>핵심 Docker 개념 3가지:</p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
              <li><strong>이미지(Image)</strong>: 컨테이너의 실행 청사진 — Dockerfile로 빌드됨 (읽기 전용)</li>
              <li><strong>컨테이너(Container)</strong>: 이미지를 실행한 실제 인스턴스 (격리된 프로세스)</li>
              <li><strong>레지스트리(Registry)</strong>: 이미지를 저장·공유하는 저장소 (Docker Hub)</li>
            </ul>
            <div className="lesson-code-block">
{`# Dockerfile 예시 (Node.js 앱)
FROM node:18-alpine        # 베이스 이미지
WORKDIR /app               # 작업 디렉토리 설정
COPY package*.json ./      # 의존성 파일 복사
RUN npm ci                 # 패키지 설치
COPY . .                   # 소스 코드 복사
EXPOSE 3000                # 포트 노출
CMD ["node", "server.js"]  # 컨테이너 시작 명령`}
            </div>
          </>
        ),
        codePreset: `// Docker CLI 명령어 가상 인터프리터
const dockerImages = [
  { name: 'node', tag: '18-alpine', size: '50MB' },
  { name: 'nginx', tag: 'latest', size: '23MB' },
];
const dockerContainers = [];

function docker(cmd, ...args) {
  if (cmd === 'images') {
    console.log('REPOSITORY  TAG         SIZE');
    dockerImages.forEach(i => console.log(\`\${i.name.padEnd(12)}\${i.tag.padEnd(12)}\${i.size}\`));
  } else if (cmd === 'run') {
    const [img] = args;
    const id = Math.random().toString(36).substr(2, 8);
    dockerContainers.push({ id, image: img, status: 'running' });
    console.log(\`컨테이너 시작됨: \${id} (이미지: \${img})\`);
  } else if (cmd === 'ps') {
    console.log('CONTAINER ID  IMAGE   STATUS');
    dockerContainers.forEach(c => console.log(\`\${c.id}  \${c.image.padEnd(8)}\${c.status}\`));
  }
}

docker('images');
docker('run', 'node:18-alpine');
docker('run', 'nginx:latest');
docker('ps');`,
        resources: [
          { name: 'Docker 공식 Get Started 가이드', url: 'https://docs.docker.com/get-started/', type: 'docs' },
          { name: 'Dockerfile 베스트 프랙티스', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', type: 'docs' },
        ],
        quiz: {
          question: 'Docker에서 "이미지(Image)"와 "컨테이너(Container)"의 관계를 올바르게 설명한 것은?',
          options: [
            '컨테이너는 이미지를 만들기 위한 설계 도면(청사진)이다.',
            '이미지는 컨테이너를 실행한 라이브 인스턴스이며 상태가 계속 변한다.',
            '이미지는 읽기 전용 실행 청사진이며, 컨테이너는 이미지를 실행한 인스턴스이다.',
            '이미지와 컨테이너는 동일한 개념이며 혼용해서 사용할 수 있다.'
          ],
          correctIndex: 2,
          hint: '객체지향의 클래스(Class)와 인스턴스(Instance) 관계와 유사합니다!'
        }
      },
      {
        id: 'devops-cicd',
        title: 'CI/CD 파이프라인 (GitHub Actions)',
        difficulty: '중급',
        duration: '18분',
        desc: 'GitHub Actions 워크플로우 YAML 작성법과 자동 빌드·테스트·배포 파이프라인 설계를 배웁니다.',
        content: (
          <>
            <p className="lesson-text">
              CI/CD(지속적 통합/지속적 배포)는 코드 변경 시 **자동으로** 빌드, 테스트, 배포를 수행하는 개발 자동화 방식입니다. 
              GitHub Actions는 `.github/workflows/*.yml` 파일에 파이프라인을 선언형으로 정의합니다.
            </p>
            <p className="lesson-text" style={{ fontWeight: 600 }}>GitHub Actions 핵심 구성 요소:</p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
              <li><strong>on</strong>: 워크플로우 트리거 이벤트 (push, pull_request 등)</li>
              <li><strong>jobs</strong>: 파이프라인의 독립 실행 단위 (여러 job 병렬 실행 가능)</li>
              <li><strong>steps</strong>: 각 job 내의 순차 실행 명령어 목록</li>
            </ul>
            <div className="lesson-code-block">
{`# .github/workflows/ci.yml
name: CI Pipeline
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npm test`}
            </div>
          </>
        ),
        codePreset: `// GitHub Actions 워크플로우 가상 실행기
const workflow = {
  name: 'CI Pipeline',
  trigger: 'push to main',
  jobs: [
    {
      name: 'build-and-test',
      steps: [
        { name: 'Checkout 코드',      cmd: 'git checkout',    duration: 1 },
        { name: 'Node.js 18 설치',    cmd: 'setup-node@v4',   duration: 2 },
        { name: '의존성 설치',         cmd: 'npm ci',           duration: 3 },
        { name: '단위 테스트 실행',    cmd: 'npm test',         duration: 2 },
        { name: '빌드 번들 생성',      cmd: 'npm run build',    duration: 2 },
      ]
    }
  ]
};

console.log(\`🚀 워크플로우 시작: \${workflow.name}\`);
console.log(\`📦 트리거: \${workflow.trigger}\\n\`);

workflow.jobs[0].steps.forEach((step, i) => {
  console.log(\`  [\${i+1}/\${workflow.jobs[0].steps.length}] \${step.name}... ✅ 완료\`);
});

console.log('\\n🎉 CI 파이프라인 성공! 총 5단계 완료');`,
        resources: [
          { name: 'GitHub Actions 공식 문서', url: 'https://docs.github.com/en/actions', type: 'docs' },
          { name: 'GitHub Actions YAML 문법 레퍼런스', url: 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions', type: 'docs' },
        ],
        quiz: {
          question: 'GitHub Actions 워크플로우에서 `on: [push]` 설정의 의미는?',
          options: [
            '워크플로우가 수동으로 실행 버튼을 클릭했을 때만 실행된다.',
            '저장소에 코드가 push될 때 자동으로 워크플로우가 트리거된다.',
            '모든 Pull Request가 닫힐 때마다 자동으로 배포 파이프라인이 실행된다.',
            'cron 스케줄에 따라 정해진 시간에 주기적으로 워크플로우가 실행된다.'
          ],
          correctIndex: 1,
          hint: '`on` 키워드는 어떤 이벤트가 발생했을 때 워크플로우를 트리거할지 정의합니다!'
        }
      },
      {
        id: 'devops-k8s',
        title: 'Kubernetes 오케스트레이션',
        difficulty: '고급',
        duration: '22분',
        desc: 'K8s의 핵심 오브젝트(Pod, Service, Deployment)와 컨테이너 스케일링 원리를 이해합니다.',
        content: (
          <>
            <p className="lesson-text">
              Kubernetes(K8s)는 컨테이너화된 애플리케이션의 배포·확장·관리를 자동화하는 오픈소스 오케스트레이션 플랫폼입니다. 
              실무 클라우드 인프라의 표준으로 자리잡았습니다.
            </p>
            <p className="lesson-text" style={{ fontWeight: 600 }}>K8s 핵심 오브젝트 3가지:</p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
              <li><strong>Pod</strong>: K8s의 최소 배포 단위 — 1개 이상의 컨테이너 묶음</li>
              <li><strong>Service</strong>: Pod 집합에 안정적인 네트워크 엔드포인트를 부여하는 추상화 레이어</li>
              <li><strong>Deployment</strong>: 원하는 Pod 복제본 수(Replica)를 선언하고 자동 복구를 관리</li>
            </ul>
            <div className="lesson-code-block">
{`# Deployment 예시 — 3개 레플리카 유지
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 3        # 항상 3개 Pod 유지
  selector:
    matchLabels: { app: my-api }
  template:
    spec:
      containers:
        - name: api
          image: my-api:v1.2`}
            </div>
          </>
        ),
        codePreset: `// Kubernetes 레플리카 스케일링 시뮬레이터
class K8sDeployment {
  constructor(name, replicas) {
    this.name = name;
    this.desired = replicas;
    this.pods = Array.from({ length: replicas }, (_, i) => ({
      name: \`\${name}-pod-\${i+1}\`, status: 'Running'
    }));
  }
  scale(n) {
    const diff = n - this.desired;
    if (diff > 0) {
      for (let i = 0; i < diff; i++)
        this.pods.push({ name: \`\${this.name}-pod-\${this.pods.length+1}\`, status: 'Pending→Running' });
    } else {
      this.pods.splice(n);
    }
    this.desired = n;
    console.log(\`⚡ 스케일 변경: \${this.name} → \${n}개 레플리카\`);
    this.status();
  }
  status() {
    console.log(\`📊 \${this.name} Pods:\`);
    this.pods.forEach(p => console.log(\`   - \${p.name}: \${p.status}\`));
  }
}

const dep = new K8sDeployment('my-api', 2);
console.log('[초기 상태]'); dep.status();
console.log(''); dep.scale(4);
console.log(''); dep.scale(1);`,
        resources: [
          { name: 'Kubernetes 공식 문서', url: 'https://kubernetes.io/docs/home/', type: 'docs' },
          { name: 'kubectl 명령어 치트시트', url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/', type: 'docs' },
        ],
        quiz: {
          question: 'Kubernetes의 Deployment에서 `replicas: 3` 설정의 효과로 올바른 것은?',
          options: [
            'Pod 1개가 내부에 3개의 컨테이너 이미지를 동시에 실행한다.',
            'K8s가 항상 3개의 동일한 Pod 복제본을 유지하며, 1개가 죽으면 자동으로 새 Pod를 생성한다.',
            '애플리케이션 코드가 3번 복사되어 각기 다른 버전으로 배포된다.',
            'CPU를 3개 코어로 제한하는 리소스 쿼터 설정이다.'
          ],
          correctIndex: 1,
          hint: 'Deployment의 역할은 "원하는 상태(Desired State)"를 항상 유지하는 것입니다!'
        }
      }
    ]
  }

function Tutorial({ completedLessons, toggleLessonCompletion, addXp }) {
  const [activeTrack, setActiveTrack] = useState('backend')
  const [activeLessonId, setActiveLessonId] = useState('backend-rest')
  const [sandboxCode, setSandboxCode] = useState(allLessons.backend[0].codePreset)
  const [consoleOutput, setConsoleOutput] = useState('코드 실행 준비 완료. [Run Code] 버튼을 누르세요.')
  const [consoleError, setConsoleError] = useState(false)
  const [quizAnswerSelected, setQuizAnswerSelected] = useState(null)
  const [quizStatus, setQuizStatus] = useState(null)

  const currentLessons = allLessons[activeTrack]
  const activeLesson = currentLessons.find(l => l.id === activeLessonId) || currentLessons[0]
  const isLessonCompleted = completedLessons[activeLesson.id]

  const handleTrackChange = (track) => {
    setActiveTrack(track)
    const firstLesson = allLessons[track][0]
    setActiveLessonId(firstLesson.id)
    setSandboxCode(firstLesson.codePreset)
    setConsoleOutput('코드 실행 준비 완료. [Run Code] 버튼을 누르세요.')
    setConsoleError(false)
    setQuizAnswerSelected(null)
    setQuizStatus(null)
  }

  const handleLessonChange = (lessonId) => {
    setActiveLessonId(lessonId)
    const nextLesson = currentLessons.find(l => l.id === lessonId)
    if (nextLesson) {
      setSandboxCode(nextLesson.codePreset)
      setConsoleOutput('코드 실행 준비 완료. [Run Code] 버튼을 누르세요.')
      setConsoleError(false)
      setQuizAnswerSelected(null)
      setQuizStatus(null)
    }
  }

  const handleRunCode = () => {
    setConsoleOutput('실행 중...')
    setConsoleError(false)
    setTimeout(() => {
      try {
        if (sandboxCode.includes('console.log')) {
          const logs = []
          const mockConsole = {
            log: (...args) => {
              logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
            }
          }
          const script = new Function('console', sandboxCode)
          script(mockConsole)
          if (logs.length > 0) {
            setConsoleOutput(logs.join('\n'))
          } else {
            setConsoleOutput('코드가 성공적으로 실행되었으나, 출력된 console.log가 없습니다.')
          }
        } else {
          const res = eval(sandboxCode)
          setConsoleOutput(`[반환 값]: ${res}`)
        }
      } catch (err) {
        setConsoleError(true)
        setConsoleOutput(`[실행 에러]: ${err.message}`)
      }
    }, 400)
  }

  const handleQuizAnswer = (optionIdx) => {
    if (quizAnswerSelected !== null) return
    setQuizAnswerSelected(optionIdx)
    if (optionIdx === activeLesson.quiz.correctIndex) {
      setQuizStatus('correct')
      if (!isLessonCompleted) {
        toggleLessonCompletion(activeLesson.id)
        addXp(100)
      }
    } else {
      setQuizStatus('incorrect')
    }
  }

  const handleResetQuiz = () => {
    setQuizAnswerSelected(null)
    setQuizStatus(null)
  }

  const trackLabels = {
    backend: { label: 'Backend', color: '#6366f1' },
    embedded: { label: 'Embedded', color: '#f59e0b' },
    devops: { label: 'DevOps', color: '#06b6d4' },
  }

  const resourceIcons = {
    docs: '📄',
    blog: '📝',
    github: '🔗',
  }

  return (
    <div>
      <h2 className="page-title">인터랙티브 튜토리얼</h2>
      <p className="page-subtitle">백엔드·임베디드·데브옵스 직무별 핵심 개념을 읽고, 코드를 실행하며 학습하세요.</p>

      {/* Track Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {Object.entries(trackLabels).map(([track, { label, color }]) => (
          <button
            key={track}
            onClick={() => handleTrackChange(track)}
            className={`btn ${activeTrack === track ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              flex: 1,
              padding: '0.6rem 0',
              fontWeight: 700,
              fontSize: '0.875rem',
              ...(activeTrack === track ? { background: `linear-gradient(135deg, ${color}, ${color}cc)` } : {})
            }}
          >
            {label} 트랙
          </button>
        ))}
      </div>

      <div className="tutorial-container animate-fade-in">
        {/* Left Side: Chapter Navigation Index */}
        <div className="glass-panel tutorial-list-panel">
          <span className="tutorial-list-title">강의 목록</span>
          <div className="tutorial-chapters">
            {currentLessons.map((les) => {
              const completed = completedLessons[les.id]
              return (
                <button
                  key={les.id}
                  className={`tutorial-item-btn ${activeLessonId === les.id ? 'active' : ''}`}
                  onClick={() => handleLessonChange(les.id)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {completed && (
                      <svg fill="currentColor" viewBox="0 0 20 20" className="lesson-check-icon">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
                      </svg>
                    )}
                    {les.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{les.duration}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Side Contents */}
        <div className="tutorial-content-grid">
          <div className="tutorial-viewports">

            {/* Lesson Reader */}
            <div className="glass-panel lesson-reader-pane">
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-indigo">소요 시간: {activeLesson.duration}</span>
                <span className="badge badge-emerald">난이도: {activeLesson.difficulty}</span>
              </div>

              <h2>{activeLesson.title}</h2>
              {activeLesson.content}

              {/* External Reference Links */}
              <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(99,102,241,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.625rem' }}>📚 추천 레퍼런스</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {activeLesson.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8125rem',
                        color: 'var(--color-primary-light)',
                        textDecoration: 'none',
                        padding: '0.375rem 0.625rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255,255,255,0.02)',
                        transition: 'background 0.18s',
                      }}
                    >
                      <span>{resourceIcons[res.type] || '🔗'}</span>
                      <span>{res.name}</span>
                      <span style={{ marginLeft: 'auto', fontSize: '0.7rem', opacity: 0.5 }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quiz */}
              <div className="lesson-quiz-box">
                <div className="quiz-question">💡 오늘의 퀴즈: {activeLesson.quiz.question}</div>
                <div className="quiz-options-list">
                  {activeLesson.quiz.options.map((opt, index) => {
                    const isSelected = quizAnswerSelected === index
                    const isCorrect = index === activeLesson.quiz.correctIndex
                    let btnClass = ''
                    if (isSelected) {
                      btnClass = isCorrect ? 'correct' : 'incorrect'
                    } else if (quizAnswerSelected !== null && isCorrect) {
                      btnClass = 'correct'
                    }
                    return (
                      <button
                        key={index}
                        className={`quiz-option-btn ${btnClass}`}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={quizAnswerSelected !== null}
                      >
                        {index + 1}. {opt}
                      </button>
                    )
                  })}
                </div>

                {quizStatus === 'correct' && (
                  <div className="quiz-feedback success animate-fade-in">
                    🎉 정답입니다! (+100 XP 획득) 챕터 클리어 표시가 활성화되었습니다.
                  </div>
                )}

                {quizStatus === 'incorrect' && (
                  <div className="quiz-feedback error animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>❌ 오답입니다. 힌트: {activeLesson.quiz.hint}</span>
                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={handleResetQuiz}>
                      다시 시도하기
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sandbox */}
            <div className="glass-panel sandbox-pane">
              <div className="sandbox-editor-header">
                <span>💻 Live Sandbox Mock (JavaScript Console)</span>
                <button className="btn btn-primary" style={{ padding: '0.375rem 0.75rem' }} onClick={handleRunCode}>
                  Run Code
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width="12" height="12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </button>
              </div>

              <div className="sandbox-editor-area">
                <textarea
                  className="sandbox-textarea"
                  value={sandboxCode}
                  onChange={(e) => setSandboxCode(e.target.value)}
                  placeholder="여기에 자바스크립트 코드를 자유롭게 수정하고 동작해 보세요."
                  spellCheck="false"
                />
              </div>

              <div className="sandbox-console">
                <div className="console-header">Console Output</div>
                <div className={`console-output ${consoleError ? 'error' : ''}`} style={{ whiteSpace: 'pre-wrap' }}>
                  {consoleOutput}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
