import { useState, useEffect, useRef } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { Linkedin, Link2 } from 'lucide-react'
import { posts } from '../blog/posts'
import './blog.css'

const FONT_SIZES = [12, 14, 16, 18, 20]
const DEFAULT_SIZE_IDX = 1
const LS_KEY = 'blog-font-size-idx'

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function ShareBar({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const url = `${window.location.origin}/blog/${slug}`
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="share-bar">
      <span className="share-label">share</span>
      <a
        href={`https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
        aria-label="Share on X"
      >
        <XIcon />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={15} />
      </a>
      <button
        className={`share-btn${copied ? ' share-btn-copied' : ''}`}
        onClick={handleCopy}
        aria-label="Copy link"
      >
        <Link2 size={15} />
        {copied && <span className="share-copied-text">copied!</span>}
      </button>
    </div>
  )
}

export default function Blog() {
  const { slug, '*': unmatchedPath } = useParams()
  const { hash } = useLocation()
  const requestedSlug = slug ?? unmatchedPath
  const post = posts.find((entry) => entry.slug === requestedSlug)
  const legacyPost = !requestedSlug && posts.find((entry) => hash === `#${entry.slug}`)
  const contentRef = useRef<HTMLElement>(null)
  const [sizeIdx, setSizeIdx] = useState(() => {
    const saved = localStorage.getItem(LS_KEY)
    const parsed = saved !== null ? parseInt(saved, 10) : DEFAULT_SIZE_IDX
    return Math.min(Math.max(parsed, 0), FONT_SIZES.length - 1)
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, String(sizeIdx))
  }, [sizeIdx])

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
  }, [requestedSlug])

  useEffect(() => {
    const previousTitle = document.title
    document.title = post ? `${post.title} | Gavin Zhu` : 'Blog | Gavin Zhu'
    return () => { document.title = previousTitle }
  }, [post])

  const fontSize = FONT_SIZES[sizeIdx]

  if (legacyPost) {
    return <Navigate to={`/blog/${legacyPost.slug}`} replace />
  }

  return (
    <div className="blog-page" style={{ '--blog-font-size': `${fontSize}px` } as React.CSSProperties}>
      <header className="blog-header">
        <div className="blog-header-left">
          <a href="/" className="blog-site-name">gavinzhu.com</a>
          <span className="blog-separator">/</span>
          <Link to="/blog" className="blog-label">blog</Link>
        </div>
        <div className="blog-header-right">
          <div className="font-size-control">
            <button
              className="font-size-btn"
              onClick={() => setSizeIdx(i => Math.max(0, i - 1))}
              disabled={sizeIdx === 0}
              aria-label="Decrease font size"
            >A-</button>
            <span className="font-size-value">{fontSize}px</span>
            <button
              className="font-size-btn"
              onClick={() => setSizeIdx(i => Math.min(FONT_SIZES.length - 1, i + 1))}
              disabled={sizeIdx === FONT_SIZES.length - 1}
              aria-label="Increase font size"
            >A+</button>
          </div>
          {requestedSlug ? (
            <Link to="/blog" className="blog-back-link">← all posts</Link>
          ) : (
            <a href="/" className="blog-back-link">← back to site</a>
          )}
        </div>
      </header>

      <main ref={contentRef} className="blog-list">
        {post ? (
          <article id={post.slug} className="blog-post-card">
            <div className="blog-post-meta">
              <span className="blog-post-date">{post.date}</span>
              <span className="blog-post-tag">{post.tag}</span>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            <div className="blog-post-body">
              {post.body}
            </div>
            <ShareBar key={post.slug} slug={post.slug} title={post.title} />
            <Link to="/blog" className="blog-all-posts">← all posts</Link>
          </article>
        ) : requestedSlug ? (
          <section>
            <h1 className="blog-post-title">Article not found</h1>
            <Link to="/blog" className="blog-read-link">Browse all posts →</Link>
          </section>
        ) : (
          <>
            <h1 className="blog-index-title">// writing</h1>
            {posts.map((entry) => (
              <article key={entry.slug} className="blog-post-card">
                <div className="blog-post-meta">
                  <span className="blog-post-date">{entry.date}</span>
                  <span className="blog-post-tag">{entry.tag}</span>
                </div>
                <h2 className="blog-post-title">
                  <Link to={`/blog/${entry.slug}`} className="blog-post-link">{entry.title}</Link>
                </h2>
                <p className="blog-post-excerpt">{entry.excerpt}</p>
                <Link to={`/blog/${entry.slug}`} className="blog-read-link">Read article →</Link>
              </article>
            ))}
          </>
        )}
      </main>
    </div>
  )
}
