import { useState, useRef, useCallback, type MouseEvent, type ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
}

type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const MIN_WIDTH = 360;
const MIN_HEIGHT = 200;

export default function TerminalWindow({ children, onClose, onMinimize }: TerminalWindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [winSize, setWinSize] = useState({ width: 0, height: 0 });
  const [centered, setCentered] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [hasCustomSize, setHasCustomSize] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // ── Title bar drag (move) ──
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

  // ── Edge / corner resize ──
  const handleResizeStart = useCallback((e: MouseEvent, dir: ResizeDir) => {
    e.preventDefault();
    e.stopPropagation();
    if (fullscreen) return;

    const el = windowRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    // If we were centered, resolve to absolute position first
    let posX = position.x;
    let posY = position.y;
    if (centered) {
      const parent = el.parentElement as HTMLElement;
      const parentRect = parent.getBoundingClientRect();
      posX = (parentRect.width - rect.width) / 2;
      posY = (parentRect.height - rect.height) / 2;
      setCentered(false);
      setPosition({ x: posX, y: posY });
    }

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = rect.width;
    const startH = rect.height;
    const startPosX = posX;
    const startPosY = posY;

    const onMove = (ev: globalThis.MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      let newW = startW;
      let newH = startH;
      let newX = startPosX;
      let newY = startPosY;

      // Horizontal
      if (dir.includes('e')) newW = Math.max(MIN_WIDTH, startW + dx);
      if (dir.includes('w')) {
        newW = Math.max(MIN_WIDTH, startW - dx);
        newX = startPosX + (startW - newW);
      }

      // Vertical
      if (dir.includes('s')) newH = Math.max(MIN_HEIGHT, startH + dy);
      if (dir === 'n' || dir === 'ne' || dir === 'nw') {
        newH = Math.max(MIN_HEIGHT, startH - dy);
        newY = startPosY + (startH - newH);
      }

      setWinSize({ width: newW, height: newH });
      setPosition({ x: newX, y: newY });
      setHasCustomSize(true);
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [position, centered, fullscreen]);

  const handleFullscreen = () => {
    setFullscreen((prev) => !prev);
    if (!fullscreen) {
      setCentered(false);
    }
  };

  const windowClass = `terminal-window${fullscreen ? ' terminal-fullscreen' : ''}`;

  const style: React.CSSProperties = fullscreen
    ? {}
    : centered
      ? {
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          ...(hasCustomSize ? { width: winSize.width, height: winSize.height } : {}),
        }
      : {
          left: position.x,
          top: position.y,
          ...(hasCustomSize ? { width: winSize.width, height: winSize.height } : {}),
        };

  return (
    <div ref={windowRef} className={windowClass} style={style}>
      {/* Resize handles — edges */}
      {!fullscreen && (
        <>
          <div className="resize-handle resize-n" onMouseDown={(e) => handleResizeStart(e, 'n')} />
          <div className="resize-handle resize-s" onMouseDown={(e) => handleResizeStart(e, 's')} />
          <div className="resize-handle resize-e" onMouseDown={(e) => handleResizeStart(e, 'e')} />
          <div className="resize-handle resize-w" onMouseDown={(e) => handleResizeStart(e, 'w')} />
          {/* Corners */}
          <div className="resize-handle resize-ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
          <div className="resize-handle resize-nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
          <div className="resize-handle resize-se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
          <div className="resize-handle resize-sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
        </>
      )}

      <div className="terminal-inner">
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
    </div>
  );
}
