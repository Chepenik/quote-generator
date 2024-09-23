import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from 'lucide-react';

interface Quote {
  quote: string;
  author: string;
}

interface SavedQuotesProps {
  quotes: Quote[];
  onRemove: (quote: Quote) => void;
}

const SavedQuotes: React.FC<SavedQuotesProps> = ({ quotes, onRemove }) => {
  return (
    <Card className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg border-2 border-amber-500 shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-950">Saved Quotes</h2>
        <ScrollArea className="h-64 w-full pr-4">
          <div className="space-y-4">
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Card className="bg-gray-100 p-4">
                  <p className="text-lg italic text-black mb-2">&ldquo;{quote.quote}&rdquo;</p>
                  <p className="text-md font-semibold text-blue-800">- {quote.author}</p>
                  <button
                    onClick={() => onRemove(quote)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SavedQuotes;