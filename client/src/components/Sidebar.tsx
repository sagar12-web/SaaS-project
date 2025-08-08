import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Settings, 
  Zap,
  Sparkles,
  Star,
  Target,
  MessageCircle,
  Calendar,
  FileText,
  HelpCircle,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard',
      color: 'from-aurora-green to-aurora-blue'
    },
    {
      name: 'Projects',
      icon: <FolderOpen className="w-5 h-5" />,
      path: '/projects',
      color: 'from-aurora-purple to-aurora-pink'
    },
    {
      name: 'Tasks',
      icon: <CheckSquare className="w-5 h-5" />,
      path: '/tasks',
      color: 'from-aurora-yellow to-aurora-green'
    },
    {
      name: 'Team',
      icon: <Users className="w-5 h-5" />,
      path: '/team',
      color: 'from-aurora-blue to-aurora-purple'
    },
    {
      name: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/analytics',
      color: 'from-aurora-pink to-aurora-yellow'
    },
    {
      name: 'Calendar',
      icon: <Calendar className="w-5 h-5" />,
      path: '/calendar',
      color: 'from-aurora-green to-aurora-purple'
    },
    {
      name: 'Documents',
      icon: <FileText className="w-5 h-5" />,
      path: '/documents',
      color: 'from-aurora-blue to-aurora-green'
    }
  ];

  const secondaryItems = [
    {
      name: 'Pricing',
      icon: <CreditCard className="w-5 h-5" />,
      path: '/pricing'
    },
    {
      name: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/settings'
    },
    {
      name: 'Help',
      icon: <HelpCircle className="w-5 h-5" />,
      path: '/help'
    }
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full w-80 glass backdrop-blur-xl border-r border-glass-secondary z-40"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-glass-secondary">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Revolution</h1>
              <p className="text-xs text-gray-400">Project Management</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Main Navigation
            </h3>
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive 
                          ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg' 
                          : 'text-gray-300 hover:text-white hover:bg-glass-accent'
                      }`}
                    >
                      <div className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-1 h-6 bg-white rounded-full ml-auto"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-glass-accent transition-all duration-200 group"
              >
                <Sparkles className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="font-medium">AI Assistant</span>
              </motion.button>
              
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-glass-accent transition-all duration-200 group"
              >
                <Target className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="font-medium">Quick Task</span>
              </motion.button>
              
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-glass-accent transition-all duration-200 group"
              >
                <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="font-medium">Team Chat</span>
              </motion.button>
            </div>
          </div>

          {/* Secondary Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              System
            </h3>
            <div className="space-y-1">
              {secondaryItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-glass-accent transition-all duration-200 group"
                  >
                    <div className="text-gray-400 group-hover:text-white">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-6 border-t border-glass-secondary">
          {/* Pro Badge */}
          <div className="glass rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-aurora-yellow to-aurora-pink rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Pro Plan</h4>
                <p className="text-xs text-gray-400">Unlimited features</p>
              </div>
            </div>
            <div className="w-full bg-glass-dark rounded-full h-2">
              <div className="bg-gradient-to-r from-aurora-yellow to-aurora-pink h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">75% of monthly usage</p>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">User Name</p>
              <p className="text-xs text-gray-400">user@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </motion.aside>
  );
};

export default Sidebar; 