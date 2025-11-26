import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Battery, Wifi, Search, Command } from "lucide-react"
import { useOSStore } from "@/store/osStore"

import { APPS } from "@/data/apps"

export const MenuBar = () => {
  const [time, setTime] = useState(new Date())
  const [shortcut, setShortcut] = useState("⌘K")
  const { toggleCommandMenu, openWindow, activeWindowId } = useOSStore()

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Check if user is on Mac
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    setShortcut(isMac ? "⌘K" : "Ctrl K")
  }, [])

  return (
    <div className="h-8 w-full bg-menu-bar-bg backdrop-blur-md fixed top-0 left-0 z-50 flex items-center justify-between px-4 text-menu-text text-sm border-b border-white/10 select-none">
      <div className="flex items-center gap-4">
        <div 
          className="font-bold text-menu-text hover:opacity-80 cursor-pointer"
          onClick={() => openWindow("about")}
        >
          <img
            src="/images/headshot.jpeg"
            alt="Bright"
            className="w-5 h-5 rounded-full object-cover"
          />
        </div>
        <div className="font-semibold hidden sm:block">
          {activeWindowId ? APPS.find(app => app.id === activeWindowId)?.title || "Bright Xu" : "Bright Xu"}
        </div>
        {/* <div className="hidden sm:flex gap-4 font-medium text-menu-text/90">
          <span className="hover:bg-foreground/10 px-2 rounded cursor-default transition-colors">File</span>
          <span className="hover:bg-foreground/10 px-2 rounded cursor-default transition-colors">Edit</span>
          <span className="hover:bg-foreground/10 px-2 rounded cursor-default transition-colors">View</span>
          <span className="hover:bg-foreground/10 px-2 rounded cursor-default transition-colors">Go</span>
          <span className="hover:bg-foreground/10 px-2 rounded cursor-default transition-colors">Window</span>
          <span className="hover:bg-foreground/10 px-2 rounded cursor-default transition-colors">Help</span>
        </div> */}
      </div>

      <div className="flex items-center gap-4">
        {/* <div className="hidden sm:flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          <Battery size={16} className="text-menu-text" />
        </div>
        <div className="hover:bg-foreground/10 px-2 py-0.5 rounded transition-colors cursor-default">
          <Wifi size={16} />
        </div> */}
        <div 
          className="hover:bg-foreground/10 px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1"
          onClick={toggleCommandMenu}
        >
          <Search size={16} />
          <span className="text-xs opacity-50 hidden sm:block">{shortcut}</span>
        </div>
        {/* <div className="hover:bg-foreground/10 px-2 py-0.5 rounded transition-colors cursor-default flex items-center gap-1">
            <Command size={14} />
            <span className="text-xs">Space</span>
        </div> */}
        <div className="hover:bg-foreground/10 px-2 py-0.5 rounded transition-colors cursor-default min-w-[80px] text-center">
          {format(time, "EEE MMM d h:mm aa")}
        </div>
      </div>
    </div>
  )
}

