import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardDocumentIcon, ShareIcon, ArrowDownTrayIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
interface SummaryResultProps {
  summary: string;
  format: 'bullets' | 'paragraph';
  videoTitle?: string;
  videoUrl?: string;
}
const SummaryResult: React.FC<SummaryResultProps> = ({ 
  summary, 
  format, 
  videoTitle = "YouTube Video", 
  videoUrl = ""
}) => {
  const [copied, setCopied] = useState(false);
  const isError = summary.includes("Could not generate summary");
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  const handleDownload = () => {
    const element = document.createElement('a');
    const fileType = 'text/plain';
    const blob = new Blob([`Summary of: ${videoTitle}\n\n${summary}`], { type: fileType });
    element.href = URL.createObjectURL(blob);
    element.download = `${videoTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_summary.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const renderBulletPoints = () => {
    if (format !== 'bullets' || isError) return null;
    const points = summary.split(/\n|•/).filter(point => point.trim().length > 0);
    return (
      <ul className="list-disc pl-5 space-y-2">
        {points.map((point, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {point.trim()}
          </motion.li>
        ))}
      </ul>
    );
  };
  const renderParagraph = () => {
    if (format !== 'paragraph' || isError) return null;
    return (
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="leading-relaxed"
      >
        {summary}
      </motion.p>
    );
  };
  const renderErrorMessage = () => {
    if (!isError) return null;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800"
      >
        <div className="flex items-start">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-red-800 dark:text-red-400">Error</h4>
            <p className="text-red-700 dark:text-red-300 mt-1">{summary}</p>
            <p className="text-red-600 dark:text-red-400 mt-3 text-sm">
              Please try another YouTube video with available captions. Not all videos have transcripts available.
            </p>
          </div>
        </div>
      </motion.div>
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mt-8"
    >
      <div className="card">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold font-display text-primary-700 dark:text-primary-300">
            {isError ? "Error" : "Summary"}
          </h3>
          {!isError && (
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="p-2 rounded-lg bg-pastel-lavender bg-opacity-50 hover:bg-opacity-70 transition-all"
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <ClipboardDocumentIcon className="h-5 w-5 text-primary-500" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="p-2 rounded-lg bg-pastel-mint bg-opacity-50 hover:bg-opacity-70 transition-all"
                aria-label="Download summary"
              >
                <ArrowDownTrayIcon className="h-5 w-5 text-primary-500" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-pastel-blue bg-opacity-50 hover:bg-opacity-70 transition-all"
                aria-label="Share summary"
              >
                <ShareIcon className="h-5 w-5 text-primary-500" />
              </motion.button>
            </div>
          )}
        </div>
        {videoTitle && !isError && (
          <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
            <h4 className="text-sm text-gray-500 dark:text-gray-400">Source:</h4>
            <a 
              href={videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              {videoTitle}
            </a>
          </div>
        )}
        <div className="prose dark:prose-invert prose-sm sm:prose-base">
          {isError ? renderErrorMessage() : (
            format === 'bullets' ? renderBulletPoints() : renderParagraph()
          )}
        </div>
      </div>
    </motion.div>
  );
};
export default SummaryResult; 