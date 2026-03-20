import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type Post = {
  slug: string
  title: string
  date: string
  description: string
  readingTime: string
  content: string
  draft?: boolean
}

const postsDirectory = path.join(process.cwd(), "content/blog")

export function getAllPosts(): Post[] {
  const isDev = process.env.NODE_ENV === "development"
  const filenames = fs.readdirSync(postsDirectory)
  const posts = filenames
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      return getPostBySlug(slug)
    })
    .filter((post): post is Post => post !== undefined)
    .filter((post) => isDev || !post.draft)

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const words = content.trim().split(/\s+/).length
    const readingTime = `${Math.ceil(words / 200)} min read`

    const isDev = process.env.NODE_ENV === "development"
    if (data.draft && !isDev) return undefined

    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      readingTime,
      content,
      draft: data.draft ?? false,
    }
  } catch {
    return undefined
  }
}
