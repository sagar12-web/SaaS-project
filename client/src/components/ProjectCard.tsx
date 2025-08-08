import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  MoreHorizontal,
  ArrowRight,
  Star,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

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

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-aurora-green to-aurora-blue';
    if (progress >= 50) return 'from-aurora-yellow to-aurora-green';
    return 'from-aurora-pink to-aurora-purple';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass rounded-xl p-4 cursor-pointer group relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-gray-100 transition-colors">
              {project.name}
            </h3>
            <p className="text-gray-300 text-sm line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 rounded-lg hover:bg-glass-accent transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Progress</span>
            <span className="text-sm text-gray-400">{project.progress}%</span>
          </div>
          <div className="w-full bg-glass-dark rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${getProgressColor(project.progress)} rounded-full`}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold text-white">{project.tasks}</div>
            <div className="text-xs text-gray-400">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-aurora-green">{project.completed}</div>
            <div className="text-xs text-gray-400">Completed</div>
          </div>
        </div>

        {/* Team and Due Date */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(project.dueDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>12</span>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {project.team.slice(0, 3).map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="w-8 h-8 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-full flex items-center justify-center border-2 border-black"
                >
                  <span className="text-white text-xs font-bold">
                    {member.split(' ').map(n => n[0]).join('')}
                  </span>
                </motion.div>
              ))}
              {project.team.length > 3 && (
                <div className="w-8 h-8 bg-glass-dark rounded-full flex items-center justify-center border-2 border-black">
                  <span className="text-white text-xs font-bold">
                    +{project.team.length - 3}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-400">
              {project.team.length} members
            </span>
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

      {/* Status Badge */}
      <div className="absolute top-3 right-3">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          project.progress >= 80 
            ? 'bg-aurora-green/20 text-aurora-green' 
            : project.progress >= 50 
            ? 'bg-aurora-yellow/20 text-aurora-yellow'
            : 'bg-aurora-pink/20 text-aurora-pink'
        }`}>
          {project.progress >= 80 ? 'On Track' : project.progress >= 50 ? 'In Progress' : 'Getting Started'}
        </div>
      </div>

      {/* Hover Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-r from-aurora-green/5 to-aurora-blue/5 rounded-xl"
      />

      {/* Floating Elements */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-2 right-2"
        >
          <TrendingUp className="w-4 h-4 text-aurora-green" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectCard; 