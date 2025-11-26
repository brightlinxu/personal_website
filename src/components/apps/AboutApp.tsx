export const AboutApp = () => {
  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto text-foreground">
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
        <img
          src="/images/headshot.jpeg"
          className="w-32 h-32 rounded-full object-cover border-4 border-border shadow-lg"
          alt="Bright Xu"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">Hi, I&apos;m Bright Xu</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome to my digital workspace! I&apos;m a software engineer based in NYC with a passion for frontend development and building cool UI/UX experiences.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-border pb-2">Quick Facts</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Frontend Enthusiast & Full Stack Developer</li>
          <li>Based in New York City 🍎</li>
          <li>Love building things from 0 → 1</li>
          <li>Big fan of cats 🐱 and hotpot 🍲</li>
        </ul>
      </div>

      <div className="p-4 bg-muted-bg rounded-lg border border-border">
        <h3 className="font-medium mb-2">Current Status</h3>
        <p className="text-sm text-muted-foreground">
          Currently working on improving my personal website (this one!) and exploring new frontend libraries.
        </p>
      </div>
    </div>
  )
}

