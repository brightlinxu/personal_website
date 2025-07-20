"use client"

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

const PROJECTS = [
  {
    name: "Budget",
    description: "A budget tracking app",
    image: "/images/budget.png",
    link: "https://budget.brightxu.com",
  },
  {
    name: "Groceries",
    description: "A grocery bill splitting app",
    image: "/images/groceries.png",
    link: "https://groceries.brightxu.com",
  },
  {
    name: "Retify",
    description: "A year-round Spotify Wrapped experience",
    image: "/images/retify.png",
    link: "https://retify.brightxu.com",
  },
]

const Home: NextPage = () => {
  useEffect(() => {
    // Load oneko.js script
    const script = document.createElement('script')
    script.src = '/cat/oneko.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup: remove the script and any oneko elements when component unmounts
      document.body.removeChild(script)
      const onekoElement = document.getElementById('oneko')
      if (onekoElement) {
        onekoElement.remove()
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>Bright Xu</title>
        <meta name="description" content="Bright Xu's Personal Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-4 py-16 m-0 w-full mx-auto max-w-[50rem] text-left">
        <div>
          <div className="text-5xl sm:text-6xl md:text-7xl font-black flex items-center shrink-0">
            <div className="shrink-0 whitespace-nowrap">hi, i&apos;m bright</div>
            <img src="/images/headshot.jpeg" className="size-12 sm:size-16 md:size-20 rounded-full ml-4 sm:ml-6 md:ml-8 aspect-square object-cover" alt="headshot"/>
          </div>
          <div className="text-xl font-bold mt-6">
            (that&apos;s actually is my name... Bright Xu)
          </div>
          <div className="text-lg mt-6">
            welcome to my website! i&apos;m a software engineer in NYC. i like frontend, building cool UI/UX, cats, and hotpot.
          </div>
        </div>
        <div className="mt-16">
          <div className="text-2xl font-bold">Some things I&apos;ve built</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {PROJECTS.map(project => (
                             <Link 
                 className="bg-gray-100 rounded-lg relative overflow-hidden cursor-pointer border border-gray-100 group"
                 key={project.name}
                 href={project.link}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <img src={project.image} alt={project.name} className="object-cover aspect-video transition-transform group-hover:scale-110" />
                <div className="p-3">
                  <div className="text-lg font-bold">{project.name}</div>
                  <div className="text-sm text-gray-500">{project.description}</div>
                </div>
              </Link>  
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
