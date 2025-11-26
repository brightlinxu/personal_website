import { 
  Mail, 
  Github, 
  User,
  Code,
  Settings,
  Map
} from "lucide-react"

export const APPS = [
  { id: "settings", title: "Settings", icon: Settings, color: "bg-gray-500" },
  { id: "about", title: "About Me", icon: User, color: "bg-blue-500", width: 800, height: 600 },
  { id: "journey", title: "Journey", icon: Map, color: "bg-emerald-500", width: 900, height: 700 },
  // { id: "resume", title: "Resume", icon: Folder, color: "bg-yellow-500" },
  { id: "projects", title: "Projects", icon: Code, color: "bg-indigo-500", width: 800, height: 600 },
  { id: "github", title: "GitHub", icon: Github, color: "bg-gray-800", external: true }, 
]

