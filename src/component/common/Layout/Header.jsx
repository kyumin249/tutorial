import React from 'react'

function Header({ userStats }) {
  const { xp = 1420, completedRoadmapsCount = 2, completedLessonsCount = 3 } = userStats || {}
  
  // Calculate Level based on XP
  const level = Math.floor(xp / 500) + 1
  const xpInCurrentLevel = xp % 500
  const progressPercent = Math.min(100, Math.floor((xpInCurrentLevel / 500) * 100))

  return (
    <div className="header-container">
      <div className="header-title-section">
        <h1>개발 공부 학습 공간</h1>
        <p>환영합니다! 오늘도 즐거운 웹 개발 공부 되세요.</p>
      </div>

      <div className="header-right">
        {/* Streak Counter */}
        <div className="header-stat-pill">
          <span className="header-stat-icon">🔥</span>
          <span>5일 연속 학습 중</span>
        </div>

        {/* Developer XP & Level Stats */}
        <div className="header-stats">
          <div className="header-stat-pill" style={{ position: 'relative', overflow: 'hidden' }}>
            <span className="header-stat-icon" style={{ color: 'var(--color-primary-light)' }}>🏆</span>
            <span>Lv. {level} ({xpInCurrentLevel}/500 XP)</span>
            <div 
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '3px',
                width: `${progressPercent}%`,
                background: 'var(--grad-brand)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Badge Awards */}
        <div className="header-badge-list">
          <span className="badge badge-indigo">HTML 마스터</span>
          <span className="badge badge-magenta">CSS 요정</span>
          {completedRoadmapsCount > 2 && <span className="badge badge-emerald">JS 히어로</span>}
        </div>

        {/* Notifications mock */}
        <button 
          className="btn-secondary" 
          style={{ 
            padding: '0.5rem', 
            borderRadius: 'var(--radius-full)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a9.013 9.013 0 01-9.963 0M15.147 6c.074.274.11.56.11.854 0 2.507-1.121 4.801-2.902 6.36m-3.492-6.36C8.789 6.26 8.75 5.974 8.75 5.68c0-2.507 1.121-4.801 2.902-6.36m0 0c.348-.22.753-.34 1.18-.34.428 0 .832.12 1.18.34m-2.36 0v2.24m0 0V6a3 3 0 003 3H12" />
          </svg>
          <span 
            style={{ 
              position: 'absolute', 
              top: '2px', 
              right: '2px', 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-danger)',
              boxShadow: '0 0 8px var(--color-danger)'
            }} 
          />
        </button>
      </div>
    </div>
  )
}

export default Header
