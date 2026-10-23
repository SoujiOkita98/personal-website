import { lazy, Suspense } from 'react'

const RealtimeInteractiveVideo = lazy(() => import('./RealtimeInteractiveVideo'))

export interface Post {
  slug: string
  date: string
  tag: string
  title: string
  excerpt: string
  body: React.ReactNode
}

export const posts: Post[] = [
  {
    slug: 'real-time-interactive-video',
    date: '2026-10-23',
    tag: 'research',
    title: 'Real-Time Interactive Video — Industry Landscape & Research Tracker',
    excerpt: 'A research snapshot of 56 real-time video products, world models, open-source projects, papers, and benchmarks — with a competitive framework and industry timeline.',
    body: (
      <Suspense fallback={<p>Loading research tracker…</p>}>
        <RealtimeInteractiveVideo />
      </Suspense>
    ),
  },
  {
    slug: 'just-middlemen-and-wrappers',
    date: '2026-05-30',
    tag: 'ai',
    title: 'Just middlemen and wrappers?',
    excerpt: 'Why middleware like Render, Railway, and Supabase can compound in the agent era — and become the super-wholesalers of AI infrastructure.',
    body: (
      <>
        <p>"It's just a wrapper" is supposed to be an insult. I don't think it is.</p>
        <p>
          Some personal thoughts on value-add in the agent era — why middleware like
          Render, Railway, and Supabase won't get flattened by AI agents but should
          compound instead: <strong>super-wholesalers</strong> that turn arcane
          primitives into friction-free infrastructure. The distributed AWS of the
          agent era, not a layer waiting to be deleted.
        </p>
        <p>
          <a
            href="https://llamaventures.substack.com/p/just-middlemen-and-wrappers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the full piece on Substack →
          </a>
        </p>
      </>
    ),
  },
  {
    slug: 'hello',
    date: '2026-04-04',
    tag: 'meta',
    title: 'hello world',
    excerpt: 'This is my blog. More posts coming.',
    body: (
      <>
        <p>this is my blog. more posts coming.</p>
      </>
    ),
  },
]
