import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Aurora Background */}
      <div className="absolute inset-0 aurora-bg opacity-20" />
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-8 backdrop-blur-xl"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Error Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl font-bold gradient-text-creativity mb-4"
          >
            Oops! Something went wrong
          </motion.h1>

          {/* Error Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-300 mb-6"
          >
            Don't worry, even the best symphonies have unexpected notes. 
            We're working to fix this and get you back to creating amazing things.
          </motion.p>

          {/* Error Details */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-6"
          >
            <details className="text-left">
              <summary className="cursor-pointer text-sm text-gray-400 hover:text-white transition-colors mb-2">
                <Bug className="inline w-4 h-4 mr-2" />
                Technical Details
              </summary>
              <div className="glass-dark rounded-lg p-4 text-xs font-mono text-gray-300 overflow-auto max-h-32">
                <div className="mb-2">
                  <strong>Error:</strong> {error.name}
                </div>
                <div className="mb-2">
                  <strong>Message:</strong> {error.message}
                </div>
                {error.stack && (
                  <div>
                    <strong>Stack:</strong>
                    <pre className="mt-2 text-xs overflow-auto">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={resetErrorBoundary}
              className="neo-button px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="glass px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-glass-accent transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Home
            </button>
          </motion.div>

          {/* Helpful Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 text-sm text-gray-400"
          >
            <p className="mb-2">If this keeps happening, try:</p>
            <ul className="text-left space-y-1">
              <li>• Refreshing the page</li>
              <li>• Clearing your browser cache</li>
              <li>• Checking your internet connection</li>
              <li>• Contacting support if the issue persists</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-aurora-green rounded-full"
            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-aurora-blue rounded-full"
            animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-aurora-purple rounded-full"
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback; 