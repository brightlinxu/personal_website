import { MapPin, Mail, Github, Linkedin } from "lucide-react"
import { GITHUB_URL, EMAIL, LINKEDIN_URL } from "@/lib/constants"

export const AboutApp = () => {
  return (
    <div className="h-full w-full @container">
      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col @md:flex-row gap-6 @md:gap-8 items-center">
          <div className="relative group shrink-0">
            <div className="absolute -inset-0.5 bg-foreground/10 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <img
              src="/images/headshot.jpeg"
              className="relative w-24 h-24 @md:w-32 @md:h-32 @lg:w-40 @lg:h-40 rounded-full object-cover border border-border shadow-sm transition-all duration-300"
              alt="Bright Xu"
            />
          </div>
          
          <div className="text-left space-y-2 @md:space-y-3 min-w-0 flex-1">
            <h1 className="text-2xl @md:text-2xl @lg:text-3xl font-bold tracking-tight truncate">Bright Xu</h1>
            {/* <h2 className="text-base @md:text-lg text-muted-foreground font-medium">Founder / Software Engineer</h2> */}
            <p className="text-sm @md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto @md:mx-0">
              I&apos;m a founder / software engineer in NYC. I like frontend, building cool UI/UX, cats, and hotpot.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-border/50" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 @sm:grid-cols-2 gap-6 @md:gap-8">
          <div className="space-y-3 @md:space-y-4">
            <h3 className="text-xs @md:text-sm font-semibold text-foreground/80 uppercase tracking-wider">Contact</h3>
            <div className="space-y-2 @md:space-y-3 text-sm @md:text-base">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} className="shrink-0" />
                <span>New York City</span>
              </div>
              
              <a 
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={18} className="shrink-0" />
                <span>{EMAIL}</span>
              </a>

              <a 
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={18} className="shrink-0" />
                <span>GitHub</span>
              </a>

              <a 
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin size={18} className="shrink-0" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="space-y-3 @md:space-y-4">
            <h3 className="text-xs @md:text-sm font-semibold text-foreground/80 uppercase tracking-wider">Current Focus</h3>
            <div className="p-3 @md:p-4 rounded-xl bg-muted-bg/50 border border-border/50 hover:border-border transition-colors">
              <p className="text-xs @md:text-sm text-muted-foreground leading-relaxed">
                Co-founded <a href="https://www.aspect.inc" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:underline underline-offset-4">Aspect</a>, where we're building an agentic AI platform to automate non-creative media workflows. Come check us out!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
