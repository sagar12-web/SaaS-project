import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  TrendingUp, 
  Users, 
  CheckCircle,
  Target,
  Star,
  Sparkles,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

import TaskCard from '../components/TaskCard';
import ProjectCard from '../components/ProjectCard';
import ActivityFeed from '../components/ActivityFeed';
import AIInsights from '../components/AIInsights';
import DashboardLayout from '../components/DashboardLayout';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  project: string;
  tags: string[];
  progress: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  tasks: number;
  completed: number;
  dueDate: string;
  team: string[];
  color: string;
}

const Dashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Design System Implementation',
      description: 'Create and implement a comprehensive design system for the new product',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Sarah Chen',
      dueDate: '2024-02-15',
      project: 'Product Redesign',
      tags: ['Design', 'UI/UX'],
      progress: 75
    },
    {
      id: '2',
      title: 'API Integration',
      description: 'Integrate third-party APIs for payment processing',
      status: 'todo',
      priority: 'medium',
      assignee: 'Mike Johnson',
      dueDate: '2024-02-20',
      project: 'E-commerce Platform',
      tags: ['Backend', 'API'],
      progress: 0
    },
    {
      id: '3',
      title: 'User Testing',
      description: 'Conduct user testing sessions for the new mobile app',
      status: 'done',
      priority: 'low',
      assignee: 'Emma Wilson',
      dueDate: '2024-02-10',
      project: 'Mobile App',
      tags: ['Testing', 'UX'],
      progress: 100
    }
  ];

  const projects: Project[] = [
    {
      id: '1',
      name: 'Product Redesign',
      description: 'Complete overhaul of the main product interface',
      progress: 100,
      tasks: 12,
      completed: 8,
      dueDate: '2024-03-01',
      team: ['Sarah Chen', 'Alex Kim', 'David Park'],
      color: 'from-aurora-green to-aurora-blue'
    },
    {
      id: '2',
      name: 'E-commerce Platform',
      description: 'Build a new e-commerce platform from scratch',
      progress: 35,
      tasks: 24,
      completed: 8,
      dueDate: '2024-04-15',
      team: ['Mike Johnson', 'Lisa Wang', 'Tom Brown'],
      color: 'from-aurora-purple to-aurora-pink'
    },
    {
      id: '3',
      name: 'Mobile App',
      description: 'Develop a companion mobile app',
      progress: 85,
      tasks: 18,
      completed: 15,
      dueDate: '2024-02-28',
      team: ['Emma Wilson', 'Chris Lee', 'Anna Garcia'],
      color: 'from-aurora-yellow to-aurora-green'
    }
  ];

  const stats = [
    { label: 'Tasks Completed', value: '42', icon: <CheckCircle className="w-6 h-6" />, color: 'text-aurora-green' },
    { label: 'Active Projects', value: '8', icon: <Target className="w-6 h-6" />, color: 'text-aurora-blue' },
    { label: 'Team Members', value: '12', icon: <Users className="w-6 h-6" />, color: 'text-aurora-purple' },
    { label: 'Productivity Score', value: '94%', icon: <TrendingUp className="w-6 h-6" />, color: 'text-aurora-pink' }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    return matchesFilter;
  });

    return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold gradient-text mb-2">
                    Welcome back! 🎉
                  </h1>
                  <p className="text-gray-300">
                    Ready to conduct your digital symphony? Here's what's happening today.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-aurora-yellow" />
                  <span className="text-sm text-gray-400">7-day streak!</span>
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
                  className="glass rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color}`}>
                      {stat.icon}
                    </div>
                    <Activity className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tasks Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Tasks Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Your Tasks</h2>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="bg-glass-dark border border-glass-secondary rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-aurora-green"
                    >
                      <option value="all">All Tasks</option>
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <button className="neo-button px-4 py-2 rounded-lg flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      New Task
                    </button>
                  </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-4">
                  <AnimatePresence>
                    {filteredTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <TaskCard task={task} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Sidebar Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                {/* AI Insights */}
                <AIInsights />

                {/* Projects */}
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Active Projects</h3>
                    <Link to="/projects" className="text-aurora-green hover:text-aurora-blue transition-colors text-sm">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Activity Feed */}
                <ActivityFeed />
              </motion.div>
            </div>
          </div>
    </DashboardLayout>
  );
};

export default Dashboard; 