import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuthStore } from '../stores/authStore';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const navigate = useNavigate();
  const { login, register, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('Welcome back! 🎉');
      } else {
        await register(formData.email, formData.password, formData.name);
        toast.success('Account created successfully! 🚀');
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black px-6">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-aurora-green/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-aurora-purple/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-aurora-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-text">Revolution</span>
          </Link>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl font-bold text-white mb-2"
            >
              {isLogin ? 'Welcome Back' : 'Join the Revolution'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-400"
            >
              {isLogin ? 'Sign in to continue your journey' : 'Create your account and start building'}
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-3 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-aurora-green bg-glass-dark border-glass-secondary rounded focus:ring-aurora-green focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-aurora-green hover:text-aurora-blue transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full neo-button py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-glass-secondary" />
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-glass-secondary" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full glass py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-glass-accent transition-colors">
              <div className="w-5 h-5 bg-white rounded-full" />
              Continue with Google
            </button>
            <button className="w-full glass py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-glass-accent transition-colors">
              <div className="w-5 h-5 bg-blue-600 rounded-full" />
              Continue with GitHub
            </button>
          </div>

          {/* Toggle Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ email: '', password: '', name: '' });
                  clearError();
                }}
                className="ml-2 text-aurora-green hover:text-aurora-blue transition-colors font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Why choose Revolution?</h3>
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-aurora-green" />
                Real-time collaboration
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-aurora-green" />
                AI-powered insights
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-aurora-green" />
                Beautiful, intuitive design
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6 text-aurora-purple" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-4 h-4 text-aurora-green" />
        </motion.div>
      </div>
    </div>
  );
};

export default Auth; 