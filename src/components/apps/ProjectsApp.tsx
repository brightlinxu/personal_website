import { PROJECTS } from "@/data/projects"
import { ExternalLink } from "lucide-react"

export const ProjectsApp = () => {
  return (
    <div className="h-full w-full @container">
      <div className="p-4 @md:p-6">
        <div className="grid grid-cols-1 @lg:grid-cols-2 gap-4 @md:gap-6 max-w-5xl mx-auto">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-window-bg border border-border rounded-xl overflow-hidden hover:border-foreground/20 hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-video w-full overflow-hidden border-b border-border/50">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-4 @md:p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm @md:text-base font-semibold text-foreground group-hover:underline decoration-border underline-offset-4">{project.name}</h3>
                  <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground transition-colors opacity-0 group-hover:opacity-100 @md:w-4 @md:h-4" />
                </div>
                <p className="text-xs @md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
