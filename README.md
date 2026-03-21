# perryfardella.com

Personal website built with Next.js, Tailwind CSS v4, and MDX.

## Dev

```bash
pnpm dev
```

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4 + typography plugin
- shadcn/ui
- MDX via `next-mdx-remote`
- `next-themes` for dark mode

## Adding a post

Create `content/blog/my-slug.mdx` with frontmatter:

```mdx
---
title: Post Title
date: "YYYY-MM-DD"
description: One-sentence summary.
---
```
