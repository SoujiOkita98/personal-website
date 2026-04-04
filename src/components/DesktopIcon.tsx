import { type ReactNode } from 'react';

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function DesktopIcon({ label, href, onClick, icon }: DesktopIconProps) {
  const handleDoubleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener');
    }
  };

  return (
    <div className="desktop-icon" onDoubleClick={handleDoubleClick}>
      <div className="desktop-icon-image">{icon}</div>
      <span className="desktop-icon-label">{label}</span>
    </div>
  );
}
