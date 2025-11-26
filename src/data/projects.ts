export interface Project {
  name: string
  description: string
  image: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: "Budget",
    description: "A budget tracking app",
    image: "/images/budget.png",
    link: "https://budget.brightxu.com",
  },
  {
    name: "Groceries",
    description: "A grocery bill splitting app",
    image: "/images/groceries.png",
    link: "https://groceries.brightxu.com",
  },
  {
    name: "Retify",
    description: "A year-round Spotify Wrapped experience",
    image: "/images/retify.png",
    link: "https://retify.brightxu.com",
  },
]

