'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, SunIcon, MoonIcon, Feather } from 'lucide-react';
import Link from 'next/link';
import { Switch } from "@/components/ui/switch";

interface Quote {
  quote: string;
  author: string;
}

export default function FavoriteQuotes() {
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteQuotes');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    // Check for user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const removeFavorite = (quoteToRemove: Quote) => {
    const updatedFavorites = favorites.filter(
      (q) => q.quote !== quoteToRemove.quote || q.author !== quoteToRemove.author
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(updatedFavorites));
  };

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white' 
        : 'bg-gradient-to-b from-red-600 via-orange-500 to-yellow-500 text-black'
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
      <div className="max-w-2xl mx-auto space-y-4">
        {favorites.map((quote, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`${
              isDarkMode 
                ? 'bg-gray-800 bg-opacity-90 border-gray-700' 
                : 'bg-white bg-opacity-90 border-blue-500'
            } backdrop-blur-lg relative overflow-hidden group`}>
              <CardContent className="p-4 relative z-10">
                <p className={`text-lg italic mb-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>&ldquo;{quote.quote}&rdquo;</p>
                <p className={`text-md font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>- {quote.author}</p>
                <button
                  onClick={() => removeFavorite(quote)}
                  className={`absolute top-2 right-2 ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
                >
                  <X size={16} />
                </button>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm" />
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/">
          <Button className={`${
            isDarkMode
              ? 'bg-blue-700 hover:bg-blue-600'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-sm" />
            <span className="relative z-10">Back to Quotes</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}