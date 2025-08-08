import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  Users,
  Calendar,
  Target
} from 'lucide-react';

import TaskCard from '../components/TaskCard';
import DashboardLayout from '../components/DashboardLayout';

// Define the Task interface to match TaskCard
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

const Tasks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Design System Implementation',
      description: 'Create and implement a comprehensive design system for the new product',
      status: 'in-progress' as const,
      priority: 'high' as const,
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
      status: 'todo' as const,
      priority: 'medium' as const,
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
      status: 'done' as const,
      priority: 'low' as const,
      assignee: 'Emma Wilson',
      dueDate: '2024-02-10',
      project: 'Mobile App',
      tags: ['Testing', 'UX'],
      progress: 100
    },
    {
      id: '4',
      title: 'Database Optimization',
      description: 'Optimize database queries and improve performance',
      status: 'todo' as const,
      priority: 'high' as const,
      assignee: 'David Park',
      dueDate: '2024-02-25',
      project: 'Backend Infrastructure',
      tags: ['Database', 'Performance'],
      progress: 0
    },
    {
      id: '5',
      title: 'Mobile App Testing',
      description: 'Comprehensive testing of mobile app on different devices',
      status: 'in-progress' as const,
      priority: 'medium' as const,
      assignee: 'Alex Kim',
      dueDate: '2024-02-18',
      project: 'Mobile App',
      tags: ['Testing', 'Mobile'],
      progress: 45
    }
  ];

  const stats = [
    { label: 'Total Tasks', value: '24', icon: <Target className="w-6 h-6" />, color: 'text-aurora-blue' },
    { label: 'In Progress', value: '8', icon: <Clock className="w-6 h-6" />, color: 'text-aurora-yellow' },
    { label: 'Completed', value: '12', icon: <CheckCircle className="w-6 h-6" />, color: 'text-aurora-green' },
    { label: 'Overdue', value: '2', icon: <AlertCircle className="w-6 h-6" />, color: 'text-aurora-pink' }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const groupedTasks = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    done: filteredTasks.filter(task => task.status === 'done')
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
              <h1 className="text-3xl font-bold gradient-text mb-2">Tasks</h1>
              <p className="text-gray-300">Manage your tasks and track progress</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neo-button px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Task</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
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
                <Target className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors w-64"
                />
              </div>
              
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
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                {filteredTasks.length} tasks found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Kanban Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* To Do Column */}
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">To Do</h3>
                <span className="text-sm text-gray-400">{groupedTasks.todo.length}</span>
              </div>
              <div className="space-y-3">
                {groupedTasks.todo.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <TaskCard task={task} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">In Progress</h3>
                <span className="text-sm text-gray-400">{groupedTasks['in-progress'].length}</span>
              </div>
              <div className="space-y-3">
                {groupedTasks['in-progress'].map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <TaskCard task={task} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Done Column */}
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Done</h3>
                <span className="text-sm text-gray-400">{groupedTasks.done.length}</span>
              </div>
              <div className="space-y-3">
                {groupedTasks.done.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <TaskCard task={task} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Tasks; 