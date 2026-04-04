import { useState } from 'react'
import { Linkedin, Link2 } from 'lucide-react'
import TerminalWindow from './Terminal/TerminalWindow'
import { posts } from '../blog/posts'

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function ShareBar({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const url = `${window.location.origin}/blog#${slug}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bw-share-bar">
      <span className="bw-share-label">share</span>
      <a
        href={`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bw-share-btn"
        aria-label="Share on X"
      >
        <XIcon />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bw-share-btn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={13} />
      </a>
      <button
        className={`bw-share-btn${copied ? ' bw-share-copied' : ''}`}
        onClick={handleCopy}
        aria-label="Copy link"
      >
        <Link2 size={13} />
        {copied && <span className="bw-share-copied-text">copied!</span>}
      </button>
    </div>
  )
}

interface BlogWindowProps {
  onClose: () => void
  onMinimize: () => void
}

export default function BlogWindow({ onClose, onMinimize }: BlogWindowProps) {
  return (
    <TerminalWindow onClose={onClose} onMinimize={onMinimize} title="blog — gavinzhu.com">
      <div className="bw-body">
        <div className="bw-header">
          <span className="bw-header-label">// writing</span>
          <a href="/blog" target="_blank" rel="noopener noreferrer" className="bw-open-link">
            open in full ↗
          </a>
        </div>

        {posts.map((post, i) => (
          <article key={post.slug} className="bw-post">
            <div className="bw-post-meta">
              <span className="bw-post-date">{post.date}</span>
              <span className="bw-post-tag">{post.tag}</span>
            </div>
            <h2 className="bw-post-title">{post.title}</h2>
            <div className="bw-post-body">
              {post.body}
            </div>
            <ShareBar slug={post.slug} title={post.title} />
            {i === posts.length - 1 && (
              <span className="bw-cursor" aria-hidden="true" />
            )}
          </article>
        ))}
      </div>
    </TerminalWindow>
  )
}
