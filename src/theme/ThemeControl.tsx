import { SunMoon } from 'lucide-react'
import type { ThemePreference } from './useTheme'
import './theme.css'

interface ThemeControlProps {
  preference: ThemePreference
  onChange: (preference: ThemePreference) => void
}

export default function ThemeControl({ preference, onChange }: ThemeControlProps) {
  return (
    <label className="site-theme-control">
      <SunMoon size={16} aria-hidden="true" />
      <span className="sr-only">Color theme</span>
      <select value={preference} onChange={(event) => onChange(event.target.value as ThemePreference)}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  )
}
