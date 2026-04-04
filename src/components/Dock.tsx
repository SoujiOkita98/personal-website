import { type ReactNode } from 'react';
import { Folder, TerminalSquare, Github, Mail, BookOpen } from 'lucide-react';

interface DockItemData {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  color?: string;
  id?: string;
}

interface DockProps {
  onTerminalClick: () => void;
  terminalOpen: boolean;
  onBlogClick: () => void;
  blogOpen: boolean;
}

export default function Dock({ onTerminalClick, terminalOpen, onBlogClick, blogOpen }: DockProps) {
  const DOCK_ITEMS: DockItemData[] = [
    { icon: <Folder size={28} />, label: 'Finder', color: '#2196f3', id: 'finder' },
    { icon: <TerminalSquare size={28} />, label: 'Terminal', active: terminalOpen, color: '#333', id: 'terminal' },
    { icon: <BookOpen size={28} />, label: 'Blog', active: blogOpen, color: '#555', id: 'blog' },
  ];

  const DOCK_LINKS: DockItemData[] = [
    { icon: <Github size={28} />, label: 'GitHub', href: 'https://github.com/SoujiOkita98', color: '#1a1a1a' },
    { icon: <Mail size={28} />, label: 'Email', href: 'mailto:gavin@llamaventures.vc', color: '#4caf50' },
  ];

  const handleClick = (item: DockItemData) => {
    if (item.id === 'terminal') { onTerminalClick(); return; }
    if (item.id === 'blog') { onBlogClick(); return; }
    if (item.href) {
      window.open(item.href, '_blank', 'noopener');
    }
  };

  return (
    <div className="dock-container">
      <div className="dock">
        {DOCK_ITEMS.map((item) => (
          <div key={item.label} className="dock-item" onClick={() => handleClick(item)}>
            <span className="dock-tooltip">{item.label}</span>
            <div className="dock-icon" style={{ color: item.color }}>
              {item.icon}
            </div>
            {item.active && <div className="dock-dot" />}
          </div>
        ))}
        <div className="dock-separator" />
        {DOCK_LINKS.map((item) => (
          <div key={item.label} className="dock-item" onClick={() => handleClick(item)}>
            <span className="dock-tooltip">{item.label}</span>
            <div className="dock-icon" style={{ color: item.color }}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
