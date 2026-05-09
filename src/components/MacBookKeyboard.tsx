import { useEffect, useRef, useCallback } from 'react'
import { Html } from '@react-three/drei'
import {
  emitTyping,
  pulseKey,
  subscribePulse,
  type TypingEvent,
} from './Terminal/typingStore'
import './MacBookKeyboard.css'

// Easter egg: a clickable virtual MacBook keyboard layered over the 3D model.
// Suggested by 任思邈 Ben Ren — Scam.ai, who said:
//   "这个键盘 / 如果可以打字 / 就震撼我妈一整年了"
// He insisted his name appear in the PR. So here it is.

type Control =
  | 'enter' | 'backspace' | 'tab' | 'shift' | 'space'
  | 'caps' | 'fn' | 'cmd' | 'opt' | 'ctrl' | 'esc'
  | 'arrow-left' | 'arrow-right' | 'arrow-up' | 'arrow-down'
  | 'fnrow' | 'power'

interface KeyDef {
  id: string;
  label: string;
  upper?: string;       // for keys that show two glyphs (1/!, 2/@, ...)
  char?: string;        // character emitted on click (lowercase form)
  control?: Control;
  width?: number;       // unit-width multiplier (default 1)
  variant?: 'letter' | 'num' | 'punct' | 'mod' | 'fn' | 'tab' | 'caps' | 'shift' | 'enter' | 'backspace' | 'space' | 'arrow-double';
  modSubclass?: 'cmd' | 'opt' | 'ctrl' | 'fn-mod';
  doubleArrow?: boolean;
}

// Build helper: letter row in a single line.
const letters = (s: string) =>
  s.split('').map<KeyDef>((c) => ({
    id: c,
    label: c.toUpperCase(),
    char: c,
    variant: 'letter',
  }));

const FN_ROW: KeyDef[] = [
  { id: 'esc', label: 'esc', control: 'esc', variant: 'fn' },
  { id: 'f1', label: 'F1', control: 'fnrow', variant: 'fn' },
  { id: 'f2', label: 'F2', control: 'fnrow', variant: 'fn' },
  { id: 'f3', label: 'F3', control: 'fnrow', variant: 'fn' },
  { id: 'f4', label: 'F4', control: 'fnrow', variant: 'fn' },
  { id: 'f5', label: 'F5', control: 'fnrow', variant: 'fn' },
  { id: 'f6', label: 'F6', control: 'fnrow', variant: 'fn' },
  { id: 'f7', label: 'F7', control: 'fnrow', variant: 'fn' },
  { id: 'f8', label: 'F8', control: 'fnrow', variant: 'fn' },
  { id: 'f9', label: 'F9', control: 'fnrow', variant: 'fn' },
  { id: 'f10', label: 'F10', control: 'fnrow', variant: 'fn' },
  { id: 'f11', label: 'F11', control: 'fnrow', variant: 'fn' },
  { id: 'f12', label: 'F12', control: 'fnrow', variant: 'fn' },
  { id: 'power', label: '⏻', control: 'power', variant: 'fn' },
];

const ROW_NUM: KeyDef[] = [
  { id: '`', label: '`', upper: '~', char: '`', variant: 'num' },
  { id: '1', label: '1', upper: '!', char: '1', variant: 'num' },
  { id: '2', label: '2', upper: '@', char: '2', variant: 'num' },
  { id: '3', label: '3', upper: '#', char: '3', variant: 'num' },
  { id: '4', label: '4', upper: '$', char: '4', variant: 'num' },
  { id: '5', label: '5', upper: '%', char: '5', variant: 'num' },
  { id: '6', label: '6', upper: '^', char: '6', variant: 'num' },
  { id: '7', label: '7', upper: '&', char: '7', variant: 'num' },
  { id: '8', label: '8', upper: '*', char: '8', variant: 'num' },
  { id: '9', label: '9', upper: '(', char: '9', variant: 'num' },
  { id: '0', label: '0', upper: ')', char: '0', variant: 'num' },
  { id: '-', label: '-', upper: '_', char: '-', variant: 'punct' },
  { id: '=', label: '=', upper: '+', char: '=', variant: 'punct' },
  { id: 'backspace', label: 'delete', control: 'backspace', width: 1.5, variant: 'backspace' },
];

const ROW_QWERTY: KeyDef[] = [
  { id: 'tab', label: 'tab', control: 'tab', width: 1.5, variant: 'tab' },
  ...letters('qwertyuiop'),
  { id: '[', label: '[', upper: '{', char: '[', variant: 'punct' },
  { id: ']', label: ']', upper: '}', char: ']', variant: 'punct' },
  { id: '\\', label: '\\', upper: '|', char: '\\', variant: 'punct' },
];

const ROW_ASDF: KeyDef[] = [
  { id: 'caps', label: 'caps lock', control: 'caps', width: 1.75, variant: 'caps' },
  ...letters('asdfghjkl'),
  { id: ';', label: ';', upper: ':', char: ';', variant: 'punct' },
  { id: "'", label: "'", upper: '"', char: "'", variant: 'punct' },
  { id: 'enter', label: 'return', control: 'enter', width: 1.75, variant: 'enter' },
];

const ROW_ZXCV: KeyDef[] = [
  { id: 'lshift', label: 'shift', control: 'shift', width: 2.25, variant: 'shift' },
  ...letters('zxcvbnm'),
  { id: ',', label: ',', upper: '<', char: ',', variant: 'punct' },
  { id: '.', label: '.', upper: '>', char: '.', variant: 'punct' },
  { id: '/', label: '/', upper: '?', char: '/', variant: 'punct' },
  { id: 'rshift', label: 'shift', control: 'shift', width: 2.25, variant: 'shift' },
];

const ROW_BOTTOM: KeyDef[] = [
  { id: 'fn', label: 'fn', control: 'fn', variant: 'mod', modSubclass: 'fn-mod' },
  { id: 'lctrl', label: 'control', control: 'ctrl', variant: 'mod', modSubclass: 'ctrl' },
  { id: 'lopt', label: 'option', control: 'opt', variant: 'mod', modSubclass: 'opt' },
  { id: 'lcmd', label: 'command', control: 'cmd', width: 1.25, variant: 'mod', modSubclass: 'cmd' },
  { id: 'space', label: '', control: 'space', width: 5, variant: 'space' },
  { id: 'rcmd', label: 'command', control: 'cmd', width: 1.25, variant: 'mod', modSubclass: 'cmd' },
  { id: 'ropt', label: 'option', control: 'opt', variant: 'mod', modSubclass: 'opt' },
  { id: 'arrowleft', label: '◀', control: 'arrow-left', variant: 'fn' },
  { id: 'arrowupdown', label: '', doubleArrow: true, variant: 'arrow-double' },
  { id: 'arrowright', label: '▶', control: 'arrow-right', variant: 'fn' },
];

const ROWS: { keys: KeyDef[]; isFnRow?: boolean }[] = [
  { keys: FN_ROW, isFnRow: true },
  { keys: ROW_NUM },
  { keys: ROW_QWERTY },
  { keys: ROW_ASDF },
  { keys: ROW_ZXCV },
  { keys: ROW_BOTTOM },
];

function controlToTyping(c: Control): TypingEvent | null {
  switch (c) {
    case 'enter': return { type: 'enter' };
    case 'backspace': return { type: 'backspace' };
    case 'space': return { type: 'char', char: ' ' };
    case 'tab': return { type: 'char', char: '\t' };
    case 'arrow-up': return { type: 'arrowup' };
    case 'arrow-down': return { type: 'arrowdown' };
    default: return null;
  }
}

interface KeyButtonProps {
  k: KeyDef;
  onActivate: (k: KeyDef, subId?: string) => void;
}

function KeyButton({ k, onActivate }: KeyButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const upArrowRef = useRef<HTMLSpanElement>(null);
  const downArrowRef = useRef<HTMLSpanElement>(null);
  const flexGrow = (k.width ?? 1);

  useEffect(() => {
    const unsubscribe = subscribePulse((id) => {
      if (id === 'arrowup' && upArrowRef.current) {
        upArrowRef.current.classList.add('is-pressing');
        window.setTimeout(() => {
          upArrowRef.current?.classList.remove('is-pressing');
        }, 140);
        return;
      }
      if (id === 'arrowdown' && downArrowRef.current) {
        downArrowRef.current.classList.add('is-pressing');
        window.setTimeout(() => {
          downArrowRef.current?.classList.remove('is-pressing');
        }, 140);
        return;
      }
      if (id !== k.id) return;
      const el = ref.current;
      if (!el) return;
      el.classList.add('is-pressed');
      window.setTimeout(() => {
        el.classList.remove('is-pressed');
      }, 140);
    });
    return unsubscribe;
  }, [k.id]);

  const variantClass = k.variant ? `mbk-key-${k.variant}` : '';
  const modClass = k.modSubclass ? `mbk-mod-${k.modSubclass}` : '';

  if (k.doubleArrow) {
    return (
      <button
        ref={ref}
        className={`mbk-key ${variantClass}`}
        style={{ flexGrow: flexGrow, flexBasis: 0 }}
        onClick={(e) => {
          e.stopPropagation();
          // Determine which half was clicked based on Y inside the button.
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          const isUp = e.clientY - rect.top < rect.height / 2;
          onActivate(k, isUp ? 'arrowup' : 'arrowdown');
        }}
      >
        <span className="mbk-arrow-up" ref={upArrowRef}>▲</span>
        <span className="mbk-arrow-down" ref={downArrowRef}>▼</span>
      </button>
    );
  }

  return (
    <button
      ref={ref}
      className={`mbk-key ${variantClass} ${modClass}`}
      style={{ flexGrow: flexGrow, flexBasis: 0 }}
      onClick={(e) => {
        e.stopPropagation();
        onActivate(k);
      }}
    >
      {k.variant === 'num' || (k.variant === 'punct' && k.upper) ? (
        <>
          <span className="mbk-key-upper">{k.upper}</span>
          <span className="mbk-key-lower">{k.label}</span>
        </>
      ) : (
        k.label
      )}
    </button>
  );
}

interface MacBookKeyboardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  distanceFactor: number;
}

export default function MacBookKeyboard({
  position,
  rotation,
  distanceFactor,
}: MacBookKeyboardProps) {
  const handleActivate = useCallback((k: KeyDef, subId?: string) => {
    if (subId === 'arrowup') {
      pulseKey('arrowup');
      emitTyping({ type: 'arrowup' });
      return;
    }
    if (subId === 'arrowdown') {
      pulseKey('arrowdown');
      emitTyping({ type: 'arrowdown' });
      return;
    }
    pulseKey(k.id);
    if (k.control) {
      const ev = controlToTyping(k.control);
      if (ev) emitTyping(ev);
      // shift / caps / cmd / opt / ctrl / fn / fnrow / power → just pulse, no emit
      return;
    }
    if (k.char) emitTyping({ type: 'char', char: k.char });
  }, []);

  return (
    <Html
      transform
      occlude={false}
      distanceFactor={distanceFactor}
      position={position}
      rotation={rotation}
      style={{ pointerEvents: 'auto' }}
      zIndexRange={[8, 0]}
    >
      <div
        className="mbk-root"
        onPointerDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {ROWS.map((row, ri) => (
          <div
            key={ri}
            className={`mbk-row${row.isFnRow ? ' mbk-row-fn' : ''}`}
          >
            {row.keys.map((k) => (
              <KeyButton key={k.id} k={k} onActivate={handleActivate} />
            ))}
          </div>
        ))}
      </div>
    </Html>
  );
}
