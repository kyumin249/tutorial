import React, { useState } from 'react'

function Roadmap({ completedRoadmapNodes, toggleNodeCompletion, addXp }) {
  const [selectedNodeId, setSelectedNodeId] = useState('react-advanced')

  const roadmapNodes = [
    {
      id: 'html-css',
      title: 'HTML & CSS 웹 기초',
      subtitle: '웹 표준과 레이아웃 스타일링',
      desc: '시맨틱 마크업, Flexbox와 Grid 레이아웃, CSS 변수 및 반응형 웹 디자인의 기본을 학습합니다.',
      difficulty: '초급',
      xp: 150,
      resources: [
        { name: 'MDN Web Docs - HTML 배우기', url: 'https://developer.mozilla.org/ko/docs/Learn/HTML' },
        { name: 'CSS Flexbox 완벽 가이드', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }
      ]
    },
    {
      id: 'js-basics',
      title: 'JavaScript 핵심 개념',
      subtitle: '동적 웹 제작과 자바스크립트 엔진',
      desc: 'DOM 조작, 비동기 프로그래밍 (Promise, async/await), 화살표 함수 및 ES6+ 신규 스펙 문법을 다룹니다.',
      difficulty: '초급',
      xp: 200,
      resources: [
        { name: 'Modern JS Tutorial (한국어 번역본)', url: 'https://ko.javascript.info/' },
        { name: '자바스크립트 비동기 이해하기', url: 'https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous' }
      ]
    },
    {
      id: 'react-advanced',
      title: '리액트 기초와 JSX 구조',
      subtitle: '선언형 프로그래밍과 컴포넌트의 비밀',
      desc: 'JSX 문법의 원리, 가상 DOM(Virtual DOM)의 핵심 아키텍처, 컴포넌트 설계 방식 및 단방향 데이터 흐름을 배웁니다.',
      difficulty: '중급',
      xp: 250,
      resources: [
        { name: 'React 공식 문서 (신버전)', url: 'https://react.dev' },
        { name: 'Vite 기반의 리액트 설정 요령', url: 'https://vite.dev/guide/' }
      ]
    },
    {
      id: 'react-state',
      title: '리액트 상태 관리 & Hooks',
      subtitle: 'useState, useEffect의 작동 원리',
      desc: '컴포넌트 생명주기와 동적 렌더링을 제어하기 위한 핵심 Hooks (useState, useEffect, useRef) 및 커스텀 훅 설계 기법을 정복합니다.',
      difficulty: '중급',
      xp: 300,
      resources: [
        { name: 'React Hooks 레퍼런스', url: 'https://react.dev/reference/react' },
        { name: 'useEffect 생명주기 완벽 정리', url: 'https://react.dev/reference/react/useEffect' }
      ]
    },
    {
      id: 'vite-tooling',
      title: 'Vite 툴체인 및 성능 최적화',
      subtitle: '프론트엔드 빌드 도구와 모듈 번들러',
      desc: 'Vite의 ESM 기반 HMR 작동 원리, 플러그인 확장, 환경 변수(`.env`) 응용 및 프로덕션 빌드 번들 사이즈 다이어트 기법을 심도 있게 탐구합니다.',
      difficulty: '중급',
      xp: 300,
      resources: [
        { name: 'Vite 공식 환경 설정 가이드', url: 'https://vite.dev/config/' },
        { name: '웹팩에서 Vite로 마이그레이션', url: 'https://vite.dev/guide/comparisons.html' }
      ]
    },
    {
      id: 'nextjs',
      title: 'Next.js 15 & SSR 아키텍처',
      subtitle: '서버 사이드 렌더링 및 App Router',
      desc: 'App Router 기반 파일 시스템 라우팅, 서버 컴포넌트와 클라이언트 컴포넌트의 조화, SEO 최적화 및 풀스택 하이브리드 어플리케이션을 완성합니다.',
      difficulty: '고급',
      xp: 450,
      resources: [
        { name: 'Next.js App Router 공식 문서', url: 'https://nextjs.org/docs' },
        { name: '서버 사이드 렌더링 깊게 알아보기', url: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components' }
      ]
    }
  ]

  const selectedNode = roadmapNodes.find(node => node.id === selectedNodeId) || roadmapNodes[2]
  const isCompleted = completedRoadmapNodes[selectedNode.id]

  const handleCompleteClick = () => {
    // Toggle completion state
    toggleNodeCompletion(selectedNode.id)
    
    // Award XP on first completion
    if (!isCompleted) {
      addXp(selectedNode.xp)
    } else {
      addXp(-selectedNode.xp) // Subtract if they uncheck it
    }
  }

  return (
    <div>
      <h2 className="page-title">학습 로드맵</h2>
      <p className="page-subtitle">체계적으로 구성된 프론트엔드 커리큘럼을 클릭하며 학습 완료 상태를 체크해 보세요.</p>

      <div className="roadmap-layout animate-fade-in">
        {/* Left Side: Roadmap Tree Node List */}
        <div className="glass-panel roadmap-tree">
          <div className="roadmap-section-title">Frontend Developer Track</div>

          {roadmapNodes.map((node, index) => {
            const completed = completedRoadmapNodes[node.id]
            const active = !completed && (index === 0 || completedRoadmapNodes[roadmapNodes[index - 1].id])
            const statusClass = completed ? 'completed' : active ? 'active' : 'locked'
            const selectedClass = selectedNodeId === node.id ? 'selected' : ''

            return (
              <div 
                key={node.id} 
                className={`roadmap-node-container ${statusClass} ${selectedClass}`}
                onClick={() => setSelectedNodeId(node.id)}
              >
                <div className="roadmap-node-button">
                  {completed ? (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : active ? (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  ) : (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  )}
                </div>
                
                <div className="roadmap-node-info">
                  <span className="node-title">{node.title}</span>
                  <div className="node-subtitle">{node.subtitle}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Side: Node Detailed Panel */}
        <div className="glass-panel roadmap-details-pane">
          <div className="details-header">
            <span className={`badge ${
              selectedNode.difficulty === '초급' ? 'badge-emerald' : 
              selectedNode.difficulty === '중급' ? 'badge-indigo' : 'badge-magenta'
            }`}>
              난이도: {selectedNode.difficulty}
            </span>
            <span className="badge badge-amber" style={{ marginLeft: '0.5rem' }}>
              +{selectedNode.xp} XP
            </span>
            <h3 className="details-title">{selectedNode.title}</h3>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)' }}>{selectedNode.subtitle}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <p className="details-desc">{selectedNode.desc}</p>

            <div className="details-section-title">학습 추천 레퍼런스</div>
            <ul className="resource-list">
              {selectedNode.resources.map((res, i) => (
                <li key={i}>
                  <a href={res.url} target="_blank" rel="noreferrer" className="resource-item">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="16" height="16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    {res.name}
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button 
                onClick={handleCompleteClick}
                className={`btn w-full ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                style={{ width: '100%' }}
              >
                {isCompleted ? (
                  <>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width="16" height="16" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    완료 취소하기
                  </>
                ) : (
                  <>
                    이 단계 완료하기 (+{selectedNode.xp} XP)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roadmap
