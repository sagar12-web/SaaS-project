import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  User, 
  Tag, 
  MoreHorizontal, 
  CheckCircle, 
  AlertCircle, 
  Star,
  MessageCircle,
  Calendar,
  ArrowRight
} from 'lucide-react';

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

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'from-gray-500 to-gray-600';
      case 'in-progress':
        return 'from-aurora-blue to-aurora-purple';
      case 'done':
        return 'from-aurora-green to-aurora-blue';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Star className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="neo-card rounded-xl p-6 cursor-pointer group relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getStatusColor(task.status)} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-black group-hover:text-gray-800 transition-colors">
                {task.title}
              </h3>
              <div className={`${getPriorityColor(task.priority)}`}>
                {getPriorityIcon(task.priority)}
              </div>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">
              {task.description}
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${task.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${getStatusColor(task.status)} rounded-full`}
            />
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{task.assignee}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>3</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </motion.div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getStatusColor(task.status)}`} />
      </div>

      {/* Hover Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-r from-aurora-green/5 to-aurora-blue/5 rounded-xl"
      />
    </motion.div>
  );
};

export default TaskCard; 