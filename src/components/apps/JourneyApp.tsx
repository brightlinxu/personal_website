import { motion } from "framer-motion"
import { Calendar, MapPin, GraduationCap, Briefcase, School, Code, Music, Trophy, Rocket, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  year: string
  title: string
  location: string
  description: string
  icon: React.ElementType
}

const TIMELINE: TimelineEvent[] = [
  {
    year: "Childhood - 2020",
    title: "Childhood",
    location: "Michigan",
    description: "Grew up in Michigan. Piano was a huge part of my childhood - started playing at age 4. Competed in tons of competitions and performed at Carnegie Hall in NYC. Favorite subject in school was math.",
    icon: Music
  },
  {
    year: "2020 - 2024",
    title: "University of Michigan",
    location: "Ann Arbor, MI",
    description: "Went to my Umich (my dream school) to study Computer Science. I didn't have any coding experience going into college, but ended up falling in love with it.",
    icon: School
  },
  {
    year: "Jan - April 2022",
    title: "Software Engineer Intern",
    location: "Amazon (Remote)",
    description: "First internship. Got to see how corporate and big tech works. Built and shipped a fullstack web app for Amazon Music",
    icon: Briefcase
  },
  {
    year: "May - Aug 2022",
    title: "Software Engineer Intern",
    location: "Roblox (San Mateo, CA)",
    description: "First in-person internship. Completely automated the app store deployment process, and built an end-to-end testing framework.",
    icon: Code
  },
  {
    year: "Dec 2022",
    title: "Founding Engineer",
    location: "Shade (Ann Arbor, MI)",
    description: "Joined a startup that was still pivoting around while still a student. Put in 40-hour work weeks on top of classes, going to Ricks, and League of Legends.",
    icon: Rocket
  },
  {
    year: "May - Aug 2023",
    title: "Software Engineer Intern",
    location: "Belvedere Trading (Chicago, IL)",
    description: "Was super curious about trading (and it pays a lot), so I interned at a prop trading firm in Chicago to learn more while still working on Shade.",
    icon: Trophy
  },
  {
    year: "2024 - August 2025",
    title: "Founding Engineer",
    location: "Shade (New York, NY)",
    description: "Declined offers from Citadel and Bloomberg to full-send Shade. Moved to NYC to build and scale the product full-time.",
    icon: Rocket
  },
  {
    year: "August 2025 - Present",
    title: "Co-Founder",
    location: "Aspect (YC)",
    description: "Got into Y Combinator with my two best friends / roommates. Quit Shade to build Aspect, an agentic AI platform for media workflows.",
    icon: Zap
  }
]

export const JourneyApp = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-6 md:p-10 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Journey</h1>
          <p className="text-muted-foreground">A timeline of my path so far.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE.map((event, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "relative flex flex-col md:flex-row gap-8 items-start",
                    isEven ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Dot on the line */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-background border border-border rounded-full -translate-x-1/2 top-1/2 z-10 shadow-sm" />

                  {/* Content */}
                  <div className={cn(
                    "ml-12 md:ml-0 flex-1 space-y-2",
                    isEven ? "md:text-right" : "md:text-left"
                  )}>
                    <div className={cn(
                      "flex items-center gap-2 text-sm text-muted-foreground mb-1",
                      isEven ? "md:justify-end" : "md:justify-start"
                    )}>
                      <Calendar size={14} />
                      <span>{event.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    
                    <div className={cn(
                      "flex items-center gap-2 text-sm text-muted-foreground mb-3",
                      isEven ? "md:justify-end" : "md:justify-start"
                    )}>
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  
                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

