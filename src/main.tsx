import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Blog from './pages/Blog'
import HomeScene from './components/HomeScene'
import { SceneLoadBoundary } from './components/SceneLoadBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SceneLoadBoundary>
              <HomeScene />
            </SceneLoadBoundary>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/*" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
