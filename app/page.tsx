import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import Footer from "@/components/footer"
import { getAllPosts } from "@/lib/posts"

export default function Home() {
  const posts = getAllPosts()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="font-playfair text-4xl font-medium leading-snug mb-6">
          CPA & software engineer
          <br />
          based in Australia.
        </h1>
        <p className="text-foreground/70 text-lg leading-relaxed max-w-xl">
          I write about accounting, software, and the overlap between the two.
          Currently building tools that make financial workflows less painful.
        </p>
      </section>

      {/* Post list */}
      <section>
        <h2 className="font-playfair text-sm font-medium uppercase tracking-widest text-muted-foreground mb-8">
          Writing
        </h2>
        <div className="space-y-0">
          {posts.map((post, i) => (
            <div key={post.slug}>
              {i > 0 && <Separator className="my-8 bg-foreground/10" />}
              <article>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h3 className="font-playfair text-xl font-medium group-hover:opacity-70 transition-opacity mb-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-3">
                  {new Date(post.date).toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  &middot; {post.readingTime}
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  {post.description}
                </p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
