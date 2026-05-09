import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { executeCommand } from './commands';
import { subscribeTyping, pulseKey } from './typingStore';

interface HistoryEntry {
  command: string;
  output: string;
}

const WELCOME = `Welcome to guanjiazhu's terminal. Type 'help' to get started.`;

const PROMPT = 'guanjiazhu@web ~ % ';

export default function TerminalBody() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showWelcome, setShowWelcome] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const focusScrollTimerRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [history, showWelcome]);

  // Focus input on click
  const focusInput = () => {
    inputRef.current?.focus();
    window.requestAnimationFrame(scrollToBottom);
  };

  // Auto-focus on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (focusScrollTimerRef.current !== null) {
        window.clearTimeout(focusScrollTimerRef.current);
      }
    };
  }, []);

  const handleInputFocus = () => {
    if (focusScrollTimerRef.current !== null) {
      window.clearTimeout(focusScrollTimerRef.current);
    }

    // Wait for mobile keyboard animation, then keep prompt line visible.
    focusScrollTimerRef.current = window.setTimeout(() => {
      scrollToBottom();
      focusScrollTimerRef.current = null;
    }, 180);
  };

  // Refactored so external sources (3D keyboard clicks, global keydown when
  // input isn't focused) can drive the same submit / history-navigation logic.
  const inputValueRef = useRef('');
  useEffect(() => { inputValueRef.current = input; }, [input]);

  const submitCommand = useCallback((rawCmd: string) => {
    const cmd = rawCmd.trim();

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
  }, []);

  const navigateHistoryUp = useCallback(() => {
    if (commandHistory.length === 0) return;
    const newIndex = historyIndex === -1
      ? commandHistory.length - 1
      : Math.max(0, historyIndex - 1);
    setHistoryIndex(newIndex);
    setInput(commandHistory[newIndex]);
  }, [commandHistory, historyIndex]);

  const navigateHistoryDown = useCallback(() => {
    if (historyIndex === -1) return;
    const newIndex = historyIndex + 1;
    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1);
      setInput('');
    } else {
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }
  }, [commandHistory, historyIndex]);

  // Listen to the shared typing store: drives input from 3D keyboard clicks
  // and from physical keystrokes when the input field doesn't have focus.
  useEffect(() => {
    return subscribeTyping((event) => {
      if (event.type === 'char') {
        setInput((prev) => prev + event.char);
      } else if (event.type === 'backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (event.type === 'enter') {
        submitCommand(inputValueRef.current);
      } else if (event.type === 'arrowup') {
        navigateHistoryUp();
      } else if (event.type === 'arrowdown') {
        navigateHistoryDown();
      }
    });
  }, [submitCommand, navigateHistoryUp, navigateHistoryDown]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Stop ESC from bubbling to the window (prevents zoom-out while typing)
    if (e.key === 'Escape') {
      e.stopPropagation();
      inputRef.current?.blur();
      return;
    }

    // Pulse the matching virtual key for any physical press while focused.
    // (When input isn't focused, the global Scene3D handler does this instead.)
    pulsePhysicalKey(e);

    if (e.key === 'Enter') {
      submitCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistoryUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistoryDown();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
      setShowWelcome(false);
    }
  };

  function pulsePhysicalKey(e: KeyboardEvent<HTMLInputElement>) {
    // Quick mapping matching MacBookKeyboard's key ids.
    const k = e.key;
    if (k === 'Enter') return pulseKey('enter');
    if (k === 'Backspace') return pulseKey('backspace');
    if (k === 'Tab') return pulseKey('tab');
    if (k === ' ') return pulseKey('space');
    if (k === 'ArrowUp') return pulseKey('arrowup');
    if (k === 'ArrowDown') return pulseKey('arrowdown');
    if (k === 'ArrowLeft') return pulseKey('arrowleft');
    if (k === 'ArrowRight') return pulseKey('arrowright');
    if (k.length === 1) {
      const lower = k.toLowerCase();
      if ((lower >= 'a' && lower <= 'z') || (lower >= '0' && lower <= '9')) {
        return pulseKey(lower);
      }
      const punctMap: Record<string, string> = {
        '`': '`', '~': '`', '-': '-', '_': '-', '=': '=', '+': '=',
        '[': '[', '{': '[', ']': ']', '}': ']', '\\': '\\', '|': '\\',
        ';': ';', ':': ';', "'": "'", '"': "'",
        ',': ',', '<': ',', '.': '.', '>': '.', '/': '/', '?': '/',
        '!': '1', '@': '2', '#': '3', '$': '4', '%': '5',
        '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
      };
      if (punctMap[k]) pulseKey(punctMap[k]);
    }
  }

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
          onFocus={handleInputFocus}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
}
