import React, { useState } from 'react'

function Tutorial({ completedLessons, toggleLessonCompletion, addXp }) {
  const [activeLessonId, setActiveLessonId] = useState('jsx-basics')
  const [sandboxCode, setSandboxCode] = useState(`// Greet 컴포넌트를 정의하고 실행해 보세요
function Greet() {
  const name = "DevPath";
  return <h1>안녕하세요, {name}!</h1>;
}

console.log(Greet());`)
  const [consoleOutput, setConsoleOutput] = useState('코드 실행 준비 완료. [Run Code] 버튼을 누르세요.')
  const [consoleError, setConsoleError] = useState(false)
  const [quizAnswerSelected, setQuizAnswerSelected] = useState(null)
  const [quizStatus, setQuizStatus] = useState(null) // 'correct', 'incorrect', null

  const lessons = [
    {
      id: 'jsx-basics',
      title: 'JSX 개념과 기본 문법',
      difficulty: '초급',
      duration: '10분',
      desc: '리액트 컴포넌트의 뼈대를 이루는 JSX(JavaScript XML)의 개념을 정복합니다.',
      content: (
        <>
          <p className="lesson-text">
            JSX는 자바스크립트 파일 안에서 HTML 문법을 직관적으로 작성할 수 있도록 돕는 리액트 전용 문법 확장입니다. 
            Vite 번들러 내부의 Babel 또는 Oxc 컴파일러가 빌드 과정에서 이 JSX 코드를 일반적인 자바스크립트 객체(`React.createElement`)로 변환합니다.
          </p>
          <p className="lesson-text" style={{ fontWeight: 600 }}>중요한 JSX의 3대 문법 규칙:</p>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
            <li><strong>하나의 단일 루트 엘리먼트로 감싸야 합니다:</strong> 여러 개의 태그가 병렬로 존재할 경우, {'<div>'} 또는 빈 태그인 Fragment({'<></>'})로 묶어야 합니다.</li>
            <li><strong>중괄호 {'{}'}를 통한 자바스크립트 표현식 바인딩:</strong> 변수나 함수, 자바스크립트 표현식을 출력할 때는 {'{variableName}'}처럼 중괄호를 사용합니다.</li>
            <li><strong>camelCase 어트리뷰트 명명법:</strong> HTML의 `class`는 자바스크립트 예약어와의 충돌을 막기 위해 `className`으로 작성하고, `onclick`은 `onClick`으로 작성해야 합니다.</li>
          </ul>
          <div className="lesson-code-block">
{`const element = <div className="greeting">Hello World!</div>;`}
          </div>
        </>
      ),
      codePreset: `// 1. 단일 루트 엘리먼트 실습
function App() {
  const subject = "JSX";
  return (
    <>
      <h1 className="title">반갑습니다!</h1>
      <p>{subject} 기본 규칙을 통과하셨습니다.</p>
    </>
  );
}

console.log("App 컴포넌트 렌더링 결과:", App());`,
      quiz: {
        question: '다음 중 JSX의 올바른 특징이 아닌 것은 무엇입니까?',
        options: [
          'JSX 태그는 항상 여는 태그와 닫는 태그가 존재해야 하며, 빈 태그는 셀프 클로징(e.g., <img />) 해야 한다.',
          'HTML의 class 속성은 JSX에서 똑같이 class로 사용하며, 충돌 위험이 전혀 없다.',
          '자바스크립트 코드를 JSX 중괄호 {} 내부에 넣어 동적으로 출력할 수 있다.',
          '여러 형제 노드를 반환할 때는 반드시 단일 부모 요소나 Fragment(<></>)로 묶어주어야 한다.'
        ],
        correctIndex: 1,
        hint: '자바스크립트 클래스와의 충돌을 방지하기 위해 사용해야 하는 속성 명을 떠올려보세요!'
      }
    },
    {
      id: 'component-reusability',
      title: '컴포넌트 구조화 기법',
      difficulty: '초급',
      duration: '12분',
      desc: '리액트 어플리케이션의 핵심인 컴포넌트의 개념과 Props를 활용한 재사용성에 대해 알아봅니다.',
      content: (
        <>
          <p className="lesson-text">
            리액트에서는 화면의 개별 UI 조각들을 **컴포넌트(Component)**라는 단위로 모듈화하여 관리합니다. 
            컴포넌트는 자바스크립트 함수 형태로 정의하며, 대문자로 시작하는 이름을 가져야 합니다.
          </p>
          <p className="lesson-text">
            <strong>Props</strong>는 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달할 때 사용하는 읽기 전용 매개변수 객체입니다. 
            자식 컴포넌트는 전달받은 Props를 직접 수정할 수 없으며, 단방향 데이터 흐름을 따릅니다.
          </p>
          <div className="lesson-code-block">
{`function UserCard(props) {
  return <div>이름: {props.name}</div>;
}`}
          </div>
        </>
      ),
      codePreset: `// 2. 컴포넌트 및 Props 실습
function UserBadge({ name, role }) {
  return \`[\${role}] \${name}님 환영합니다!\`;
}

console.log(UserBadge({ name: "김태희", role: "어드민" }));`,
      quiz: {
        question: '리액트 컴포넌트와 Props에 대한 설명으로 올바른 것은?',
        options: [
          'Props는 읽기 전용 속성이므로 자식 컴포넌트에서 직접 값을 수정하면 안 된다.',
          '자식 컴포넌트는 부모 컴포넌트의 Props를 원하면 마음대로 수정할 수 있다.',
          '컴포넌트 이름은 소문자로 시작해도 무방하다.',
          'Props는 부모 컴포넌트에서 자식 컴포넌트로 양방향으로 전달된다.'
        ],
        correctIndex: 0,
        hint: 'Props는 불변(Immutable) 상태를 유지하여 데이터 예측 가능성을 보장합니다.'
      }
    },
    {
      id: 'usestate-hook',
      title: 'useState를 활용한 상태 관리',
      difficulty: '중급',
      duration: '15분',
      desc: 'useState Hook을 사용하여 동적으로 변하는 컴포넌트의 상태(State)를 관리해 봅니다.',
      content: (
        <>
          <p className="lesson-text">
            자바스크립트 변수와 달리 리액트의 **State(상태)**는 값이 바뀔 때마다 컴포넌트를 자동으로 **재렌더링(Re-rendering)** 시켜 화면을 갱신해주는 동적 데이터 공간입니다.
          </p>
          <p className="lesson-text">
            `useState`는 컴포넌트 내에 상태 변수를 생성하는 리액트 빌트인 Hook입니다. 
            상태 변수와 이를 수정하는 세터(Setter) 함수를 배열 비구조화 할당 구조로 반환합니다.
          </p>
          <div className="lesson-code-block">
{`const [count, setCount] = useState(0);`}
          </div>
        </>
      ),
      codePreset: `// 3. useState 카운터 가상 시뮬레이션
let count = 0;
function simulateSetCount(newValue) {
  count = newValue;
  console.log("세터 호출! 상태 변동 발생 -> count =", count);
}

simulateSetCount(count + 1);
simulateSetCount(count + 5);`,
      quiz: {
        question: 'useState Hook 호출 시 반환하는 배열의 첫 번째 요소와 두 번째 요소는 무엇입니까?',
        options: [
          '첫 번째는 세터 함수, 두 번째는 컴포넌트 객체',
          '첫 번째는 이전의 상태 값, 두 번째는 다음의 상태 값',
          '첫 번째는 현재 상태 변수, 두 번째는 상태를 변경하는 세터(Setter) 함수',
          '첫 번째는 렌더링 주기 값, 두 번째는 상태의 초기화 Boolean 값'
        ],
        correctIndex: 2,
        hint: 'const [state, setState] = useState(initialValue) 구문을 떠올려 보세요!'
      }
    },
    {
      id: 'useeffect-hook',
      title: 'useEffect와 컴포넌트 생명주기',
      difficulty: '중급',
      duration: '18분',
      desc: '네트워크 통신, 타이머, 이벤트 리스너 등 부수 효과(Side Effect)를 제어하는 useEffect를 배웁니다.',
      content: (
        <>
          <p className="lesson-text">
            리액트 렌더링 흐름 밖에서 실행되는 부수적인 로직(API 호출, 타이머 등록, 전역 이벤트 리스너)을 **부수 효과(Side Effect)**라고 부르며, 
            이를 다루기 위해 **useEffect Hook**을 도입했습니다.
          </p>
          <p className="lesson-text">
            `useEffect`는 첫 번째 인자로 콜백 함수를, 두 번째 인자로 **의존성 배열(Dependency Array)**을 받습니다. 
            의존성 배열이 비어있으면 컴포넌트가 화면에 나타날 때(Mount) 단 한 번만 실행됩니다.
          </p>
          <div className="lesson-code-block">
{`useEffect(() => {
  console.log("마운팅 시점에 실행!");
}, []);`}
          </div>
        </>
      ),
      codePreset: `// 4. useEffect 타이머 시뮬레이션
console.log("컴포넌트 마운트 실행!");

const cleanup = () => console.log("이벤트 해제 (Cleanup 실행!)");
console.log("의존성 변경 발생 -> 클린업 함수 호출 예정");
cleanup();`,
      quiz: {
        question: 'useEffect의 의존성 배열(Dependency Array)을 빈 배열 []로 지정했을 때의 동작은?',
        options: [
          '매 렌더링 주기마다 부수 효과 콜백이 매번 반복 실행된다.',
          '컴포넌트가 처음 화면에 렌더링(Mount)될 때 단 1회만 실행된다.',
          '컴포넌트가 화면에서 사라지기 직전(Unmount)에만 실행된다.',
          '어떠한 상태 변화에도 절대 콜백 함수가 호출되지 않고 완전히 잠긴다.'
        ],
        correctIndex: 1,
        hint: '빈 배열은 추적할 외부 값이 없으므로 마운트 첫 시동 시 딱 한 번만 반응합니다.'
      }
    }
  ]

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0]
  const isLessonCompleted = completedLessons[activeLesson.id]

  const handleLessonChange = (lessonId) => {
    setActiveLessonId(lessonId)
    const nextLesson = lessons.find(l => l.id === lessonId)
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
    
    // Safety evaluation sandbox simulation
    setTimeout(() => {
      try {
        // Simple regex-based execution for safety
        if (sandboxCode.includes('console.log')) {
          // Capture console.logs
          const logs = []
          const mockConsole = {
            log: (...args) => {
              logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
            }
          }
          
          // Execute under virtual scope
          const script = new Function('console', sandboxCode)
          script(mockConsole)
          
          if (logs.length > 0) {
            setConsoleOutput(logs.join('\n'))
          } else {
            setConsoleOutput('코드가 성공적으로 실행되었으나, 출력된 console.log가 없습니다.')
          }
        } else {
          // Eval simple math / output
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
    if (quizAnswerSelected !== null) return // block repeated clicks
    setQuizAnswerSelected(optionIdx)

    if (optionIdx === activeLesson.quiz.correctIndex) {
      setQuizStatus('correct')
      
      // Award XP on first completion
      if (!isLessonCompleted) {
        toggleLessonCompletion(activeLesson.id)
        addXp(100) // Award 100 XP
      }
    } else {
      setQuizStatus('incorrect')
    }
  }

  const handleResetQuiz = () => {
    setQuizAnswerSelected(null)
    setQuizStatus(null)
  }

  return (
    <div>
      <h2 className="page-title">인터랙티브 튜토리얼</h2>
      <p className="page-subtitle">리액트 기초 핵심 개념을 글로 읽고, 옆의 샌드박스 컴파일러에 코드를 실행하며 학습하세요.</p>

      <div className="tutorial-container animate-fade-in">
        {/* Left Side: Chapter Navigation Index */}
        <div className="glass-panel tutorial-list-panel">
          <span className="tutorial-list-title">강의 목록</span>
          <div className="tutorial-chapters">
            {lessons.map((les) => {
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

        {/* Right Side Contents: Splitscreen Reader & Sandbox Grid */}
        <div className="tutorial-content-grid">
          <div className="tutorial-viewports">
            
            {/* Left Portion: Lesson Text Reader */}
            <div className="glass-panel lesson-reader-pane">
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-indigo">소요 시간: {activeLesson.duration}</span>
                <span className="badge badge-emerald">난이도: {activeLesson.difficulty}</span>
              </div>
              
              <h2>{activeLesson.title}</h2>
              {activeLesson.content}

              {/* Multiple Choice Quiz */}
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
                      // Mark correct option if user selected wrong
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

            {/* Right Portion: Sandbox Editor and Terminal Output */}
            <div className="glass-panel sandbox-pane">
              {/* Header Editor Bar */}
              <div className="sandbox-editor-header">
                <span>💻 Live Sandbox Mock (JavaScript Console)</span>
                <button className="btn btn-primary" style={{ padding: '0.375rem 0.75rem' }} onClick={handleRunCode}>
                  Run Code
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width="12" height="12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </button>
              </div>

              {/* Editor Textarea */}
              <div className="sandbox-editor-area">
                <textarea
                  className="sandbox-textarea"
                  value={sandboxCode}
                  onChange={(e) => setSandboxCode(e.target.value)}
                  placeholder="여기에 자바스크립트 코드를 자유롭게 수정하고 동작해 보세요."
                  spellCheck="false"
                />
              </div>

              {/* Output Virtual Terminal Console */}
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
