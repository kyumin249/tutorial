import React, { useState } from 'react'

function QA({ questions, setQuestions, addXp }) {
  const [activeQuestionId, setActiveQuestionId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Form fields for new question
  const [newTitle, setNewTitle] = useState('')
  const [newTags, setNewTags] = useState('')
  const [newContent, setNewContent] = useState('')

  // Reply field
  const [replyText, setReplyText] = useState('')

  const availableTags = ['All', 'React', 'Vite', 'CSS', 'JavaScript']

  const handleUpvote = (qId, e) => {
    e.stopPropagation() // Prevent opening question detail
    
    setQuestions(prevQ => prevQ.map(q => {
      if (q.id === qId) {
        const alreadyUpvoted = q.upvoted
        const change = alreadyUpvoted ? -1 : 1
        if (!alreadyUpvoted) addXp(20) // Award 20 XP for upvoting!
        return {
          ...q,
          upvotes: q.upvotes + change,
          upvoted: !alreadyUpvoted
        }
      }
      return q
    }))
  }

  const handleAskQuestionSubmit = (e) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return

    const parsedTags = newTags.split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map(t => t.charAt(0) === '#' ? t.substring(1) : t) // strip hash if user added it

    const newQuestion = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      author: '개인 개발자',
      date: '방금 전',
      upvotes: 0,
      upvoted: false,
      tags: parsedTags.length > 0 ? parsedTags : ['General'],
      replies: []
    }

    const updatedQ = [newQuestion, ...questions]
    setQuestions(updatedQ)
    localStorage.setItem('devpath_questions', JSON.stringify(updatedQ))

    // Reset form & close modal
    setNewTitle('')
    setNewTags('')
    setNewContent('')
    setIsModalOpen(false)

    // Award 50 XP for asking a question!
    addXp(50)
  }

  const handleAddReplySubmit = (e) => {
    e.preventDefault()
    if (!replyText.trim()) return

    const newReply = {
      id: Date.now(),
      author: '개인 개발자',
      date: '방금 전',
      content: replyText
    }

    setQuestions(prevQ => prevQ.map(q => {
      if (q.id === activeQuestionId) {
        const updatedReplies = [...q.replies, newReply]
        const updatedQuestion = {
          ...q,
          replies: updatedReplies
        }
        
        // Save to localStorage
        const allUpdated = questions.map(x => x.id === activeQuestionId ? updatedQuestion : x)
        localStorage.setItem('devpath_questions', JSON.stringify(allUpdated))
        
        return updatedQuestion
      }
      return q
    }))

    setReplyText('')
    addXp(30) // Award 30 XP for helping others with replies!
  }

  // Filter questions based on tag and search keyword
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTag = selectedTag === 'All' || 
                       q.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
    
    return matchesSearch && matchesTag
  })

  const activeQuestion = questions.find(q => q.id === activeQuestionId)

  return (
    <div>
      <h2 className="page-title">Q&A 게시판</h2>
      <p className="page-subtitle">리액트와 웹 개발을 학습하며 겪는 애로사항을 자유롭게 질문하고 토론하는 커뮤니티형 피드입니다.</p>

      {activeQuestion ? (
        /* ==================== QUESTION DETAIL VIEW ==================== */
        <div className="question-detail-view animate-fade-in">
          {/* Back button */}
          <div>
            <button className="btn btn-secondary" onClick={() => setActiveQuestionId(null)}>
              ← 질문 목록으로 돌아가기
            </button>
          </div>

          <div className="glass-panel question-body-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {activeQuestion.tags.map((t, idx) => (
                  <span key={idx} className="badge badge-indigo">#{t}</span>
                ))}
              </div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)' }}>{activeQuestion.date}</span>
            </div>

            <h3 className="page-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{activeQuestion.title}</h3>
            
            <div className="question-card-author" style={{ marginBottom: '1.5rem' }}>
              <div className="author-mini-avatar">{activeQuestion.author[0]}</div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{activeQuestion.author}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>작성자</span>
            </div>

            <p className="question-detail-desc">{activeQuestion.content}</p>

            {/* Replies section */}
            <div className="replies-section">
              <h4 className="replies-section-title">답변 내역 ({activeQuestion.replies.length}개)</h4>
              
              <div className="replies-list">
                {activeQuestion.replies.length > 0 ? (
                  activeQuestion.replies.map((rep) => (
                    <div key={rep.id} className="reply-card">
                      <div className="reply-header">
                        <div className="author-mini-avatar" style={{ background: 'var(--color-secondary)' }}>{rep.author[0]}</div>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{rep.author}</span>
                        <span>• {rep.date}</span>
                      </div>
                      <p className="reply-content">{rep.content}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
                    등록된 답변이 없습니다. 첫 번째로 유용한 조언을 전해 보세요!
                  </p>
                )}
              </div>

              {/* Add reply form */}
              <form onSubmit={handleAddReplySubmit} className="add-reply-box">
                <textarea
                  className="reply-textarea"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="답변 내용을 자세하게 작성해 주세요. 올바른 지식 공유는 커뮤니티에 힘이 됩니다. (답변 등록 시 +30 XP)"
                  required
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn btn-primary">답변 등록하기</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      ) : (
        /* ==================== QUESTIONS FEED LIST VIEW ==================== */
        <div className="qa-layout animate-fade-in">
          
          {/* Controls: Search, Filters, and "Ask Button" */}
          <div className="qa-control-panel">
            <div className="qa-search-bar">
              <input
                type="text"
                className="qa-search-input"
                placeholder="질문 제목이나 키워드를 검색하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="qa-search-icon" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
              </svg>
            </div>

            <div className="qa-tags-filter">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-filter-btn ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag === 'All' ? '전체' : `#${tag}`}
                </button>
              ))}
            </div>

            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              질문 작성하기
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          {/* Feed List */}
          <div className="questions-list">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (
                <div 
                  key={q.id} 
                  className="glass-panel question-card"
                  onClick={() => setActiveQuestionId(q.id)}
                >
                  {/* Vote column */}
                  <div className="question-votes-col">
                    <button 
                      className={`vote-btn ${q.upvoted ? 'upvoted' : ''}`}
                      onClick={(e) => handleUpvote(q.id, e)}
                    >
                      <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="votes-count">{q.upvotes}</span>
                  </div>

                  {/* Text column */}
                  <div className="question-main-col">
                    <h4 className="question-card-title">{q.title}</h4>
                    <p className="question-card-excerpt">{q.content}</p>
                    
                    <div className="question-card-meta">
                      <div className="question-card-author">
                        <div className="author-mini-avatar">{q.author[0]}</div>
                        <span>{q.author}</span>
                        <span>• {q.date}</span>
                      </div>

                      <div className="question-tags">
                        {q.tags.map((t, i) => (
                          <span key={i} className="badge badge-indigo">#{t}</span>
                        ))}
                        <span className="badge badge-magenta" style={{ background: 'rgba(217, 70, 239, 0.05)' }}>
                          답변 {q.replies.length}개
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                일치하는 검색 질문이 없습니다. 새로운 첫 질문을 던져 보세요!
              </div>
            )}
          </div>

          {/* ==================== ASK QUESTION MODAL DIALOG ==================== */}
          {isModalOpen && (
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
              <div className="glass-panel modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3 className="page-title" style={{ fontSize: '1.25rem' }}>새로운 질문 등록하기</h3>
                  <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleAskQuestionSubmit} className="modal-form">
                  <div className="form-group">
                    <label>질문 제목</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="질문하고 싶은 핵심 요점을 간결하게 적어주세요." 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>해시태그 (콤마로 구분)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="React, CSS, Vite 등 태그를 입력해 주세요." 
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>상세 내용 설명</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="질문하려는 오류 로그나 상세 코드 스펙을 작성하면 보다 정확한 답변을 얻을 수 있습니다. (질문 작성 완료 시 +50 XP)"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      required
                    />
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>취소</button>
                    <button type="submit" className="btn btn-primary">질문 등록하기 (+50 XP)</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default QA
