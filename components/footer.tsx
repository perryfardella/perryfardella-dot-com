import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const links = [
  { href: "https://github.com/perryfardella", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/perry-fardella", label: "LinkedIn", Icon: Linkedin },
  { href: "https://x.com/perryfardella", label: "Twitter", Icon: Twitter },
  { href: "mailto:me@perryfardella.com", label: "Email", Icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 mt-20">
      <div className="max-w-2xl mx-auto px-6 py-8 flex justify-center gap-6">
        {links.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </footer>
  )
}
