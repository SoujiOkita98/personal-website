import { useState, useRef, useCallback, type MouseEvent, type ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
}

export default function TerminalWindow({ children, onClose, onMinimize }: TerminalWindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [centered, setCentered] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('.traffic-lights')) return;
    if (fullscreen) return;

    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();

    let startPosX = position.x;
    let startPosY = position.y;

    if (centered) {
      const parent = (e.currentTarget.parentElement as HTMLElement).parentElement as HTMLElement;
      const parentRect = parent.getBoundingClientRect();
      startPosX = (parentRect.width - rect.width) / 2;
      startPosY = (parentRect.height - rect.height) / 2;
      setCentered(false);
      setPosition({ x: startPosX, y: startPosY });
    }

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX,
      startPosY,
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.startPosX + dx,
        y: dragRef.current.startPosY + dy,
      });
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [position, centered, fullscreen]);

  const handleFullscreen = () => {
    setFullscreen((prev) => !prev);
    if (!fullscreen) {
      setCentered(false);
    }
  };

  const windowClass = `terminal-window${fullscreen ? ' terminal-fullscreen' : ''}`;

  const style = fullscreen
    ? {}
    : centered
      ? { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
      : { left: position.x, top: position.y };

  return (
    <div className={windowClass} style={style}>
      <div className="terminal-title-bar" onMouseDown={handleMouseDown}>
        <div className="traffic-lights">
          <div className="traffic-light red" onClick={onClose} />
          <div className="traffic-light yellow" onClick={onMinimize} />
          <div className="traffic-light green" onClick={handleFullscreen} />
        </div>
        <span className="terminal-title-text">guanjiazhu — zsh</span>
      </div>
      {children}
    </div>
  );
}
