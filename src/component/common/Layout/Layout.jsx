import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

function Layout({ children, currentPage, setCurrentPage, userStats }) {
  return (
    <div className="app-grid">
      <div className="sidebar-area">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      <header className="header-area">
        <Header userStats={userStats} />
      </header>
      <main className="main-area animate-fade-in" key={currentPage}>
        {children}
      </main>
      <footer className="footer-area">
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
