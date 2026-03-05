import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { executeCommand } from './commands';

interface HistoryEntry {
  command: string;
  output: string;
}

const WELCOME = `Welcome to guanjiazhu's terminal.
Type 'help' to see available commands.

MacBook model by jackbaeten (sketchfab.com/jackbaeten) - CC BY
3D scene inspired by Henry Heffernan's brilliant Three.js portfolio.
Henry, if you're reading this — thank you for open-sourcing your project.
I learned so much from studying your code. Truly clever work.`;

const PROMPT = 'guanjiazhu@web ~ % ';

export default function TerminalBody() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showWelcome, setShowWelcome] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Auto-focus on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Stop ESC from bubbling to the window (prevents zoom-out while typing)
    if (e.key === 'Escape') {
      e.stopPropagation();
      inputRef.current?.blur();
      return;
    }

    if (e.key === 'Enter') {
      const cmd = input.trim();

      if (cmd === '') {
        setHistory((prev) => [...prev, { command: '', output: '' }]);
        setInput('');
        return;
      }

      const result = executeCommand(cmd);

      if (result && result.text === '__CLEAR__') {
        setHistory([]);
        setShowWelcome(false);
        setInput('');
        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(-1);
        return;
      }

      setHistory((prev) => [
        ...prev,
        { command: cmd, output: result?.text ?? '' },
      ]);
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
      setShowWelcome(false);
    }
  };

  // Prevent wheel events from escaping the terminal into the 3D scene
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="terminal-body" ref={bodyRef} onClick={focusInput} onWheel={handleWheel}>
      {showWelcome && (
        <div className="terminal-output welcome-text">
          <pre>{WELCOME}</pre>
        </div>
      )}

      {history.map((entry, i) => (
        <div key={i}>
          <div className="terminal-line">
            <span className="prompt">{PROMPT}</span>
            {entry.command}
          </div>
          {entry.output && (
            <div className="terminal-output">
              <pre>{entry.output}</pre>
            </div>
          )}
        </div>
      ))}

      <div className="prompt-line">
        <span className="prompt">{PROMPT}</span>
        <input
          ref={inputRef}
          className="terminal-input"
          type="text"
          inputMode="text"
          enterKeyHint="send"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
}
