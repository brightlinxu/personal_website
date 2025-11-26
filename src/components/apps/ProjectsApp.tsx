import { PROJECTS } from "@/data/projects"
import { ExternalLink } from "lucide-react"

export const ProjectsApp = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
      {PROJECTS.map((project) => (
        <div 
          key={project.name} 
          className="group bg-muted-bg hover:bg-muted-bg/80 border border-border rounded-lg overflow-hidden transition-all duration-200 flex flex-col"
        >
          <div className="aspect-video w-full overflow-hidden bg-black/50 relative">
            <img 
              src={project.image} 
              alt={project.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
          
          <div className="p-4 flex flex-col flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 bg-accent/10 rounded-full hover:bg-accent/20 transition-colors text-accent"
                title="View Project"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground flex-1">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

