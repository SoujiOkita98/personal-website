export interface Post {
  slug: string
  date: string
  tag: string
  title: string
  body: React.ReactNode
}

export const posts: Post[] = [
  {
    slug: 'hello',
    date: '2026-04-04',
    tag: 'meta',
    title: 'hello world',
    body: (
      <>
        <p>this is my blog. more posts coming.</p>
      </>
    ),
  },
]
