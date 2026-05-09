// Shared typing pipe — clicks on the 3D keyboard AND physical keypresses
// both flow through here, so the terminal sees a single input source.
//
// (Easter egg requested by 任思邈 Ben Ren — Scam.ai. 2026-05-08)

export type TypingEvent =
  | { type: 'char'; char: string }
  | { type: 'enter' }
  | { type: 'backspace' }
  | { type: 'arrowup' }
  | { type: 'arrowdown' };

type TypingListener = (event: TypingEvent) => void;
type PulseListener = (keyId: string) => void;

const typingListeners = new Set<TypingListener>();
const pulseListeners = new Set<PulseListener>();

export function emitTyping(event: TypingEvent) {
  for (const l of typingListeners) l(event);
}

export function subscribeTyping(listener: TypingListener) {
  typingListeners.add(listener);
  return () => {
    typingListeners.delete(listener);
  };
}

export function pulseKey(keyId: string) {
  for (const l of pulseListeners) l(keyId);
}

export function subscribePulse(listener: PulseListener) {
  pulseListeners.add(listener);
  return () => {
    pulseListeners.delete(listener);
  };
}

// Map a KeyboardEvent.key (or .code) to the virtual key id used in MacBookKeyboard.
// Returns null when no virtual key represents this physical press.
export function mapPhysicalKeyToId(e: KeyboardEvent): string | null {
  const k = e.key;

  if (k === 'Enter') return 'enter';
  if (k === 'Backspace') return 'backspace';
  if (k === 'Tab') return 'tab';
  if (k === 'Escape') return 'esc';
  if (k === ' ') return 'space';
  if (k === 'CapsLock') return 'caps';
  if (k === 'Shift') return e.location === 2 ? 'rshift' : 'lshift';
  if (k === 'Control') return 'lctrl';
  if (k === 'Alt') return e.location === 2 ? 'ropt' : 'lopt';
  if (k === 'Meta') return e.location === 2 ? 'rcmd' : 'lcmd';
  if (k === 'ArrowLeft') return 'arrowleft';
  if (k === 'ArrowRight') return 'arrowright';
  if (k === 'ArrowUp') return 'arrowup';
  if (k === 'ArrowDown') return 'arrowdown';

  // Function keys F1–F12
  if (/^F([1-9]|1[0-2])$/.test(k)) return k.toLowerCase();

  // Letters
  if (k.length === 1) {
    const lower = k.toLowerCase();
    if (lower >= 'a' && lower <= 'z') return lower;
    if (lower >= '0' && lower <= '9') return lower;
    // Punctuation — match the id used in the layout below
    const punct: Record<string, string> = {
      '`': '`', '~': '`',
      '-': '-', '_': '-',
      '=': '=', '+': '=',
      '[': '[', '{': '[',
      ']': ']', '}': ']',
      '\\': '\\', '|': '\\',
      ';': ';', ':': ';',
      "'": "'", '"': "'",
      ',': ',', '<': ',',
      '.': '.', '>': '.',
      '/': '/', '?': '/',
      '!': '1', '@': '2', '#': '3', '$': '4', '%': '5',
      '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
    };
    if (punct[k]) return punct[k];
  }

  return null;
}
