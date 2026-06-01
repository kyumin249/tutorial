import React, { useState, useEffect } from 'react'
import Layout from './component/common/Layout/Layout'
import Dashboard from './component/dashboard/Dashboard'
import Roadmap from './component/roadmap/Roadmap'
import Tutorial from './component/tutorial/Tutorial'
import QA from './component/qa/QA'

// Default mock questions for prepopulation
const DEFAULT_QUESTIONS = [
  {
    id: 1,
    title: 'Vite에서 환경변수(.env) 접근 시 process.env가 동작하지 않아요!',
    content: '리액트 Vite 프로젝트를 진행하고 있는데, .env 파일에 VITE_API_KEY=1234 라고 선언한 뒤 컴포넌트에서 process.env.VITE_API_KEY 로 불러오려고 하니 undefined 에러가 발생합니다. 혹시 Vite 환경에서는 환경변수 로딩 방식이 다른가요?',
    author: '초보자',
    date: '3시간 전',
    upvotes: 12,
    upvoted: false,
    tags: ['Vite', 'React'],
    replies: [
      {
        id: 101,
        author: 'Vite마스터',
        date: '2시간 전',
        content: 'Vite에서는 Webpack과 달리 NodeJS의 `process.env`가 아닌 `import.meta.env` 객체를 통해 환경 변수에 접근해야 합니다! 또한 보안을 위해 `VITE_` 접두사가 붙은 변수만 클라이언트 측 코드로 바인딩되므로, `import.meta.env.VITE_API_KEY` 로 호출하시면 정상 작동할 것입니다.'
      }
    ]
  },
  {
    id: 2,
    title: 'React 19에서 변경된 주요 Hook 사용 방식은 어떤 게 있나요?',
    content: 'React 19 버전으로 마이그레이션을 고민하고 있습니다. useActionState나 useTransition 등 비동기 처리를 돕는 신규 Hook들이 생겼다고 들었는데, 이 외에 기존 Hook(예: useContext)들의 사용법도 대폭 간소화된 점이 있는지 요약 정리해 주실 분을 찾습니다.',
    author: '리액터',
    date: '어제',
    upvotes: 8,
    upvoted: false,
    tags: ['React'],
    replies: []
  },
  {
    id: 3,
    title: 'CSS Grid와 Flexbox 중 카드 배치 시 어떤 레이아웃 방식이 더 좋나요?',
    content: '반응형 카드 리스트를 배치하려 하는데, Flexbox로 가로 나열 후 wrap 처리하여 정렬하는 것과 Grid로 grid-template-columns 설정하는 것 중 실무 퍼블리셔분들은 어떤 방식을 더 권장하시나요?',
    author: '디자이너',
    date: '3일 전',
    upvotes: 5,
    upvoted: false,
    tags: ['CSS'],
    replies: [
      {
        id: 102,
        author: '웹퍼블리셔',
        date: '2일 전',
        content: '보통 Flexbox는 1차원 정렬(단일 행 또는 단일 열 방향)에 최적화되어 있고, Grid는 2차원 구조(가로행과 세로열 동시 바인딩)에 특화되어 있습니다! 카드 격자 배치라면 각 요소의 높이와 간격이 고르게 유지될 수 있도록 CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`)를 적극 추천합니다.'
      }
    ]
  }
]

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Load state from localStorage or use defaults
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('devpath_user_stats')
    return saved ? JSON.parse(saved) : {
      xp: 1420,
      completedRoadmapsCount: 2,
      completedLessonsCount: 1
    }
  })

  const [completedRoadmapNodes, setCompletedRoadmapNodes] = useState(() => {
    const saved = localStorage.getItem('devpath_completed_roadmap')
    return saved ? JSON.parse(saved) : {
      'html-css': true,
      'js-basics': true
    }
  })

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('devpath_completed_lessons')
    return saved ? JSON.parse(saved) : {
      'jsx-basics': false,
      'component-reusability': false,
      'usestate-hook': false,
      'useeffect-hook': false
    }
  })

  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('devpath_questions')
    return saved ? JSON.parse(saved) : DEFAULT_QUESTIONS
  })

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('devpath_user_stats', JSON.stringify(userStats))
  }, [userStats])

  useEffect(() => {
    localStorage.setItem('devpath_completed_roadmap', JSON.stringify(completedRoadmapNodes))
  }, [completedRoadmapNodes])

  useEffect(() => {
    localStorage.setItem('devpath_completed_lessons', JSON.stringify(completedLessons))
  }, [completedLessons])

  // Helper functions
  const addXp = (amount) => {
    setUserStats(prev => {
      const newXp = Math.max(0, prev.xp + amount)
      return {
        ...prev,
        xp: newXp
      }
    })
  }

  const toggleNodeCompletion = (nodeId) => {
    setCompletedRoadmapNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }))
  }

  const toggleLessonCompletion = (lessonId) => {
    setCompletedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }))
  }

  // Route page components
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            setCurrentPage={setCurrentPage} 
            userStats={userStats}
            completedRoadmapNodes={completedRoadmapNodes}
            completedLessons={completedLessons}
          />
        )
      case 'roadmap':
        return (
          <Roadmap 
            completedRoadmapNodes={completedRoadmapNodes} 
            toggleNodeCompletion={toggleNodeCompletion}
            addXp={addXp}
          />
        )
      case 'tutorial':
        return (
          <Tutorial 
            completedLessons={completedLessons}
            toggleLessonCompletion={toggleLessonCompletion}
            addXp={addXp}
          />
        )
      case 'qa':
        return (
          <QA 
            questions={questions}
            setQuestions={setQuestions}
            addXp={addXp}
          />
        )
      default:
        return <Dashboard setCurrentPage={setCurrentPage} userStats={userStats} />
    }
  }

  const completedRoadmapsCount = Object.keys(completedRoadmapNodes).filter(k => completedRoadmapNodes[k]).length
  const completedLessonsCount = Object.keys(completedLessons).filter(k => completedLessons[k]).length

  const enrichedUserStats = {
    ...userStats,
    completedRoadmapsCount,
    completedLessonsCount
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage} userStats={enrichedUserStats}>
      {renderPage()}
    </Layout>
  )
}

export default App
