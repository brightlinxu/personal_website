import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Start loading after initial fade-in delay
    const startDelay = 600 // matches the delay of the progress bar container
    
    const startLoading = setTimeout(() => {
      setIsVisible(true)
      const duration = 1000 // 1 second loading time
      const interval = 10
      const step = 100 / (duration / interval)

      const timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + step
          if (next >= 100) {
            clearInterval(timer)
            setTimeout(onComplete, 500)
            return 100
          }
          return next
        })
      }, interval)
      
      return () => clearInterval(timer)
    }, startDelay)

    return () => clearTimeout(startLoading)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-8 max-w-md w-full px-8">
        {/* Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <img 
            src="/images/headshot.jpeg" 
            alt="Bright Xu" 
            className="w-24 h-24 rounded-full object-cover shadow-xl"
          />
          <h1 className="text-2xl font-bold tracking-tight">Bright Xu</h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="text-muted-foreground font-medium"
        >
          Welcome to my personal website!
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full flex flex-col gap-2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full h-1.5 bg-muted-bg rounded-full overflow-hidden"
          >
            <motion.div 
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-sm text-muted-foreground"
          >
            BrightOS loading...
          </motion.div>
        </div>
      </div>
    </div>
  )
}
