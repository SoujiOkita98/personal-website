import { useState, useEffect } from 'react';

export default function MenuBar() {
  const [time, setTime] = useState(getTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="menu-bar">
      <div className="menu-bar-left">
        <span className="apple-logo"></span>
        <span className="menu-bar-app">Terminal</span>
        <div className="menu-bar-items">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Window</span>
          <span>Help</span>
        </div>
      </div>
      <div className="menu-bar-right">
        <span>{time}</span>
      </div>
    </div>
  );
}

function getTimeString() {
  return new Date().toLocaleTimeString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
