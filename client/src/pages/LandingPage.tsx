import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { 
  Zap, 
  Sparkles, 
  Star, 
  ArrowRight, 
  Play, 
  Users, 
  Target, 
  TrendingUp,
  CheckCircle,
  ArrowUpRight,
  Menu,
  X,
  Check,
  Crown,
  Rocket,
  Building2,
  Mail
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const { isAuthenticated } = useAuthStore();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Tasks that feel alive with real-time collaboration and instant updates",
      color: "from-aurora-green to-aurora-blue"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI-Powered",
      description: "Intelligent suggestions and automation that adapt to your workflow",
      color: "from-aurora-purple to-aurora-pink"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Beautiful Design",
      description: "Neo-brutalism meets glassmorphism for an unforgettable experience",
      color: "from-aurora-yellow to-aurora-green"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "50K+", label: "Tasks Completed", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Target className="w-6 h-6" /> },
    { number: "500%", label: "Productivity Boost", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl"
        style={{ y, opacity }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Revolution</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <Link to="/auth" className="neo-button px-6 py-2 rounded-lg">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
                <Link to="/auth" className="neo-button px-6 py-2 rounded-lg text-center">
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-aurora-green/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-radial from-aurora-purple/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-radial from-aurora-pink/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="gradient-text">Revolution</span>
            <br />
            <span className="text-white">Project Management</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Where tasks feel alive - cards that pulse with urgency, timelines that flow like rivers, 
            and team collaboration spaces that feel like digital campfires.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/auth" className="neo-button px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 group">
              Start Your Symphony
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="glass px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:bg-glass-accent transition-colors">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="glass rounded-xl p-4 text-center"
              >
                <div className="flex justify-center mb-2 text-aurora-green">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of project management with cutting-edge design and intelligent automation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Choose Your Revolution
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From startups to enterprises, we have the perfect plan to accelerate your team's productivity
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 border border-glass-secondary"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-aurora-blue to-aurora-green rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
                <p className="text-gray-400 mb-4">Perfect for small teams</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold gradient-text">$30</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Up to 5 team members</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">10 projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Email support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">1GB storage</span>
                </li>
              </ul>
              
              <Link 
                to={isAuthenticated ? "/pricing" : "/auth"} 
                className="w-full glass hover:bg-glass-accent text-white py-3 px-6 rounded-xl transition-colors text-center block"
              >
                {isAuthenticated ? "View Plans" : "Get Started"}
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 border-2 border-aurora-green relative"
            >
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-aurora-green to-aurora-blue text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-aurora-green to-aurora-purple rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-gray-400 mb-4">For growing businesses</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold gradient-text">$50</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Up to 25 team members</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Unlimited projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">10GB storage</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">AI-powered insights</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Custom workflows</span>
                </li>
              </ul>
              
              <Link 
                to={isAuthenticated ? "/pricing" : "/auth"} 
                className="w-full neo-button bg-aurora-green text-black py-3 px-6 rounded-xl transition-colors text-center block font-semibold"
              >
                {isAuthenticated ? "Upgrade to Pro" : "Start Pro Trial"}
              </Link>
            </motion.div>

            {/* Advanced Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 border border-glass-secondary"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-aurora-purple to-aurora-pink rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Advanced</h3>
                <p className="text-gray-400 mb-4">For large organizations</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold gradient-text">$100</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Up to 100 team members</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Unlimited everything</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Real-time analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">24/7 phone support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">100GB storage</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Advanced AI features</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">API access</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Custom integrations</span>
                </li>
              </ul>
              
              <Link 
                to={isAuthenticated ? "/pricing" : "/auth"} 
                className="w-full glass hover:bg-glass-accent text-white py-3 px-6 rounded-xl transition-colors text-center block"
              >
                {isAuthenticated ? "Upgrade to Advanced" : "Choose Advanced"}
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 border border-glass-secondary"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-aurora-yellow to-aurora-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <p className="text-gray-400 mb-4">For enterprise solutions</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold gradient-text">Custom</span>
                  <span className="text-gray-400 ml-2">pricing</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Unlimited team members</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">White-label solution</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Custom analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Dedicated support team</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Unlimited storage</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">On-premise deployment</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">Custom development</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-aurora-green mr-3" />
                  <span className="text-gray-300">SLA guarantee</span>
                </li>
              </ul>
              
              <a 
                href="mailto:support@revolution.com" 
                className="w-full glass hover:bg-glass-accent text-white py-3 px-6 rounded-xl transition-colors text-center block flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact Sales
              </a>
            </motion.div>
          </div>

          {/* Pricing Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">All Plans Include</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center gap-3">
                  <Check className="w-5 h-5 text-aurora-green" />
                  <span className="text-gray-300">14-day free trial</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Check className="w-5 h-5 text-aurora-green" />
                  <span className="text-gray-300">No setup fees</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Check className="w-5 h-5 text-aurora-green" />
                  <span className="text-gray-300">Cancel anytime</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Check className="w-5 h-5 text-aurora-green" />
                  <span className="text-gray-300">SSL encryption</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Check className="w-5 h-5 text-aurora-green" />
                  <span className="text-gray-300">Regular backups</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Check className="w-5 h-5 text-aurora-green" />
                  <span className="text-gray-300">99.9% uptime SLA</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Ready to Conduct Your Digital Symphony?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of teams who have revolutionized their workflow with our platform.
            </p>
            <Link to="/auth" className="neo-button px-8 py-4 rounded-xl text-lg inline-flex items-center gap-2 group">
              Start Free Trial
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-glass-primary">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Revolution</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="mailto:support@revolution.com" className="hover:text-white transition-colors">Support</a>
              <a href="mailto:contact@revolution.com" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-glass-primary text-center text-sm text-gray-500">
            <p>&copy; 2024 Revolution. All rights reserved. Made with ❤️ for the future of work.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 