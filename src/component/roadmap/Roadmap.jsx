import { useState } from 'react'

function Roadmap({ completedRoadmapNodes, toggleNodeCompletion, addXp }) {
  const [activeTrack, setActiveTrack] = useState('backend')
  const [selectedNodeId, setSelectedNodeId] = useState('back-http')

  const allTracks = {
    backend: [
      {
        id: 'back-http',
        title: 'HTTP & 웹 기초',
        subtitle: '요청/응답 사이클 이해',
        desc: 'HTTP 프로토콜의 작동 원리, 요청 및 응답 메시지 구조, Stateless 특성과 쿠키/세션의 기본 개념을 학습합니다.',
        difficulty: '초급',
        xp: 150,
        resources: [
          { name: 'MDN Web Docs - HTTP 개요', url: 'https://developer.mozilla.org/ko/docs/Web/HTTP/Overview' },
          { name: 'TCP/IP와 HTTP 네트워크 기초', url: 'https://ko.wikipedia.org/wiki/HTTP' }
        ]
      },
      {
        id: 'back-lang',
        title: '프로그래밍 언어',
        subtitle: 'Java 또는 Python 선택',
        desc: '백엔드 개발의 기반이 되는 언어를 학습합니다. Java의 OOP 패턴 혹은 Python의 비동기 처리 기법을 깊이 있게 공부합니다.',
        difficulty: '초급',
        xp: 200,
        resources: [
          { name: 'Java 자습서 - Oracle', url: 'https://docs.oracle.com/javase/tutorial/' },
          { name: 'Python 공식 안내서', url: 'https://docs.python.org/ko/3/' }
        ]
      },
      {
        id: 'back-framework',
        title: '백엔드 프레임워크',
        subtitle: 'Spring Boot / Express',
        desc: '웹 애플리케이션 프레임워크의 동작 방식을 파악하며, MVC 디자인 패턴 기반의 REST API 웹 서버 아키텍처를 구현해 봅니다.',
        difficulty: '중급',
        xp: 250,
        resources: [
          { name: 'Spring Boot 공식 가이드', url: 'https://spring.io/guides' },
          { name: 'Express.js 완벽 시작하기', url: 'https://expressjs.com/ko/' }
        ]
      },
      {
        id: 'back-db',
        title: '데이터베이스 (RDB)',
        subtitle: 'SQL · JPA · 트랜잭션',
        desc: '관계형 데이터베이스(RDB) 설계 기법을 학습하고 SQL 조인, 인덱스 최적화 및 JPA 영속성 컨텍스트, 트랜잭션 전파 속성을 다룹니다.',
        difficulty: '중급',
        xp: 300,
        resources: [
          { name: 'PostgreSQL 한국 공식 문서', url: 'https://www.postgresql.org/docs/' },
          { name: 'SQLBolt - 인터랙티브 SQL 강좌', url: 'https://sqlbolt.com/' }
        ]
      },
      {
        id: 'back-cache',
        title: '캐시 & NoSQL (Redis)',
        subtitle: '캐싱 전략 · 세션',
        desc: 'Redis 인메모리 스토리지의 구조와 캐싱 전략(Look-aside, Write-through), 분산 환경에서의 세션 관리 및 TTL 만료 처리를 구현합니다.',
        difficulty: '중급',
        xp: 320,
        resources: [
          { name: 'Redis 공식 아키텍처 레퍼런스', url: 'https://redis.io/docs/latest/' },
          { name: '백엔드 캐싱 베스트 프랙티스', url: 'https://redis.io/docs/latest/develop/cache/' }
        ]
      },
      {
        id: 'back-cloud',
        title: '클라우드 배포 (AWS)',
        subtitle: 'EC2 · RDS · S3',
        desc: 'AWS의 핵심 가상 리소스인 가상 컴퓨터(EC2), 관리형 데이터베이스(RDS), 클라우드 스토리지(S3) 인프라를 구축하고 배포 파이프라인을 연결합니다.',
        difficulty: '고급',
        xp: 450,
        resources: [
          { name: 'AWS 클라우드 시작하기 자습서', url: 'https://aws.amazon.com/ko/getting-started/' },
          { name: 'AWS EC2 인스턴스 설정 가이드', url: 'https://docs.aws.amazon.com/ec2/' }
        ]
      }
    ],
    devops: [
      {
        id: 'dev-linux',
        title: 'Linux & Shell 스크립트',
        subtitle: 'bash·grep·awk·권한 관리',
        desc: '리눅스 OS 아키텍처와 쉘 환경 설정, 파일 권한 제어 및 복잡한 서버 모니터링 작업을 자동화하기 위한 쉘 스크립트 코딩을 공부합니다.',
        difficulty: '초급',
        xp: 150,
        resources: [
          { name: 'Linux CLI 명령어 매뉴얼 자료실', url: 'https://linux.die.net/man/' },
          { name: 'Bash 쉘 스크립트 프로그래밍 기본', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/' }
        ]
      },
      {
        id: 'dev-net',
        title: '네트워크 & 인프라 보안',
        subtitle: 'TCP/IP·DNS·TLS·방화벽',
        desc: 'TCP/IP 4계층과 라우팅 프로토콜, 도메인 주소 매핑 및 SSL/TLS 인증서를 통한 암호화 전송, VPC와 서브넷 보안 그룹 설정을 실습합니다.',
        difficulty: '초급',
        xp: 200,
        resources: [
          { name: 'Cloudflare - DNS 레코드의 구조', url: 'https://www.cloudflare.com/learning/dns/what-is-dns/' },
          { name: 'SSL/TLS 프로토콜 작동 원리 설명', url: 'https://www.cloudflare.com/learning/ssl/what-is-ssl/' }
        ]
      },
      {
        id: 'dev-docker',
        title: 'Docker 컨테이너화',
        subtitle: 'Dockerfile·docker-compose',
        desc: '애플리케이션 소스 코드를 격리된 환경으로 컨테이너화하기 위해 최적화된 Dockerfile을 빌드하고 docker-compose로 다중 서비스를 연동합니다.',
        difficulty: '중급',
        xp: 250,
        resources: [
          { name: 'Docker 공식 가이드 가이드북', url: 'https://docs.docker.com/get-started/' },
          { name: '효율적인 Dockerfile 빌드 요령', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/' }
        ]
      },
      {
        id: 'dev-cicd',
        title: 'CI/CD 파이프라인',
        subtitle: 'GitHub Actions · Jenkins',
        desc: '형상 관리 시스템과 배포 파이프라인을 연동하여 코드가 커밋되었을 때 자동으로 테스트, 빌드, 이미지화 및 배포 단계를 밟도록 구성합니다.',
        difficulty: '중급',
        xp: 300,
        resources: [
          { name: 'GitHub Actions 기본 개념 매뉴얼', url: 'https://docs.github.com/en/actions' },
          { name: 'Jenkins 서버 구축 및 파이프라인 가이드', url: 'https://www.jenkins.io/doc/' }
        ]
      },
      {
        id: 'dev-iac',
        title: 'IaC (Terraform)',
        subtitle: '인프라 코드화 자동화',
        desc: 'Terraform 선언적 DSL 코드로 클라우드 인프라 자원을 정의하고 변경 내역을 중앙에서 투명하게 관리하는 인프라 소프트웨어화를 설계합니다.',
        difficulty: '중급',
        xp: 350,
        resources: [
          { name: 'Terraform 핵심 튜토리얼', url: 'https://developer.hashicorp.com/terraform/tutorials' },
          { name: 'Terraform AWS 프로바이더 명세서', url: 'https://developer.hashicorp.com/terraform/docs' }
        ]
      },
      {
        id: 'dev-k8s',
        title: 'Kubernetes 오케스트레이션',
        subtitle: 'Pod·Service·Deployment',
        desc: '다중 컨테이너 노드를 효율적으로 스케줄링하고 부하에 대응하는 Auto-scaling, 무중단 롤링 업데이트 및 파드 자가 치유를 마스터합니다.',
        difficulty: '고급',
        xp: 450,
        resources: [
          { name: 'Kubernetes 한국어 공식 설명서', url: 'https://kubernetes.io/docs/home/' },
          { name: 'kubectl CLI 명령어 정리 문서', url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/' }
        ]
      }
    ],
    embedded: [
      {
        id: 'emb-c',
        title: 'C/C++ 기초',
        subtitle: '포인터·메모리 구조·배열',
        desc: '하드웨어 리소스 접근의 기본이 되는 포인터 주소 연산, 2차원 배열과 메모리 정렬 구조, 객체지향 패턴 기반의 C++ 설계 원리를 배웁니다.',
        difficulty: '초급',
        xp: 150,
        resources: [
          { name: 'C 포인터 상세 레퍼런스', url: 'https://en.cppreference.com/w/c/language/pointer' },
          { name: '컴파일러와 링커의 메모리 맵 분석', url: 'https://en.wikipedia.org/wiki/Linker_(computing)' }
        ]
      },
      {
        id: 'emb-arch',
        title: '컴퓨터 구조 & 어셈블리',
        subtitle: '레지스터·스택·ARM ISA',
        desc: 'CPU 내부 레지스터의 세부 데이터 흐름과 호출 규약(Calling Convention), 스택 프레임 형성과 ARM 코어 어셈블리 명령어를 이해합니다.',
        difficulty: '초급',
        xp: 200,
        resources: [
          { name: 'ARM Cortex-M 핵심 매뉴얼', url: 'https://developer.arm.com/documentation' },
          { name: '어셈블리어 명령어 구조 튜토리얼', url: 'https://www.assemblylanguagetutorial.com/' }
        ]
      },
      {
        id: 'emb-peripheral',
        title: 'MCU 주변장치 제어',
        subtitle: 'GPIO·I2C·SPI·UART',
        desc: '마이크로컨트롤러(MCU)에서 디지털 신호 입출력을 처리하는 GPIO 구조와 주변 칩셋 연결을 위한 UART, I2C, SPI 통신 프로토콜을 구현합니다.',
        difficulty: '중급',
        xp: 250,
        resources: [
          { name: 'STMicroelectronics MCU 자료실', url: 'https://www.st.com/en/microcontrollers-microprocessors.html' },
          { name: 'I2C 통신 프레임 규정 요약', url: 'https://en.wikipedia.org/wiki/I%C2%B2C' }
        ]
      },
      {
        id: 'emb-register',
        title: '펌웨어 & 레지스터 설계',
        subtitle: '비트마스킹·하드웨어 추상화',
        desc: '비트 연산자(AND, OR, XOR, NOT)와 마스크 값을 조작해 레지스터 필드를 제어하는 비트마스킹 기법 및 HAL 라이브러리 드라이버 구조를 분석합니다.',
        difficulty: '중급',
        xp: 300,
        resources: [
          { name: 'C 비트 조작 기법 위키독스', url: 'https://en.wikipedia.org/wiki/Bitwise_operation' },
          { name: 'STM32 레지스터 맵 레퍼런스', url: 'https://www.st.com/resource/en/reference_manual' }
        ]
      },
      {
        id: 'emb-rtos',
        title: 'RTOS 멀티태스킹',
        subtitle: 'FreeRTOS·태스크·세마포어',
        desc: '임베디드 실시간 OS 환경에서 멀티 태스크를 기동하는 기법과 우선순위 스케줄링, 뮤텍스 및 바이너리 세마포어 기반 동기화를 마스터합니다.',
        difficulty: '중급',
        xp: 350,
        resources: [
          { name: 'FreeRTOS 커널 모듈 활용 매뉴얼', url: 'https://www.freertos.org/RTOS-Cortex-M3-M4.html' },
          { name: '태스크 스위칭과 인터럽트 지연 방지', url: 'https://www.freertos.org/index.html' }
        ]
      },
      {
        id: 'emb-debug',
        title: '회로 디버깅 & 드라이버',
        subtitle: '오실로스코프·드라이버 포팅',
        desc: 'SWD/JTAG 프로브 기반 인서킷 에뮬레이터 디버깅과 오실로스코프 신호 파형 측정, 리눅스 임베디드 장치 드라이버 컴파일 및 커널 포팅을 수행합니다.',
        difficulty: '고급',
        xp: 450,
        resources: [
          { name: 'JTAG 디버깅 신호 규격 명세서', url: 'https://developer.arm.com/documentation' },
          { name: '오실로스코프/로직분석기 파형 측정', url: 'https://en.wikipedia.org/wiki/Logic_analyzer' }
        ]
      }
    ]
  }

  const handleTrackChange = (track) => {
    setActiveTrack(track)
    const firstNodeId = track === 'backend' ? 'back-http' : track === 'devops' ? 'dev-linux' : 'emb-c'
    setSelectedNodeId(firstNodeId)
  }

  const currentTrackNodes = allTracks[activeTrack]
  const selectedNode = currentTrackNodes.find(node => node.id === selectedNodeId) || currentTrackNodes[0]
  const isCompleted = completedRoadmapNodes[selectedNode.id]

  // Node hierarchy locking check
  const isNodeLocked = (nodeId) => {
    const idx = currentTrackNodes.findIndex(node => node.id === nodeId)
    if (idx === 0) return false // First step in track is always active
    const predecessor = currentTrackNodes[idx - 1]
    return !completedRoadmapNodes[predecessor.id]
  }

  const isCurrentNodeLocked = isNodeLocked(selectedNode.id)

  const handleCompleteToggle = () => {
    if (isCurrentNodeLocked && !isCompleted) return

    toggleNodeCompletion(selectedNode.id)
    if (!isCompleted) {
      addXp(selectedNode.xp)
    } else {
      addXp(-selectedNode.xp)
    }
  }

  // Calculate track specific progress percentage
  const completedCount = currentTrackNodes.filter(n => completedRoadmapNodes[n.id]).length
  const trackProgress = Math.min(100, Math.round((completedCount / currentTrackNodes.length) * 100))

  const trackLabels = {
    backend: 'Backend Track',
    devops: 'DevOps Track',
    embedded: 'Embedded Track'
  }

  return (
    <div>
      <h2 className="page-title">학습 로드맵</h2>
      <p className="page-subtitle">체계적으로 구성된 백엔드, 데브옵스, 임베디드 커리큘럼을 클릭하며 학습 완료 상태를 체크해 보세요.</p>

      <div className="roadmap-layout animate-fade-in">
        {/* Left Side: Roadmap Tree Node List */}
        <div className="glass-panel roadmap-tree">
          <div className="roadmap-section-title">{trackLabels[activeTrack]}</div>

          {/* Track Selection Tabs */}
          <div className="track-tabs">
            <button 
              className={`track-tab backend ${activeTrack === 'backend' ? 'active' : ''}`}
              onClick={() => handleTrackChange('backend')}
            >
              Backend
            </button>
            <button 
              className={`track-tab devops ${activeTrack === 'devops' ? 'active' : ''}`}
              onClick={() => handleTrackChange('devops')}
            >
              DevOps
            </button>
            <button 
              className={`track-tab embedded ${activeTrack === 'embedded' ? 'active' : ''}`}
              onClick={() => handleTrackChange('embedded')}
            >
              Embedded
            </button>
          </div>

          {/* Dynamic Nodes based on selected track */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {currentTrackNodes.map((node) => {
              const completed = completedRoadmapNodes[node.id]
              const locked = isNodeLocked(node.id)
              const active = !completed && !locked
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

          {/* Progress footer for active track */}
          <div className="progress-footer">
            <div className="progress-label">
              <span>{activeTrack === 'backend' ? '백엔드' : activeTrack === 'devops' ? 'DevOps' : '임베디드'} 로드맵 진행률</span>
              <span 
                style={{ 
                  color: activeTrack === 'backend' ? 'var(--color-primary-light)' :
                         activeTrack === 'devops' ? 'var(--color-secondary)' :
                                                    'var(--color-success)', 
                  fontWeight: 700 
                }}
              >
                {trackProgress}%
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${trackProgress}%`,
                  background: activeTrack === 'backend' ? 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))' :
                              activeTrack === 'devops' ? 'linear-gradient(90deg, var(--color-secondary), #f472b6)' :
                                                         'linear-gradient(90deg, var(--color-success), var(--color-success))'
                }}
              />
            </div>
          </div>
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
                onClick={handleCompleteToggle}
                disabled={isCurrentNodeLocked && !isCompleted}
                className={`btn w-full ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                style={{ width: '100%', cursor: (isCurrentNodeLocked && !isCompleted) ? 'not-allowed' : 'pointer' }}
              >
                {isCompleted ? (
                  <>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width="16" height="16" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    완료 취소하기
                  </>
                ) : isCurrentNodeLocked ? (
                  <>
                    🔒 잠겨 있음 (이전 단계를 먼저 완료해주세요)
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
