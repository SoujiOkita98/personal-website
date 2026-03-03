import { type ReactNode } from 'react';

interface DesktopIconProps {
  label: string;
  href: string;
  icon: ReactNode;
}

export default function DesktopIcon({ label, href, icon }: DesktopIconProps) {
  const handleDoubleClick = () => {
    window.open(href, '_blank', 'noopener');
  };

  return (
    <div className="desktop-icon" onDoubleClick={handleDoubleClick}>
      <div className="desktop-icon-image">{icon}</div>
      <span className="desktop-icon-label">{label}</span>
    </div>
  );
}
