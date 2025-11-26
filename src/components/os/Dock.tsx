import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { 
  Folder, 
  Terminal, 
  Mail, 
  Github, 
  Music, 
  Trash2, 
  User,
  Code,
  Settings
} from "lucide-react"

// App definitions
export const APPS = [
  { id: "about", title: "About Me", icon: User, color: "bg-blue-500" },
  { id: "projects", title: "Projects", icon: Code, color: "bg-indigo-500" },
  { id: "resume", title: "Resume", icon: Folder, color: "bg-yellow-500" },
  { id: "contact", title: "Contact", icon: Mail, color: "bg-green-500" },
  { id: "settings", title: "Settings", icon: Settings, color: "bg-gray-500" },
  { id: "github", title: "GitHub", icon: Github, color: "bg-gray-800", link: "https://github.com" }, // We can handle links differently
  { id: "music", title: "Retify", icon: Music, color: "bg-rose-500" },
]

interface DockProps {
  onAppClick: (id: string) => void
}

export const Dock = ({ onAppClick }: DockProps) => {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-1 left-1/2 -translate-x-1/2 z-[9999]"
    >
      <div 
        className="flex gap-4 items-end h-16 px-4 pb-3 rounded-2xl bg-dock-bg backdrop-blur-xl border border-dock-border"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {APPS.map((app) => (
          <DockIcon 
            key={app.id} 
            mouseX={mouseX} 
            app={app} 
            onClick={() => onAppClick(app.id)} 
          />
        ))}
        {/* Divider */}
        <div className="w-[1px] h-10 bg-white/20 mx-1" />
        
        <DockIcon 
            mouseX={mouseX} 
            app={{ id: 'trash', title: 'Trash', icon: Trash2, color: 'bg-gray-600' }} 
            onClick={() => {}} 
        />
      </div>
    </motion.div>
  )
}

function DockIcon({ mouseX, app, onClick }: { mouseX: any, app: any, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-xl shadow-lg relative group flex flex-col items-center justify-end cursor-pointer"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      id={`dock-app-${app.id}`}
    >
      <div className={`w-full h-full rounded-xl ${app.color} flex items-center justify-center text-white`}>
        <app.icon size="60%" />
      </div>
      
      {/* Tooltip */}
      <span className="absolute -top-12 bg-gray-900/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-md">
        {app.title}
      </span>
      
      {/* Active Indicator Dot (optional logic can be added later) */}
      {/* <div className="absolute -bottom-2 w-1 h-1 bg-white/50 rounded-full" /> */}
    </motion.div>
  )
}

