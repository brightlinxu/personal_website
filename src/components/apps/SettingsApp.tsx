import { useOSStore } from "@/store/osStore"
import { Monitor, Sun, Moon, Check } from "lucide-react"

export const SettingsApp = () => {
  const { theme, setTheme } = useOSStore()

  const themes = [
    { id: 'system', label: 'System', icon: Monitor },
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
  ] as const

  return (
    <div className="h-full w-full overflow-y-auto @container">
      <div className="p-6 @md:p-8 text-foreground h-full">
        <div className="max-w-2xl mx-auto space-y-6 @md:space-y-8">
          <div>
            <h2 className="text-xl @md:text-2xl font-bold tracking-tight mb-1 @md:mb-2">Settings</h2>
            <p className="text-xs @md:text-sm text-muted-foreground">Customize your experience.</p>
          </div>
          
          <div className="space-y-3 @md:space-y-4">
            <h3 className="text-xs @md:text-sm font-medium uppercase tracking-wider text-muted-foreground">Appearance</h3>
            
            <div className="grid grid-cols-1 @xs:grid-cols-3 gap-3 @md:gap-4">
              {themes.map((t) => {
                const isActive = theme === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`
                      group relative flex flex-col items-center justify-center gap-2 @md:gap-3 p-3 @md:p-4 rounded-xl border transition-all duration-200
                      ${isActive 
                        ? 'bg-foreground text-background border-foreground' 
                        : 'bg-window-bg border-border hover:border-foreground/30 text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <t.icon className={`w-5 h-5 @md:w-6 @md:h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
                    <span className="text-xs @md:text-sm font-medium">{t.label}</span>
                    
                    {isActive && (
                      <div className="absolute top-2 right-2 @md:top-3 @md:right-3">
                        <Check size={12} strokeWidth={3} className="@md:w-[14px] @md:h-[14px]" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
