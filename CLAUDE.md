# Perry Fardella — Personal Website

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 + `@tailwindcss/typography` plugin
- **UI components**: shadcn/ui (new-york style, zinc base)
- **MDX rendering**: `next-mdx-remote/rsc`
- **Frontmatter parsing**: `gray-matter`
- **Syntax highlighting**: `rehype-pretty-code` (github-dark theme)
- **Theme toggling**: `next-themes`
- **Package manager**: `pnpm` — always use `pnpm`, never `npm` or `yarn`

## Design principles

- Editorial/print-inspired, not app-like
- Strong typographic hierarchy; largely monochrome
- Generous whitespace; no animations
- Two fonts:
  - **Playfair Display** (`font-playfair`) — headings, site name, post titles
  - **Source Sans 3** (`font-source-sans`) — body text
- CSS variables `--font-playfair-display` and `--font-source-sans-3` are set on `<html>`; referenced in `@theme inline` block in `globals.css`

## Project structure

```
app/
  layout.tsx          Root layout — fonts, ThemeProvider, Header
  globals.css         CSS vars, typography plugin import
  page.tsx            Homepage — hero bio + post list
  blog/
    [slug]/
      page.tsx        Individual post page (static params)
components/
  header.tsx          Site header (client component — uses useTheme)
  footer.tsx          Footer with social icon links
  ui/
    button.tsx        shadcn Button
    separator.tsx     shadcn Separator
lib/
  utils.ts            cn() helper (clsx + tailwind-merge)
  posts.ts            MDX post reading, frontmatter parsing, reading time
content/
  blog/
    *.mdx             Blog posts
```

## Blog system

Posts live in `content/blog/*.mdx`. Each file needs frontmatter:

```mdx
---
title: Post Title
date: "YYYY-MM-DD"
description: One-sentence summary shown on the homepage.
---

Post body in MDX...
```

The `Post` type (`lib/posts.ts`):

```typescript
type Post = {
  slug: string       // filename without .mdx
  title: string
  date: string       // ISO date string
  description: string
  readingTime: string  // e.g. "3 min read" (words / 200, rounded up)
  content: string    // raw MDX body
}
```

`getAllPosts()` reads all MDX files, parses frontmatter, calculates reading time, and returns posts sorted by date descending.

`getPostBySlug(slug)` returns a single post or `undefined`.

## Adding a new post

1. Create `content/blog/my-post-slug.mdx`
2. Add required frontmatter (`title`, `date`, `description`)
3. Write the post body in MDX

The post will automatically appear on the homepage and get its own page at `/blog/my-post-slug`.

## Tailwind v4 notes

This project uses Tailwind v4, which configures themes via CSS rather than `tailwind.config.ts`. Font families and color tokens are defined in the `@theme inline` block in `app/globals.css`. The typography plugin is imported via `@plugin "@tailwindcss/typography"` at the top of `globals.css`.

## Dark mode

`next-themes` manages dark mode with `attribute="class"`. The `.dark` class is added to `<html>`. CSS variables flip in the `.dark` selector in `globals.css`. The toggle is in `components/header.tsx`.
