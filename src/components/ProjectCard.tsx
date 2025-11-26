interface Project {
  name: string
  description: string
  image: string
  link: string
}

interface ProjectCardProps {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <a
      className="bg-gray-100 rounded-lg relative overflow-hidden cursor-pointer border border-gray-100 group"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <div className="text-lg font-bold">{project.name}</div>
        <div className="text-sm text-gray-500">{project.description}</div>
      </div>
    </a>
  )
}

