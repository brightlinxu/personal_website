import { useOSStore } from "@/store/osStore"
import { Monitor, Sun, Moon, Smartphone } from "lucide-react"

export const SettingsApp = () => {
  const { theme, setTheme } = useOSStore()

  const themes = [
    { id: 'system', label: 'System Preference', icon: Monitor },
    { id: 'light', label: 'Light Mode', icon: Sun },
    { id: 'dark', label: 'Dark Mode', icon: Moon },
  ] as const

  return (
    <div className="h-full w-full bg-window-bg text-foreground p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Appearance
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                  ${theme === t.id 
                    ? 'border-accent bg-accent/10 text-accent' 
                    : 'border-border hover:border-muted-foreground/20'
                  }
                `}
              >
                <t.icon className="w-8 h-8 mb-3" />
                <span className="font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="p-4 rounded-lg bg-window-header-bg text-sm text-muted-foreground">
          <p>Current theme: <span className="font-medium text-foreground capitalize">{theme}</span></p>
        </div>
      </div>
    </div>
  )
}

