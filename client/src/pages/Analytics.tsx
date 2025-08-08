import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Clock, 
  Calendar, 
  Filter,
  Download,
  RefreshCw,
  Eye,
  Zap,
  Star,
  Activity
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('productivity');

  const stats = [
    { 
      label: 'Total Productivity', 
      value: '94%', 
      change: '+12%', 
      trend: 'up', 
      icon: <TrendingUp className="w-6 h-6" />, 
      color: 'text-aurora-green',
      description: 'vs last month'
    },
    { 
      label: 'Tasks Completed', 
      value: '1,247', 
      change: '+18%', 
      trend: 'up', 
      icon: <Target className="w-6 h-6" />, 
      color: 'text-aurora-blue',
      description: 'this month'
    },
    { 
      label: 'Team Efficiency', 
      value: '87%', 
      change: '+5%', 
      trend: 'up', 
      icon: <Users className="w-6 h-6" />, 
      color: 'text-aurora-purple',
      description: 'average score'
    },
    { 
      label: 'Project Velocity', 
      value: '2.4x', 
      change: '-3%', 
      trend: 'down', 
      icon: <Activity className="w-6 h-6" />, 
      color: 'text-aurora-pink',
      description: 'stories/sprint'
    }
  ];

  const chartData = [
    { period: 'Mon', productivity: 85, tasks: 12, team: 8 },
    { period: 'Tue', productivity: 92, tasks: 18, team: 10 },
    { period: 'Wed', productivity: 78, tasks: 15, team: 9 },
    { period: 'Thu', productivity: 96, tasks: 22, team: 12 },
    { period: 'Fri', productivity: 89, tasks: 19, team: 11 },
    { period: 'Sat', productivity: 65, tasks: 8, team: 5 },
    { period: 'Sun', productivity: 45, tasks: 4, team: 3 }
  ];

  const projectStats = [
    { name: 'Product Redesign', progress: 78, tasks: 24, members: 6, status: 'on-track' },
    { name: 'Mobile App', progress: 92, tasks: 18, members: 4, status: 'ahead' },
    { name: 'API Integration', progress: 45, tasks: 32, members: 8, status: 'behind' },
    { name: 'User Research', progress: 100, tasks: 12, members: 3, status: 'completed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'text-aurora-blue';
      case 'ahead':
        return 'text-aurora-green';
      case 'behind':
        return 'text-aurora-pink';
      case 'completed':
        return 'text-aurora-purple';
      default:
        return 'text-gray-400';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'from-aurora-green to-aurora-blue';
    if (progress >= 70) return 'from-aurora-blue to-aurora-purple';
    if (progress >= 50) return 'from-aurora-yellow to-aurora-green';
    return 'from-aurora-pink to-aurora-purple';
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Analytics</h1>
              <p className="text-gray-300">Track performance and insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-glass-dark border border-glass-secondary rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-aurora-green"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass p-3 rounded-lg hover:bg-glass-accent transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neo-button px-6 py-3 rounded-xl flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Export</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-aurora-green' : 'text-aurora-pink'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="bg-glass-dark border border-glass-secondary rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-aurora-green"
              >
                <option value="productivity">Productivity</option>
                <option value="tasks">Tasks</option>
                <option value="team">Team Activity</option>
              </select>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="space-y-4">
              {chartData.map((data, index) => (
                <motion.div
                  key={data.period}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 text-sm text-gray-400">{data.period}</div>
                  <div className="flex-1 relative">
                    <div className="w-full bg-glass-dark rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${selectedMetric === 'productivity' 
                            ? data.productivity 
                            : selectedMetric === 'tasks' 
                            ? Math.min(data.tasks * 4, 100)
                            : data.team * 8}%` 
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-gradient-to-r from-aurora-green to-aurora-blue h-3 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="w-12 text-sm text-white text-right">
                    {selectedMetric === 'productivity' 
                      ? `${data.productivity}%`
                      : selectedMetric === 'tasks' 
                      ? data.tasks
                      : data.team}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Project Performance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Project Status</h3>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {projectStats.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="glass rounded-lg p-4 border border-glass-secondary"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-white">{project.name}</h4>
                    <span className={`text-xs ${getStatusColor(project.status)} font-medium`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-glass-dark rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(project.progress)}`}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{project.tasks} tasks</span>
                    <span>{project.members} members</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Time Tracking */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Time Tracking</h3>
                <p className="text-sm text-gray-400">Weekly overview</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Total Hours</span>
                <span className="text-lg font-bold text-white">168h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Productive Hours</span>
                <span className="text-lg font-bold text-aurora-green">142h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Break Time</span>
                <span className="text-lg font-bold text-aurora-yellow">26h</span>
              </div>
            </div>
          </div>

          {/* Team Performance */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-aurora-purple to-aurora-pink rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Team Metrics</h3>
                <p className="text-sm text-gray-400">Current sprint</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Active Members</span>
                <span className="text-lg font-bold text-white">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Avg. Rating</span>
                <span className="text-lg font-bold text-aurora-yellow">4.8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Collaboration</span>
                <span className="text-lg font-bold text-aurora-green">95%</span>
              </div>
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-aurora-yellow to-aurora-green rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Quality Score</h3>
                <p className="text-sm text-gray-400">Code & design</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Code Quality</span>
                <span className="text-lg font-bold text-white">A+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Bug Rate</span>
                <span className="text-lg font-bold text-aurora-green">0.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Test Coverage</span>
                <span className="text-lg font-bold text-aurora-blue">94%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics; 