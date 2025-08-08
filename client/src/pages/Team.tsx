import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  Target,
  TrendingUp,
  MessageCircle,
  UserPlus,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Team: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'UI/UX Designer',
      department: 'Design',
      email: 'sarah@company.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      avatar: 'SC',
      status: 'online',
      joinDate: '2023-01-15',
      tasksCompleted: 89,
      projectsActive: 3,
      rating: 4.9,
      skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
      color: 'from-aurora-green to-aurora-blue'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Full Stack Developer',
      department: 'Engineering',
      email: 'mike@company.com',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      avatar: 'MJ',
      status: 'online',
      joinDate: '2022-08-20',
      tasksCompleted: 156,
      projectsActive: 4,
      rating: 4.8,
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
      color: 'from-aurora-purple to-aurora-pink'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      role: 'Product Manager',
      department: 'Product',
      email: 'emma@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      avatar: 'EW',
      status: 'away',
      joinDate: '2023-03-10',
      tasksCompleted: 72,
      projectsActive: 5,
      rating: 4.7,
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership'],
      color: 'from-aurora-yellow to-aurora-green'
    },
    {
      id: '4',
      name: 'David Park',
      role: 'Backend Developer',
      department: 'Engineering',
      email: 'david@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      avatar: 'DP',
      status: 'offline',
      joinDate: '2022-11-05',
      tasksCompleted: 134,
      projectsActive: 2,
      rating: 4.9,
      skills: ['Python', 'Django', 'AWS', 'Docker'],
      color: 'from-aurora-blue to-aurora-purple'
    },
    {
      id: '5',
      name: 'Alex Kim',
      role: 'QA Engineer',
      department: 'Quality',
      email: 'alex@company.com',
      phone: '+1 (555) 567-8901',
      location: 'Los Angeles, CA',
      avatar: 'AK',
      status: 'online',
      joinDate: '2023-02-28',
      tasksCompleted: 98,
      projectsActive: 3,
      rating: 4.6,
      skills: ['Test Automation', 'Selenium', 'Jest', 'Performance Testing'],
      color: 'from-aurora-pink to-aurora-yellow'
    }
  ];

  const stats = [
    { label: 'Team Members', value: '24', icon: <Users className="w-6 h-6" />, color: 'text-aurora-blue' },
    { label: 'Active Projects', value: '8', icon: <Target className="w-6 h-6" />, color: 'text-aurora-green' },
    { label: 'Avg. Rating', value: '4.8', icon: <Star className="w-6 h-6" />, color: 'text-aurora-yellow' },
    { label: 'Productivity', value: '+15%', icon: <TrendingUp className="w-6 h-6" />, color: 'text-aurora-pink' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-aurora-green';
      case 'away':
        return 'bg-aurora-yellow';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || member.department.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
              <h1 className="text-3xl font-bold gradient-text mb-2">Team</h1>
              <p className="text-gray-300">Collaborate and manage your team members</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neo-button px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Invite Member</span>
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
                <TrendingUp className="w-4 h-4 text-gray-400" />
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
                  placeholder="Search team members..."
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
                <option value="all">All Departments</option>
                <option value="design">Design</option>
                <option value="engineering">Engineering</option>
                <option value="product">Product</option>
                <option value="quality">Quality</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                {filteredMembers.length} members found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="glass rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer group relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${member.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              {/* Main Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center relative`}>
                      <span className="text-white font-bold text-lg">{member.avatar}</span>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-black`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                      <p className="text-sm text-aurora-green">{member.role}</p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-glass-accent transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </motion.button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{member.tasksCompleted}</div>
                    <div className="text-xs text-gray-400">Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-aurora-blue">{member.projectsActive}</div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-aurora-yellow">{member.rating}</div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{member.location}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-glass-dark text-gray-300 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="px-2 py-1 bg-glass-dark text-gray-300 text-xs rounded-md">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 glass py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-glass-accent transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Message</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass py-2 px-3 rounded-lg hover:bg-glass-accent transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Department Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 bg-glass-dark text-gray-300 text-xs rounded-full">
                  {member.department}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Team; 