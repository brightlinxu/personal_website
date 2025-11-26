import { useEffect, useState } from "react"
import { Command } from "cmdk"
import { useOSStore } from "@/store/osStore"
import { APPS } from "@/data/apps"
import { GITHUB_URL } from "@/lib/constants"
import { Search, MoveRight, ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { PROJECTS } from "@/data/projects"

export const CommandMenu = () => {
  const { isCommandMenuOpen, setCommandMenuOpen, openWindow, setTheme } = useOSStore()

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandMenuOpen(!isCommandMenuOpen)
      }
      if (e.key === "Escape" && isCommandMenuOpen) {
        e.preventDefault()
        setCommandMenuOpen(false)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isCommandMenuOpen, setCommandMenuOpen])

  const runCommand = (command: () => void) => {
    setCommandMenuOpen(false)
    command()
  }

  // Keywords mapping
  const appKeywords: Record<string, string[]> = {
    about: ["about", "me", "info", "bio"],
    projects: ["projects", "work", "portfolio", "code", "apps"],
    resume: ["resume", "cv", "experience", "job", "career"],
    settings: ["settings", "config", "theme", "appearance", "dark mode", "light mode"],
    github: ["github", "git", "repo", "source"],
  }

  return (
    <AnimatePresence>
      {isCommandMenuOpen && (
        <motion.div
          // initial={{ opacity: 0, scale: 0.98 }}
          // animate={{ opacity: 1, scale: 1 }}
          // exit={{ opacity: 0, scale: 0.98 }}
          // transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-20"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCommandMenuOpen(false)
          }}
        >
          <Command 
            className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/90 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-xl"
          >
            <div className="flex items-center border-b border-gray-200/50 dark:border-gray-700/50 px-4">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <Command.Input 
                autoFocus
                placeholder="Search apps, projects, or commands..."
                className="w-full h-14 bg-transparent outline-none text-lg placeholder:text-gray-400 dark:text-white"
              />
              <div className="flex items-center gap-1 text-xs text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-2 py-1">
                <span className="text-xs">ESC</span>
              </div>
            </div>

            <Command.List className="max-h-[60vh] overflow-y-auto p-2 scroll-py-2">
              <Command.Empty className="py-10 text-center text-gray-500">
                No results found.
              </Command.Empty>

              <Command.Group heading="Apps" className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
                {APPS.map((app) => (
                  <Command.Item
                    key={app.id}
                    keywords={appKeywords[app.id]}
                    onSelect={() => runCommand(() => {
                        if (app.id === 'github') {
                            window.open(GITHUB_URL, "_blank")
                        } else if (app.id === 'resume') {
                            alert("Resume functionality to be implemented!")
                        } else {
                            openWindow(app.id)
                        }
                    })}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer text-sm text-gray-700 dark:text-gray-200 aria-selected:bg-blue-500/10 aria-selected:text-blue-600 dark:aria-selected:bg-blue-500/20 dark:aria-selected:text-blue-400 transition-colors group"
                  >
                    <div className={`p-2 rounded-md ${app.color} text-white relative`}>
                        <app.icon size={16} />
                        {app.external && (
                        <div className="absolute top-0.5 right-0.5 bottom-[70%] left-[70%]">
                          <ArrowUpRight className="text-white/80 size-full" />
                        </div>
        )}
                    </div>
                    <span className="flex-1">{app.title}</span>
                    <span className="text-xs text-gray-400 opacity-0 group-aria-selected:opacity-100 transition-opacity">
                        {app.external ? "Open External" : "Open App"}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Projects" className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
                {PROJECTS.map((project) => (
                  <Command.Item
                    key={project.name}
                    onSelect={() => runCommand(() => window.open(project.link, "_blank"))}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer text-sm text-gray-700 dark:text-gray-200 aria-selected:bg-blue-500/10 aria-selected:text-blue-600 dark:aria-selected:bg-blue-500/20 dark:aria-selected:text-blue-400 transition-colors group"
                  >
                    <img src={project.image} alt={project.name} className="w-8 h-8 rounded object-cover" />
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="truncate">{project.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{project.description}</span>
                    </div>
                    <MoveRight className="w-4 h-4 opacity-0 group-aria-selected:opacity-100 transition-opacity" />
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="System" className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
                <Command.Item
                    onSelect={() => runCommand(() => setTheme('light'))}
                    keywords={['light', 'day', 'white']}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer text-sm text-gray-700 dark:text-gray-200 aria-selected:bg-blue-500/10 aria-selected:text-blue-600 dark:aria-selected:bg-blue-500/20 dark:aria-selected:text-blue-400 transition-colors"
                >
                    <div className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
                        <div className="w-4 h-4 rounded-full bg-white border border-gray-300" />
                    </div>
                    <span>Light Mode</span>
                </Command.Item>
                <Command.Item
                    onSelect={() => runCommand(() => setTheme('dark'))}
                    keywords={['dark', 'night', 'black']}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer text-sm text-gray-700 dark:text-gray-200 aria-selected:bg-blue-500/10 aria-selected:text-blue-600 dark:aria-selected:bg-blue-500/20 dark:aria-selected:text-blue-400 transition-colors"
                >
                    <div className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
                        <div className="w-4 h-4 rounded-full bg-gray-900 border border-gray-700" />
                    </div>
                    <span>Dark Mode</span>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

