import { useRef, useState, useEffect } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useOSStore } from "@/store/osStore"
import { APPS } from "@/data/apps"
import { ArrowUpRight } from "lucide-react"

interface DockProps {
  onAppClick: (id: string) => void
}

export const Dock = ({ onAppClick }: DockProps) => {
  const mouseX = useMotionValue(Infinity)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const { windows } = useOSStore()

  useEffect(() => {
    const checkDevice = () => {
      // Check if the primary input mechanism is coarse (touch)
      const isTouch = window.matchMedia("(pointer: coarse)").matches
      setIsTouchDevice(isTouch)
      if (isTouch) {
        mouseX.set(Infinity)
      }
    }

    checkDevice()
    
    const mediaQuery = window.matchMedia("(pointer: coarse)")
    const listener = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches)
      if (e.matches) mouseX.set(Infinity)
    }

    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [mouseX])

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-1 left-1/2 -translate-x-1/2 z-[9999]"
    >
      <div 
        className="flex gap-3 items-end h-14 px-3 pb-2 rounded-3xl bg-dock-bg backdrop-blur-xl border border-dock-border"
        onMouseMove={(e) => {
          if (!isTouchDevice) mouseX.set(e.pageX)
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {APPS.map((app) => (
          <DockIcon 
            key={app.id} 
            mouseX={mouseX} 
            app={app} 
            isOpen={windows[app.id]?.isOpen}
            onClick={() => onAppClick(app.id)} 
          />
        ))}
      </div>
    </motion.div>
  )
}

function DockIcon({ mouseX, app, isOpen, onClick }: { mouseX: any, app: any, isOpen?: boolean, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 65, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-xl shadow-lg relative group flex flex-col items-center justify-end"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      id={`dock-app-${app.id}`}
    >
      <div className={`w-full h-full rounded-xl ${app.color} flex items-center justify-center text-white relative overflow-hidden`}>
        {app.iconImg ? (
          <img src={app.iconImg} alt={app.title} className="w-full h-full object-cover" />
        ) : (
          <app.icon size="60%" />
        )}
        {app.external && (
          <div className="absolute top-1 right-1 bottom-[70%] left-[70%]">
            <ArrowUpRight className="text-white/80 size-full" />
          </div>
        )}
      </div>
      
      {/* Tooltip */}
      <span className="absolute -top-10 bg-gray-900/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-md">
        {app.title}
      </span>
      
      {/* Active Indicator Dot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-[7px] size-[3.5px] bg-foreground/80 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
