import { Mail, MapPin, Linkedin, Github } from "lucide-react"

export const ContactApp = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-8 text-foreground">
      <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-4">
        <Mail size={40} />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
        <p className="text-muted-foreground max-w-md">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        <a 
          href="mailto:contact@brightxu.com" 
          className="flex items-center gap-4 p-4 bg-muted-bg hover:bg-muted-bg/80 border border-border rounded-lg transition-colors group"
        >
          <Mail className="text-muted-foreground group-hover:text-foreground transition-colors" />
          <div className="text-left">
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="font-medium">contact@brightxu.com</div>
          </div>
        </a>

        <a 
          href="https://github.com" 
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 p-4 bg-muted-bg hover:bg-muted-bg/80 border border-border rounded-lg transition-colors group"
        >
          <Github className="text-muted-foreground group-hover:text-foreground transition-colors" />
          <div className="text-left">
            <div className="text-sm text-muted-foreground">GitHub</div>
            <div className="font-medium">github.com/brightxu</div>
          </div>
        </a>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground/70 mt-8">
        <MapPin size={14} />
        <span>New York, NY</span>
      </div>
    </div>
  )
}

