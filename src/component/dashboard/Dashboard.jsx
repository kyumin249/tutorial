import React from 'react'

function Dashboard({ setCurrentPage, userStats, completedRoadmapNodes, completedLessons }) {
  const { xp = 1420 } = userStats || {}
  
  // 3개 트랙 * 6노드 = 18개 로드맵 노드
  const totalRoadmapNodes = 18
  const completedNodesCount = Object.keys(completedRoadmapNodes || {}).filter(k => completedRoadmapNodes[k]).length
  const roadmapProgress = Math.min(100, Math.round((completedNodesCount / totalRoadmapNodes) * 100))

  // 3개 트랙 * 3레슨 = 9개 튜토리얼 레슨
  const totalLessons = 9
  const completedLessonsCount = Object.keys(completedLessons || {}).filter(k => completedLessons[k]).length
  const lessonProgress = Math.min(100, Math.round((completedLessonsCount / totalLessons) * 100))

  const stats = [
    {
      id: 'roadmap-progress',
      label: '로드맵 진행률',
      value: `${roadmapProgress}%`,
      subLabel: `${completedNodesCount} / ${totalRoadmapNodes} 노드 완료`,
      colorClass: 'indigo',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75h6m-6 4.5h6m-6 4.5h6M3 5.25a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25z" />
        </svg>
      )
    },
    {
      id: 'xp-count',
      label: '획득한 경험치',
      value: `${xp} XP`,
      subLabel: `다음 레벨까지 ${500 - (xp % 500)} XP 남음`,
      colorClass: 'amber',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-1.971-.659-1.171-.88-1.171-2.303 0-3.182 1.172-.879 3.07-.879 4.242 0L15 9M1.5 12a10.5 10.5 0 1121 0 10.5 10.5 0 01-21 0z" />
        </svg>
      )
    },
    {
      id: 'lessons-count',
      label: '완료한 튜토리얼',
      value: `${completedLessonsCount} / ${totalLessons}`,
      subLabel: `강의실 진행률 ${lessonProgress}%`,
      colorClass: 'magenta',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      id: 'qa-count',
      label: 'Q&A 질문 참여',
      value: `3 회`,
      subLabel: `커뮤니티 활성도: 우수`,
      colorClass: 'emerald',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      )
    }
  ]

  const activities = [
    {
      id: 1,
      text: '튜토리얼 "REST API와 HTTP 메서드" 퀴즈를 100점으로 통과하였습니다!',
      time: '1시간 전',
      type: 'success'
    },
    {
      id: 2,
      text: '로드맵에서 "HTTP & 웹 기초" 단계를 완료로 기록했습니다. (+150 XP)',
      time: '3시간 전',
      type: 'success'
    },
    {
      id: 3,
      text: 'Q&A 게시판에 "Spring Boot vs Node.js 입문 비교"에 관한 질문을 작성했습니다.',
      time: '어제',
      type: 'primary'
    },
    {
      id: 4,
      text: '회원가입 기념 웰컴 배지 "API 마스터"와 "C언어 마스터"를 획득하였습니다!',
      time: '2일 전',
      type: 'warning'
    }
  ]

  return (
    <div>
      <h2 className="page-title">대시보드</h2>
      <p className="page-subtitle">백엔드·임베디드·데브옵스 학습 진도와 최근 활동 내역을 한눈에 살펴보세요.</p>

      {/* Summary Widgets Grid */}
      <div className="dashboard-summary-grid">
        {stats.map((item) => (
          <div key={item.id} className={`glass-panel stat-card ${item.colorClass}`}>
            <div className="stat-icon-wrapper">{item.icon}</div>
            <div className="stat-details">
              <span className="stat-value">{item.value}</span>
              <span className="stat-label">{item.label}</span>
              <span className="stat-label" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{item.subLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Main Panels */}
      <div className="dashboard-interactive-grid">
        {/* Recommended Action / Feature Card */}
        <div className="glass-panel featured-lesson-card">
          <div className="featured-glow" />
          <div className="featured-header">
            <span className="badge badge-indigo">추천 튜토리얼</span>
            <h3 className="featured-title">Docker 컨테이너 실무: 이미지 빌드부터 배포까지</h3>
            <p className="featured-desc">
              Docker의 이미지 레이어 구조와 Dockerfile 문법, docker-compose 다중 서비스 구성을 직접 실행하며 데브옵스 파이프라인의 핵심을 체득해 보세요.
            </p>
          </div>
          
          <div className="featured-meta">
            <span className="badge badge-magenta">소요 시간: 20분</span>
            <span className="badge badge-emerald">획득 경험치: 100 XP</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
            <span className="badge badge-amber">DevOps 트랙</span>
            <span className="badge badge-indigo">Backend 트랙</span>
            <span className="badge badge-emerald">Embedded 트랙</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={() => setCurrentPage('tutorial')}>
              바로 학습하러 가기
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button className="btn btn-secondary" onClick={() => setCurrentPage('roadmap')}>로드맵 보기</button>
          </div>
        </div>

        {/* Recent Activity Log Panel */}
        <div className="glass-panel recent-activity-panel">
          <h3 className="dashboard-panel-title">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18" style={{ color: 'var(--color-primary-light)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            최근 활동 내역
          </h3>
          <div className="activity-list">
            {activities.map((act) => (
              <div key={act.id} className={`activity-item ${act.type}`}>
                <div className="activity-dot" />
                <div className="activity-content">
                  <span className="activity-text">{act.text}</span>
                  <span className="activity-time">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
