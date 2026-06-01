import React from 'react'

function Footer() {
  return (
    <div className="footer-container">
      <div>
        <span>© {new Date().getFullYear()} <strong>DevPath</strong>. Created as a premium developer learning dashboard.</span>
      </div>
      <div className="footer-links">
        <a href="#github" onClick={(e) => e.preventDefault()}>GitHub</a>
        <a href="#portfolio" onClick={(e) => e.preventDefault()}>포트폴리오</a>
        <a href="#blog" onClick={(e) => e.preventDefault()}>개발 블로그</a>
      </div>
    </div>
  )
}

export default Footer
