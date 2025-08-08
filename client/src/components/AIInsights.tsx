import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Target,
  Zap,
  ArrowRight,
  Lightbulb,
  BarChart3,
  Users
} from 'lucide-react';

const AIInsights: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const insights = [
    {
      type: 'productivity',
      title: 'Peak Performance Time',
      description: 'You\'re most productive between 9-11 AM. Schedule important tasks during this window.',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-aurora-green to-aurora-blue',
      priority: 'high'
    },
    {
      type: 'collaboration',
      title: 'Team Sync Opportunity',
      description: 'Sarah and Mike are both working on related tasks. Consider a quick sync meeting.',
      icon: <Users className="w-5 h-5" />,
      color: 'from-aurora-purple to-aurora-pink',
      priority: 'medium'
    },
    {
      type: 'deadline',
      title: 'Upcoming Deadline',
      description: 'Design System project is due in 3 days. Current progress: 75%',
      icon: <Clock className="w-5 h-5" />,
      color: 'from-aurora-yellow to-aurora-green',
      priority: 'high'
    },
    {
      type: 'optimization',
      title: 'Workflow Optimization',
      description: 'You can save 2 hours/week by automating task status updates.',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-aurora-pink to-aurora-purple',
      priority: 'medium'
    }
  ];

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
        return <Target className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-xl p-6 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-aurora-green/5 to-aurora-blue/5" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-radial from-aurora-purple/20 to-transparent rounded-full blur-xl" />
      
      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Insights</h3>
              <p className="text-sm text-gray-400">Powered by Revolution AI</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg glass hover:bg-glass-accent transition-colors"
          >
            <Sparkles className="w-4 h-4 text-aurora-green" />
          </motion.button>
        </div>

        {/* Main Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-4"
        >
          <div className="glass rounded-lg p-4 border border-glass-secondary">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 bg-gradient-to-r ${insights[0].color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {insights[0].icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-semibold text-white">{insights[0].title}</h4>
                  <div className={getPriorityColor(insights[0].priority)}>
                    {getPriorityIcon(insights[0].priority)}
                  </div>
                </div>
                <p className="text-xs text-gray-300 mb-2">{insights[0].description}</p>
                <button className="text-xs text-aurora-green hover:text-aurora-blue transition-colors flex items-center space-x-1">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expanded Insights */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {insights.slice(1).map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass rounded-lg p-3 border border-glass-secondary"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 bg-gradient-to-r ${insight.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {insight.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="text-sm font-medium text-white">{insight.title}</h5>
                        <div className={getPriorityColor(insight.priority)}>
                          {getPriorityIcon(insight.priority)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-300">{insight.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-4"
        >
          <button className="w-full neo-button py-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
            <Lightbulb className="w-4 h-4" />
            <span>Get More Insights</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-4 pt-4 border-t border-glass-secondary"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-white">94%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
            <div>
              <div className="text-lg font-bold text-aurora-green">+23%</div>
              <div className="text-xs text-gray-400">Productivity</div>
            </div>
            <div>
              <div className="text-lg font-bold text-aurora-blue">12</div>
              <div className="text-xs text-gray-400">Insights</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-4 right-4"
        >
          <BarChart3 className="w-4 h-4 text-aurora-purple" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-4 left-4"
        >
          <Sparkles className="w-3 h-3 text-aurora-green" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AIInsights; 