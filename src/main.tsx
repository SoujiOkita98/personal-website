import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Scene3D from './Scene3D'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Scene3D />
  </StrictMode>,
)
