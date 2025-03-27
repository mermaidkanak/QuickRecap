import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SummaryResult from './components/SummaryResult';
import { generateSummary } from './services/ApiService';
import { Toaster, toast } from 'react-hot-toast';

interface SummaryData {
  summary: string;
  videoTitle: string;
  videoUrl: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [summaryFormat, setSummaryFormat] = useState<'bullets' | 'paragraph'>('bullets');

  const handleSubmit = async (url: string, format: 'bullets' | 'paragraph') => {
    setIsLoading(true);
    setSummaryFormat(format);
    
    try {
      const data = await generateSummary(url, format);
      setSummaryData(data);
      toast.success('Summary generated successfully!');
    } catch (error: any) {
      console.error('Error generating summary:', error);
      toast.error(error.message || 'Failed to generate summary. Please try again.');
      setSummaryData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen pb-10">
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#FFFFFF',
              color: '#333333',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              borderRadius: '12px',
              padding: '16px',
            },
          }}
        />
        
        <Header />
        
        <main className="container mx-auto px-4 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              Quick<span className="text-primary-500">Recap</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Get a summarized version of any YouTube video in seconds
            </motion.p>
          </motion.div>
          
          <SearchBar onSubmit={handleSubmit} isLoading={isLoading} />
          
          <AnimatePresence>
            {summaryData && !isLoading && (
              <SummaryResult 
                summary={summaryData.summary} 
                format={summaryFormat}
                videoTitle={summaryData.videoTitle}
                videoUrl={summaryData.videoUrl}
              />
            )}
          </AnimatePresence>
          
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <img 
              src="/mascot.svg" 
              alt="Cute mascot" 
              className="h-20 w-auto opacity-70"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIiBmaWxsPSJub25lIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIzNiIgZmlsbD0iI2ZhZDVlNSIvPjxjaXJjbGUgY3g9IjI2IiBjeT0iMzAiIHI9IjQiIGZpbGw9IiMzMzMiLz48Y2lyY2xlIGN4PSI1NCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjMzMzIi8+PGNpcmNsZSBjeD0iMjgiIGN5PSIyOCIgcj0iMiIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSI1NiIgY3k9IjI4IiByPSIyIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0zMiA0NUg0OEMzNiA1OCAzMiA0NSAzMiA0NVoiIGZpbGw9IiNlMTNjNzMiLz48L3N2Zz4=";
              }}
            />
          </motion.div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
