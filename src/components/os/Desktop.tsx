import { useEffect, useRef, useState } from "react"
import { MenuBar } from "./MenuBar"
import { Dock } from "./Dock"
import { APPS } from "@/data/apps"
import { Window } from "./Window"
import { AboutApp } from "../apps/AboutApp"
import { ProjectsApp } from "../apps/ProjectsApp"
import { SettingsApp } from "../apps/SettingsApp"
import { useOSStore } from "@/store/osStore"
import { AnimatePresence, motion } from "framer-motion"
import { LoadingScreen } from "./LoadingScreen"
import { CommandMenu } from "./CommandMenu"
import { GITHUB_URL } from "@/lib/constants"

export const Desktop = () => {
  const { windows, openWindow, theme, resizeWindowsToFit } = useOSStore()
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark' | ''>('')
  const [isLoading, setIsLoading] = useState(true)
  
  // Create a ref for the desktop area to use as drag constraints
  const desktopRef = useRef<HTMLDivElement>(null)

  // Resize Listener
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      // Subtract Dock height + Menu bar + padding if needed, or just use full viewport
      // For now, we just ensure the window isn't larger than the viewport
      // Subtracting some padding (e.g. 32px for top bar)
      resizeWindowsToFit(width, height - 32)
    }

    window.addEventListener('resize', handleResize)
    
    // Call once on mount to ensure initial sizes are correct
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [resizeWindowsToFit])

  useEffect(() => {
    const checkSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    
    const updateTheme = () => {
      const sys = checkSystemTheme()
      const newTheme = theme === 'system' ? sys : theme
      setEffectiveTheme(newTheme)
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    updateTheme()
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => updateTheme()
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  // Initialize Oneko (The Cat)
  // useEffect(() => {
  //   const script = document.createElement("script")
  //   script.src = "/cat/oneko.js"
  //   script.async = true
  //   document.body.appendChild(script)

  //   return () => {
  //     document.body.removeChild(script)
  //     const onekoElement = document.getElementById("oneko")
  //     if (onekoElement) {
  //       onekoElement.remove()
  //     }
  //   }
  // }, [])

  const handleAppClick = (id: string) => {
    if (id === "github") {
      window.open(GITHUB_URL, "_blank")
      return
    }
    if (id === "music") {
        window.open("https://retify.brightxu.com", "_blank")
        return
    }
    if (id === "resume") {
        alert("Resume functionality to be implemented!")
        return
    }

    openWindow(id)
  }

  const renderAppContent = (id: string) => {
    switch (id) {
      case "about":
        return <AboutApp />
      case "projects":
        return <ProjectsApp />
      case "settings":
        return <SettingsApp />
      default:
        return <div className="p-4 text-white">App content not found</div>
    }
  }

  if (effectiveTheme === '') {
    return null
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[99999]"
          >
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        ref={desktopRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-screen w-screen overflow-hidden relative selection:bg-blue-500/30"
        style={{
          backgroundImage: effectiveTheme === 'dark' 
            ? "url(https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop)"
            : "url(https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease-in-out"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 pointer-events-none transition-colors duration-500 bg-desktop-overlay" />

        <MenuBar />

        {/* Windows Layer */}
        <AnimatePresence initial={false}>
          {Object.values(windows)
            .filter(windowState => windowState.isOpen && !windowState.isMinimized)
            .map((windowState) => (
              <Window
                key={windowState.id}
                id={windowState.id}
                title={APPS.find(a => a.id === windowState.id)?.title || "Window"}
                windowState={windowState}
              >
                {renderAppContent(windowState.id)}
              </Window>
          ))}
        </AnimatePresence>

        <Dock onAppClick={handleAppClick} />
      </motion.div>
      <CommandMenu />
    </>
  )
}
