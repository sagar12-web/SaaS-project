import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  CheckCircle, 
  Plus, 
  Edit, 
  User, 
  Clock, 
  MoreHorizontal,
  Heart,
  Reply,
  Share,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';

const ActivityFeed: React.FC = () => {
  const [likedActivities, setLikedActivities] = useState<Set<string>>(new Set());

  const activities = [
    {
      id: '1',
      type: 'task_completed',
      user: 'Sarah Chen',
      action: 'completed the task',
      target: 'Design System Implementation',
      time: '2 minutes ago',
      avatar: 'SC',
      color: 'from-aurora-green to-aurora-blue',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: '2',
      type: 'comment',
      user: 'Mike Johnson',
      action: 'commented on',
      target: 'API Integration task',
      time: '5 minutes ago',
      avatar: 'MJ',
      color: 'from-aurora-purple to-aurora-pink',
      icon: <MessageCircle className="w-4 h-4" />
    },
    {
      id: '3',
      type: 'task_created',
      user: 'Emma Wilson',
      action: 'created a new task',
      target: 'User Testing Session',
      time: '10 minutes ago',
      avatar: 'EW',
      color: 'from-aurora-yellow to-aurora-green',
      icon: <Plus className="w-4 h-4" />
    },
    {
      id: '4',
      type: 'project_updated',
      user: 'Alex Kim',
      action: 'updated the project',
      target: 'Mobile App Development',
      time: '15 minutes ago',
      avatar: 'AK',
      color: 'from-aurora-blue to-aurora-purple',
      icon: <Edit className="w-4 h-4" />
    },
    {
      id: '5',
      type: 'milestone',
      user: 'David Park',
      action: 'reached a milestone in',
      target: 'E-commerce Platform',
      time: '1 hour ago',
      avatar: 'DP',
      color: 'from-aurora-pink to-aurora-yellow',
      icon: <Star className="w-4 h-4" />
    }
  ];

  const handleLike = (activityId: string) => {
    const newLiked = new Set(likedActivities);
    if (newLiked.has(activityId)) {
      newLiked.delete(activityId);
    } else {
      newLiked.add(activityId);
    }
    setLikedActivities(newLiked);
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'task_completed':
        return 'text-aurora-green';
      case 'comment':
        return 'text-aurora-blue';
      case 'task_created':
        return 'text-aurora-yellow';
      case 'project_updated':
        return 'text-aurora-purple';
      case 'milestone':
        return 'text-aurora-pink';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Activity Feed</h3>
            <p className="text-sm text-gray-400">Real-time updates</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg glass hover:bg-glass-accent transition-colors"
        >
          <Sparkles className="w-4 h-4 text-aurora-green" />
        </motion.button>
      </div>

      {/* Activities */}
      <div className="space-y-4">
        <AnimatePresence>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass rounded-lg p-4 border border-glass-secondary hover:border-glass-accent transition-colors group"
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className={`w-10 h-10 bg-gradient-to-r ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-bold">{activity.avatar}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        <span className="font-semibold">{activity.user}</span>
                        <span className="text-gray-400"> {activity.action} </span>
                        <span className="font-medium text-aurora-green">{activity.target}</span>
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{activity.time}</span>
                        </div>
                        <div className={`flex items-center space-x-1 text-xs ${getActivityColor(activity.type)}`}>
                          {activity.icon}
                          <span className="capitalize">{activity.type.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(activity.id)}
                        className={`p-1 rounded transition-colors ${
                          likedActivities.has(activity.id) 
                            ? 'text-aurora-pink' 
                            : 'text-gray-400 hover:text-aurora-pink'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${likedActivities.has(activity.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded text-gray-400 hover:text-aurora-blue transition-colors"
                      >
                        <Reply className="w-3 h-3" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded text-gray-400 hover:text-aurora-green transition-colors"
                      >
                        <Share className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Comments (for comment type) */}
                  {activity.type === 'comment' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 p-3 bg-glass-dark rounded-lg border border-glass-secondary"
                    >
                      <p className="text-sm text-gray-300">
                        "Great progress on the API integration! The authentication flow looks solid. 
                        Should we schedule a review meeting for tomorrow?"
                      </p>
                    </motion.div>
                  )}

                  {/* Progress (for milestone type) */}
                  {activity.type === 'milestone' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Project Progress</span>
                        <span className="text-xs text-aurora-green font-semibold">85% Complete</span>
                      </div>
                      <div className="w-full bg-glass-dark rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-gradient-to-r from-aurora-green to-aurora-blue h-2 rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-6 text-center"
      >
        <button className="text-sm text-aurora-green hover:text-aurora-blue transition-colors">
          Load more activities
        </button>
      </motion.div>

      {/* Live Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="mt-4 flex items-center justify-center space-x-2"
      >
        <div className="w-2 h-2 bg-aurora-green rounded-full animate-pulse" />
        <span className="text-xs text-gray-400">Live updates enabled</span>
      </motion.div>
    </motion.div>
  );
};

export default ActivityFeed; 