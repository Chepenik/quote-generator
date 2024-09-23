'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { BookmarkIcon, ShareIcon, SunIcon, MoonIcon, Quote, Award, Feather } from 'lucide-react'
import { Input } from "@/components/ui/input"
import foundingQuotes from '@/data/founding_quotes.json'
import Link from 'next/link'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [quote, setQuote] = useState(foundingQuotes.founding_quotes[0])
  const [isLoading, setIsLoading] = useState(false)
  const [favorites, setFavorites] = useState<Array<typeof quote>>([])
  const [customTopic, setCustomTopic] = useState('')
  const [topicError, setTopicError] = useState('')

  const themes = [
    'Inspiration', 'Wisdom', 'Success', 'Leadership',
    'Courage', 'Innovation', 'Perseverance', 'Growth',
    'Creativity', 'Integrity', 'Resilience', 'Vision'
  ]

  const generateQuote = () => {
    const quotes = foundingQuotes.founding_quotes;
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === quote);
    setQuote(newQuote);
  };

  const generateAIQuote = async (topic: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      if (data.quote && data.author) {
        setQuote(data);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      console.error('Error generating quote:', error);
      setQuote({ quote: "Failed to generate quote. Please try again.", author: "Error" });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = () => {
    setFavorites(prev => {
      const newFavorites = prev.some(fav => fav.quote === quote.quote)
        ? prev.filter(fav => fav.quote !== quote.quote)
        : [...prev, quote];
      localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }

  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this quote!',
        text: `"${quote.quote}" - ${quote.author}`,
        url: window.location.href,
      }).then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      console.log('Web Share API not supported');
    }
  }

  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const words = e.target.value.trim().split(/\s+/)
    if (words.length <= 3) {
      setCustomTopic(e.target.value)
      setTopicError('')
    } else {
      setTopicError('Maximum 3 words allowed')
    }
  }

  const handleCustomTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customTopic.trim()) {
      generateAIQuote(customTopic.trim())
      setCustomTopic('')
    }
  }

  return (
    <div className={`min-h-screen flex flex-col p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white' 
        : 'bg-gradient-to-b from-blue-400 to-purple-500 text-black'
    }`}>
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Feather className="h-8 w-8 mr-2 text-white" />
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Times New Roman, serif' }}>
            Common Sense Quote Generator
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <SunIcon className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-yellow-400'}`} />
          <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          <MoonIcon className={`h-4 w-4 ${isDarkMode ? 'text-blue-400' : 'text-gray-400'}`} />
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center text-center">
        <Card className={`w-full max-w-md mb-8 ${
          isDarkMode 
            ? 'bg-gray-800 bg-opacity-90 border-gray-700' 
            : 'bg-white bg-opacity-90 border-amber-500'
        } backdrop-blur-lg border-2 shadow-lg`}>
          <CardContent className="p-6">
            <div key={quote.quote}>
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-blue-950'}`}>Quote of the Day</h2>
              <p className={`text-xl italic mb-4 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>&ldquo;{quote.quote}&rdquo;</p>
              <p className={`text-lg font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>- {quote.author}</p>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <Button
            onClick={generateQuote}
            disabled={isLoading}
            className="
              w-48 h-48 rounded-full 
              flex flex-col items-center justify-center 
              transition-all duration-300 ease-in-out 
              bg-gradient-to-br from-blue-500 to-purple-600 
              text-white shadow-lg 
              relative overflow-hidden 
              group
              hover:from-black hover:to-black
            "
          >
            <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[3px] rounded-full bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[6px] rounded-full bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[9px] rounded-full bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[12px] rounded-full bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[15px] rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[18px] rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Quote className="h-16 w-16 mb-2 z-10 relative group-hover:text-black transition-colors duration-300" />
            <span className="text-xl font-bold z-10 relative group-hover:text-black transition-colors duration-300">New Quote</span>
            {isLoading && (
              <div className="absolute inset-0 bg-blue-600 bg-opacity-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </Button>
        </div>

        <div className="flex space-x-4 mb-8">
          <Button 
            onClick={toggleFavorite}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            <BookmarkIcon className="h-4 w-4 mr-2" /> 
            {favorites.some(fav => fav.quote === quote.quote) ? 'Saved' : 'Save'}
          </Button>
          <Button 
            onClick={shareQuote}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            <ShareIcon className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-8 w-full max-w-md">
          {themes.map((theme) => (
            <Button 
              key={theme} 
              onClick={() => generateAIQuote(theme)}
              className="
                bg-gradient-to-r from-blue-500 to-purple-600 
                text-white 
                transition-all duration-300 
                relative overflow-hidden 
                group
                border border-transparent
                hover:border-white
                shadow-lg
              "
            >
              <div className="
                absolute inset-0 
                bg-gradient-to-r from-black via-gray-800 to-white
                opacity-0 group-hover:opacity-70 
                transition-opacity duration-300
              " />
              <div className="
                absolute inset-0
                bg-gradient-to-bl from-transparent via-white to-transparent
                opacity-0 group-hover:opacity-20
                transition-opacity duration-300
                transform rotate-45
              " />
              <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300">
                {theme}
              </span>
            </Button>
          ))}
        </div>

        <form onSubmit={handleCustomTopicSubmit} className="w-full max-w-md mb-8">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter custom topic (max 3 words)"
              value={customTopic}
              onChange={handleCustomTopicChange}
              className="flex-grow bg-white bg-opacity-90 border-2 border-purple-300 focus:border-purple-500 text-purple-600"
            />
            <Button 
              type="submit"
              disabled={!customTopic.trim() || !!topicError}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Generate
            </Button>
          </div>
          {topicError && <p className="text-red-500 text-sm mt-1">{topicError}</p>}
        </form>
      </main>

      <footer className={`text-center text-sm font-semibold mt-8 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>
        <p>Daily quote notifications enabled</p>
        <p>Favorites: {favorites.length}</p>
      </footer>

      <Link href="/favs">
        <Button className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
          <Award className="h-5 w-5 mr-2" />
          Top Quotes
        </Button>
      </Link>
    </div>
  )
}
