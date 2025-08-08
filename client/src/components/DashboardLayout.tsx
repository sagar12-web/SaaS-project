import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  LogOut
} from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuthStore } from '../stores/authStore';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    toast.success('See you soon! 👋');
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-80 ml-0' : 'ml-0'
      }`}>
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass backdrop-blur-xl border-b border-glass-secondary p-4 sticky top-0 z-30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg glass hover:bg-glass-accent transition-colors"
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-white rounded"></div>
                  <div className="w-full h-0.5 bg-white rounded"></div>
                  <div className="w-full h-0.5 bg-white rounded"></div>
                </div>
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks, projects, or people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors w-80"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg glass hover:bg-glass-accent transition-colors">
                <Bell className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-aurora-pink rounded-full"></div>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{user?.name?.charAt(0)}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg glass hover:bg-glass-accent transition-colors"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 