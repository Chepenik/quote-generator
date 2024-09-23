'use client';

import { useState, useEffect } from 'react'
   import { motion } from 'framer-motion'
   import { Button } from "@/components/ui/button"
   import { Switch } from "@/components/ui/switch"
   import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
   import { Card, CardContent } from "@/components/ui/card"
   import { BookmarkIcon, ShareIcon, UserIcon, SunIcon, MoonIcon, RefreshCw } from 'lucide-react'

   export default function Home() {
     const [isDarkMode, setIsDarkMode] = useState(false)
     const [quote, setQuote] = useState("The best way to predict the future is to create it.")
     const [scale, setScale] = useState(1)

     useEffect(() => {
       const interval = setInterval(() => {
         setScale(s => s === 1 ? 1.05 : 1)
       }, 2000)
       return () => clearInterval(interval)
     }, [])

     const generateQuote = () => {
       // This would call the AI API to generate a new quote
       setQuote("New AI-generated quote would appear here.")
     }

     return (
       <div className={`min-h-screen flex flex-col p-4 ${
         isDarkMode 
           ? 'bg-gradient-to-b from-blue-950 via-blue-900 to-amber-700' 
           : 'bg-gradient-to-b from-blue-900 via-blue-800 to-amber-600'
       } text-black`}>
         <header className="flex justify-between items-center mb-8">
           <Avatar>
             <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
             <AvatarFallback><UserIcon className="h-6 w-6 text-blue-950" /></AvatarFallback>
           </Avatar>
           <div className="flex items-center space-x-2">
             <SunIcon className="h-4 w-4 text-amber-400" />
             <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
             <MoonIcon className="h-4 w-4 text-blue-300" />
           </div>
         </header>

         <main className="flex-grow flex flex-col justify-center items-center text-center">
           <Card className="w-full max-w-md mb-8 bg-white bg-opacity-90 backdrop-blur-lg border-2 border-amber-500 shadow-lg">
             <CardContent className="p-6">
               <motion.div
                 key={quote}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
               >
                 <h1 className="text-2xl font-bold mb-4 text-blue-950">Quote of the Day</h1>
                 <p className="text-xl italic text-black">{quote}</p>
               </motion.div>
             </CardContent>
           </Card>

           <div className="mb-8">
             <motion.div
               style={{ transform: `scale(${scale})` }}
               transition={{ duration: 0.5 }}
             >
               <Button
                 onClick={generateQuote}
                 className="w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out bg-amber-500 hover:bg-purple-600 text-blue-950 hover:text-white shadow-lg border-4 border-amber-400 hover:border-purple-400"
               >
                 <div className="absolute inset-2 bg-amber-300 bg-opacity-20 rounded-full" />
                 <div className="absolute inset-4 bg-amber-300 bg-opacity-20 rounded-full" />
                 <div className="absolute inset-6 bg-amber-300 bg-opacity-20 rounded-full" />
                 <RefreshCw className="h-16 w-16" />
               </Button>
             </motion.div>
           </div>
           <div className="flex space-x-4 mb-8">
             <Button className="bg-white bg-opacity-90 text-black border-2 border-amber-500 hover:bg-amber-100">
               <BookmarkIcon className="h-4 w-4 mr-2" /> Save
             </Button>
             <Button className="bg-white bg-opacity-90 text-black border-2 border-amber-500 hover:bg-amber-100">
               <ShareIcon className="h-4 w-4 mr-2" /> Share
             </Button>
           </div>

           <div className="flex flex-wrap justify-center gap-2 mb-8">
             {['Inspirational', 'Funny', 'Love', 'Wisdom', 'Success'].map((category) => (
               <Button 
                 key={category} 
                 className="bg-white bg-opacity-90 text-black border-2 border-amber-500 hover:bg-amber-100 text-sm"
               >
                 {category}
               </Button>
             ))}
           </div>
         </main>

         <footer className="text-center text-sm text-blue-950 font-semibold">
           <p>Daily quote notifications enabled</p>
         </footer>
       </div>
     )
   }