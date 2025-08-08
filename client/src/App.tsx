import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingScreen from './components/LoadingScreen';
import ErrorFallback from './components/ErrorFallback';
import BackgroundParticles from './components/BackgroundParticles';
import AuroraBackground from './components/AuroraBackground';
import { useAuthStore } from './stores/authStore';

// Lazy load components for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Team = lazy(() => import('./pages/Team'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Documents = lazy(() => import('./pages/Documents'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Settings = lazy(() => import('./pages/Settings'));
const Auth = lazy(() => import('./pages/Auth'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen bg-black relative overflow-hidden">
              {/* Revolutionary Background Effects */}
              <AuroraBackground />
              <BackgroundParticles />
              
              {/* Main Content */}
              <div className="relative z-10">
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<Auth />} />
                    
                    {/* Protected Routes */}
                    {isAuthenticated ? (
                      <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/documents" element={<Documents />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/settings" element={<Settings />} />
                      </>
                    ) : (
                      <Route path="*" element={<Auth />} />
                    )}
                  </Routes>
                </Suspense>
              </div>
              
              {/* Revolutionary Toast Notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#ffffff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#ffffff',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App; 