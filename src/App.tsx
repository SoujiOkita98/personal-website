import { useState } from 'react'
import './App.css'
import MenuBar from './components/MenuBar'
import TerminalWindow from './components/Terminal/TerminalWindow'
import TerminalBody from './components/Terminal/TerminalBody'
import BlogWindow from './components/BlogWindow'
import Dock from './components/Dock'
import DesktopIcon from './components/DesktopIcon'

function App() {
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [blogOpen, setBlogOpen] = useState(false)

  return (
    <div className="desktop">
      <MenuBar />
      <div className="desktop-content">
        <div className="desktop-icons">
          <DesktopIcon
            label="紫微斗数"
            href="https://ziweidoushu-k-line.vercel.app/"
            icon={
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
                <path d="M32 0A32 32 0 1 0 32 64A16 16 0 0 1 32 32A16 16 0 0 0 32 0Z" fill="#1a1a1a"/>
                <path d="M32 0A32 32 0 0 1 32 64A16 16 0 0 0 32 32A16 16 0 0 1 32 0Z" fill="white"/>
                <circle cx="32" cy="16" r="5" fill="white"/>
                <circle cx="32" cy="48" r="5" fill="#1a1a1a"/>
              </svg>
            }
          />
          <DesktopIcon
            label="blog"
            onClick={() => setBlogOpen(true)}
            icon={
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
                <rect x="4" y="8" width="56" height="48" rx="4" fill="#0d0d0d"/>
                <rect x="12" y="20" width="24" height="2.5" rx="1" fill="#444"/>
                <rect x="12" y="27" width="40" height="2" rx="1" fill="#2a2a2a"/>
                <rect x="12" y="33" width="36" height="2" rx="1" fill="#2a2a2a"/>
                <rect x="12" y="39" width="30" height="2" rx="1" fill="#2a2a2a"/>
                <rect x="12" y="45" width="8" height="2" rx="1" fill="#333"/>
                <rect x="22" y="44.5" width="3" height="3" rx="0.5" fill="#444"/>
              </svg>
            }
          />
        </div>
        {terminalOpen && (
          <TerminalWindow
            onClose={() => setTerminalOpen(false)}
            onMinimize={() => setTerminalOpen(false)}
          >
            <TerminalBody
              onOpenBlog={() => setBlogOpen(true)}
              onOpenZiwei={() => window.open('https://ziweidoushu-k-line.vercel.app/', '_blank', 'noopener')}
            />
          </TerminalWindow>
        )}
        {blogOpen && (
          <BlogWindow
            onClose={() => setBlogOpen(false)}
            onMinimize={() => setBlogOpen(false)}
          />
        )}
        <Dock
          onTerminalClick={() => setTerminalOpen(true)}
          terminalOpen={terminalOpen}
          onBlogClick={() => setBlogOpen(true)}
          blogOpen={blogOpen}
        />
      </div>
    </div>
  )
}

export default App
