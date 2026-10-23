import { SunMoon } from 'lucide-react'
import type { BlogThemePreference } from './useBlogTheme'
import './blog-theme.css'

interface BlogThemeControlProps {
  preference: BlogThemePreference
  onChange: (preference: BlogThemePreference) => void
}

export default function BlogThemeControl({ preference, onChange }: BlogThemeControlProps) {
  return (
    <label className="blog-theme-control">
      <SunMoon size={16} aria-hidden="true" />
      <span className="sr-only">Color theme</span>
      <select value={preference} onChange={(event) => onChange(event.target.value as BlogThemePreference)}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  )
}
