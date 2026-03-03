import { useState } from 'react'
import './App.css'
import MenuBar from './components/MenuBar'
import TerminalWindow from './components/Terminal/TerminalWindow'
import TerminalBody from './components/Terminal/TerminalBody'
import Dock from './components/Dock'
import DesktopIcon from './components/DesktopIcon'

function App() {
  const [terminalOpen, setTerminalOpen] = useState(true)

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
        </div>
        {terminalOpen && (
          <TerminalWindow
            onClose={() => setTerminalOpen(false)}
            onMinimize={() => setTerminalOpen(false)}
          >
            <TerminalBody />
          </TerminalWindow>
        )}
        <Dock onTerminalClick={() => setTerminalOpen(true)} terminalOpen={terminalOpen} />
      </div>
    </div>
  )
}

export default App
