import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APPS } from '@/data/apps'

interface WindowState {
  id: string
  position: { x: number; y: number }
  size: { width: number | string; height: number | string }
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
}

interface OSState {
  windows: Record<string, WindowState>
  activeWindowId: string | null
  windowHistory: string[] // Track order of focused windows
  maxZIndex: number
  theme: 'system' | 'light' | 'dark'
  isCommandMenuOpen: boolean
  
  // Actions
  openWindow: (id: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number | string; height: number | string }) => void
  setTheme: (theme: 'system' | 'light' | 'dark') => void
  setCommandMenuOpen: (isOpen: boolean) => void
  toggleCommandMenu: () => void
  resizeWindowsToFit: (maxWidth: number, maxHeight: number) => void
}

export const useOSStore = create<OSState>()(
  persist(
    (set, get) => ({
      windows: {},
      activeWindowId: null,
      windowHistory: [],
      maxZIndex: 10,
      theme: 'system',
      isCommandMenuOpen: false,

      openWindow: (id) => {
        const state = get()
        // If window exists but is closed or minimized, restore it
        if (state.windows[id]) {
          set({
            windows: {
              ...state.windows,
              [id]: {
                ...state.windows[id],
                isOpen: true,
                isMinimized: false,
                zIndex: state.maxZIndex + 1
              }
            },
            activeWindowId: id,
            windowHistory: [...state.windowHistory.filter(h => h !== id), id],
            maxZIndex: state.maxZIndex + 1
          })
          return
        }

        // New window
        // Get default dimensions from APPS config or fallback
        const appConfig = APPS.find(a => a.id === id)
        let width = appConfig?.width || 600
        let height = appConfig?.height || 400
        
        let x = 100
        let y = 100
        
        if (typeof window !== 'undefined') {
          const screenW = window.innerWidth
          const screenH = window.innerHeight
          const DOCK_HEIGHT = 62 + 16 // Approximate dock height + padding
          const MENU_BAR_HEIGHT = 32
          
          // Constrain dimensions to viewport
          if (width > screenW) width = screenW
          if (height > screenH - MENU_BAR_HEIGHT - DOCK_HEIGHT) {
            height = screenH - MENU_BAR_HEIGHT - DOCK_HEIGHT
          }
          
          // Add cascading offset
          // Reset offset every 10 windows to prevent running off screen
          const offset = (Object.keys(state.windows).length % 10) * 30
          
          // Center-ish start + offset
          // Using a calculated start position rather than hardcoded 100
          const startX = Math.max(0, (screenW - width) / 2)
          const startY = Math.max(MENU_BAR_HEIGHT, (screenH - height) / 2 - 50) // Slightly above center
          
          x = startX + offset
          y = startY + offset
          
          // Final Clamp to ensure it stays on screen
          if (x + width > screenW) {
            x = Math.max(0, screenW - width - 20)
          }
          if (y + height > screenH - DOCK_HEIGHT) {
             y = Math.max(MENU_BAR_HEIGHT, screenH - DOCK_HEIGHT - height - 20)
          }
        } else {
          // Fallback for SSR or no window
          const randomOffset = Object.keys(state.windows).length * 20
          x = 100 + randomOffset
          y = 100 + randomOffset
        }
        
        set({
          windows: {
            ...state.windows,
            [id]: {
              id,
              position: { x, y },
              size: { width, height },
              isOpen: true,
              isMinimized: false,
              zIndex: state.maxZIndex + 1
            }
          },
          activeWindowId: id,
          windowHistory: [...state.windowHistory.filter(h => h !== id), id],
          maxZIndex: state.maxZIndex + 1
        })
      },

      closeWindow: (id) => {
        const state = get()
        const wasActive = state.activeWindowId === id
        
        // Remove from history
        const newHistory = state.windowHistory.filter(h => h !== id)
        
        let nextActiveId = state.activeWindowId
        
        if (wasActive) {
          // Find the last window in history that is open and not minimized
          // We iterate backwards through history
          const lastActive = newHistory.slice().reverse().find(hId => {
            const win = state.windows[hId]
            return win && win.isOpen && !win.isMinimized
          })
          
          nextActiveId = lastActive || null
        }

        set({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              isOpen: false
            }
          },
          activeWindowId: nextActiveId,
          windowHistory: newHistory
        })
      },

      minimizeWindow: (id) => {
        const state = get()
        const wasActive = state.activeWindowId === id
        
        // Remove from history since it's no longer "active" in the user flow sense
        const newHistory = state.windowHistory.filter(h => h !== id)
        
        let nextActiveId = state.activeWindowId
        
        if (wasActive) {
             const lastActive = newHistory.slice().reverse().find(hId => {
            const win = state.windows[hId]
            return win && win.isOpen && !win.isMinimized
          })
          
          nextActiveId = lastActive || null
        }

        set({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              isMinimized: true
            }
          },
          activeWindowId: nextActiveId,
          windowHistory: newHistory
        })
      },

      focusWindow: (id) => {
        const state = get()
        if (state.activeWindowId === id) return

        set({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              zIndex: state.maxZIndex + 1
            }
          },
          activeWindowId: id,
          windowHistory: [...state.windowHistory.filter(h => h !== id), id],
          maxZIndex: state.maxZIndex + 1
        })
      },

      updateWindowPosition: (id, position) => {
        const state = get()
        if (!state.windows[id]) return
        
        set({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              position
            }
          }
        })
      },

      updateWindowSize: (id, size) => {
        const state = get()
        if (!state.windows[id]) return

        set({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              size
            }
          }
        })
      },

      setTheme: (theme) => set({ theme }),
      setCommandMenuOpen: (isOpen) => set({ isCommandMenuOpen: isOpen }),
      toggleCommandMenu: () => set((state) => ({ isCommandMenuOpen: !state.isCommandMenuOpen })),

      // Action to check and resize all windows if they exceed the viewport
      resizeWindowsToFit: (maxWidth, maxHeight) => {
        const state = get()
        const newWindows = { ...state.windows }
        let hasChanges = false

        Object.keys(newWindows).forEach((id) => {
          const win = newWindows[id]
          let width = win.size.width
          let height = win.size.height
          let changed = false

          // Parse stored dimensions if they are strings (though types say number|string, usually numbers for calc)
          // If they are percentages or auto, we might skip or handle differently.
          // Assuming pixels as numbers or "800px" strings for now. 
          // Simplification: let's assume we store numbers or parse them.
          
          const numWidth = typeof width === 'number' ? width : parseInt(width as string) || 0
          const numHeight = typeof height === 'number' ? height : parseInt(height as string) || 0

          // Constrain Width
          if (numWidth > maxWidth) {
            width = maxWidth
            changed = true
          }

          // Constrain Height (leaving room for MenuBar and potentially Dock)
          // Let's say maxHeight includes the full window height. 
          // We want to keep some padding? For now, just raw fit.
          if (numHeight > maxHeight) {
            height = maxHeight
            changed = true
          }

          // Also update position if the window is now off-screen due to resize
          let newX = win.position.x
          let newY = win.position.y
          
          // Check right edge
          if (newX + (typeof width === 'number' ? width : numWidth) > maxWidth) {
            newX = Math.max(0, maxWidth - (typeof width === 'number' ? width : numWidth))
            changed = true
          }
          
          // Check bottom edge
          if (newY + (typeof height === 'number' ? height : numHeight) > maxHeight + 32) { // +32 because maxHeight is height - 32
             newY = Math.max(32, maxHeight + 32 - (typeof height === 'number' ? height : numHeight))
             changed = true
          }

          if (changed) {
            newWindows[id] = {
              ...win,
              size: { width, height },
              position: { x: newX, y: newY }
            }
            hasChanges = true
          }
        })

        if (hasChanges) {
          set({ windows: newWindows })
        }
      }
    }),
    {
      name: 'os-storage', // name of the item in the storage (must be unique)
    }
  )
)

