import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSubmit: (url: string, format: 'bullets' | 'paragraph') => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState<string>('');
  const [format, setFormat] = useState<'bullets' | 'paragraph'>('bullets');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for YouTube URL
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    if (!url.includes('youtube.com/watch?v=') && !url.includes('youtu.be/')) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    setError(null);
    onSubmit(url, format);
  };

  // Example URLs that work well with the application
  const handleExampleClick = (exampleUrl: string) => {
    setUrl(exampleUrl);
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="card">
        <h2 className="text-xl md:text-2xl font-display font-semibold mb-6 text-center">
          Get a quick summary of any YouTube video
        </h2>
        
        <div className="mb-6">
          <label htmlFor="youtube-url" className="block mb-2 font-medium">
            YouTube URL
          </label>
          <input
            id="youtube-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="input-field"
            disabled={isLoading}
          />
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
          <div className="mt-2 text-xs text-gray-500">
            <p>Try these examples (videos with captions):</p>
            <div className="mt-1 flex flex-wrap gap-2">
              <button 
                type="button" 
                onClick={() => handleExampleClick("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                className="text-primary-500 hover:underline"
              >
                Example 1
              </button>
              <button 
                type="button" 
                onClick={() => handleExampleClick("https://www.youtube.com/watch?v=jNQXAC9IVRw")}
                className="text-primary-500 hover:underline"
              >
                Example 2
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="block mb-2 font-medium">Summary Format</p>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={format === 'bullets'}
                onChange={() => setFormat('bullets')}
                className="sr-only"
                disabled={isLoading}
              />
              <div className={`w-5 h-5 mr-2 rounded-full border-2 flex items-center justify-center ${format === 'bullets' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900' : 'border-gray-300 dark:border-gray-600'}`}>
                {format === 'bullets' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                )}
              </div>
              <span>Bullet Points</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={format === 'paragraph'}
                onChange={() => setFormat('paragraph')}
                className="sr-only"
                disabled={isLoading}
              />
              <div className={`w-5 h-5 mr-2 rounded-full border-2 flex items-center justify-center ${format === 'paragraph' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900' : 'border-gray-300 dark:border-gray-600'}`}>
                {format === 'paragraph' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                )}
              </div>
              <span>Paragraph</span>
            </label>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="btn btn-primary w-full flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Summary...
            </>
          ) : (
            'Generate Summary'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBar; 