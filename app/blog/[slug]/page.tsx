import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import Footer from "@/components/footer"
import { getAllPosts, getPostBySlug } from "@/lib/posts"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: `${post.title} — Perry Fardella`, description: post.description }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="font-playfair text-3xl font-medium leading-snug mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-AU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          &middot; {post.readingTime}
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark",
                    keepBackground: true,
                  },
                ],
              ],
            },
          }}
        />
      </div>

      <Footer />
    </main>
  )
}
