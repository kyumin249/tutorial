import  { useState, useEffect } from 'react'
import Layout from './component/common/Layout/Layout'
import Dashboard from './component/dashboard/Dashboard'
import Roadmap from './component/roadmap/Roadmap'
import Tutorial from './component/tutorial/Tutorial'
import QA from './component/qa/QA'

// Default mock questions for prepopulation
const DEFAULT_QUESTIONS = [
  {
    id: 1,
    title: 'Spring Boot와 Node.js 중 백엔드 입문용으로 무엇이 더 좋을까요?',
    content: '백엔드 개발자를 목표로 공부를 시작하려는 취준생입니다. 현재 대세인 Java Spring Boot를 바로 파고들어야 할지, 아니면 자바스크립트 학습 후 가볍게 Express(Node.js)로 시작해야 할지 갈피를 못 잡겠습니다. 실무에서 어떤 언어/프레임워크가 더 경쟁력 있을까요?',
    author: '백엔드새싹',
    date: '3시간 전',
    upvotes: 12,
    upvoted: false,
    tags: ['Backend', 'Database'],
    replies: [
      {
        id: 101,
        author: '백엔드마스터',
        date: '2시간 전',
        content: '국내 대기업 및 금융권 SI 환경에서는 정적 타입과 객체 지향 패턴이 확고한 Java + Spring Boot가 압도적인 시장 점유율을 차지하고 있습니다. 하지만 빠른 시제품 개발이나 자바스크립트 풀스택을 지향하신다면 Node.js도 좋은 선택지입니다. 결국 둘 다 다루게 될 가능성이 높으니 본인에게 익숙한 언어로 API 기초를 설계해보고 데이터베이스 연동 경험을 넓히는 것을 추천합니다.'
      }
    ]
  },
  {
    id: 2,
    title: '임베디드 개발을 위해 C++까지 깊게 공부해야 할까요?',
    content: '펌웨어 개발자를 지망하는 전공자입니다. 보통 MCU 제어에는 C 언어가 표준으로 쓰인다고 들었는데, 현대 임베디드 실무나 로봇 공학 등에서는 C++ 객체 지향 프로그래밍도 많이 활용되나요? 어떤 범위까지 학습해 두어야 취업에 도움이 될지 궁금합니다.',
    author: '하드웨어러버',
    date: '어제',
    upvotes: 8,
    upvoted: false,
    tags: ['Embedded', 'C-Language'],
    replies: []
  },
  {
    id: 3,
    title: 'CI/CD 파이프라인 구축 시 Jenkins와 GitHub Actions의 차이',
    content: '사이드 프로젝트 배포 자동화를 구성하려 합니다. 기존에는 Jenkins가 국룰이라고 배웠는데, 최근에는 GitHub Actions로 간편하게 워크플로우를 정의하는 기업들이 많다고 들었습니다. 이 두 도구의 실제 현업에서의 체감상 장단점이 궁금합니다.',
    author: '인프라초보',
    date: '3일 전',
    upvotes: 5,
    upvoted: false,
    tags: ['DevOps', 'Docker'],
    replies: [
      {
        id: 102,
        author: '데브옵스구루',
        date: '2일 전',
        content: 'Jenkins는 온프레미스 서버에 직접 구축하여 보안성이 뛰어나고 커스텀 플러그인 생태계가 압도적이지만, 자체 서버 관리 리소스가 듭니다. 반면 GitHub Actions는 클라우드 호스팅 기반(SaaS)이라 별도의 인프라 설치 없이 YAML 파일 설정 몇 줄로 즉시 구현되어 편의성이 극도로 뛰어납니다. 대형 엔터프라이즈급이나 폐쇄망 환경이 아니라면, 가볍고 관리 오버헤드가 적은 GitHub Actions를 먼저 경험해보시는 것이 최신 트렌드에 잘 맞습니다.'
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
    const parsed = saved ? JSON.parse(saved) : null
    const defaultNodes = {
      'back-http': true,
      'back-lang': true,
      'back-framework': false,
      'back-db': false,
      'back-cache': false,
      'back-cloud': false,
      'emb-c': false,
      'emb-arch': false,
      'emb-peripheral': false,
      'emb-register': false,
      'emb-rtos': false,
      'emb-debug': false,
      'dev-linux': false,
      'dev-net': false,
      'dev-docker': false,
      'dev-cicd': false,
      'dev-iac': false,
      'dev-k8s': false
    }
    if (!parsed || parsed['html-css'] !== undefined || parsed['js-basics'] !== undefined) {
      return defaultNodes
    }
    return { ...defaultNodes, ...parsed }
  })

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('devpath_completed_lessons')
    const parsed = saved ? JSON.parse(saved) : null
    if (!parsed || parsed['jsx-basics'] !== undefined || parsed['useeffect-hook'] !== undefined) {
      return {
        'backend-rest': false,
        'backend-db': false,
        'backend-auth': false,
        'embed-c': false,
        'embed-gpio': false,
        'embed-interrupt': false,
        'devops-docker': false,
        'devops-cicd': false,
        'devops-k8s': false
      }
    }
    return parsed
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
