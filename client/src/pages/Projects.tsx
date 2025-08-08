import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Grid, 
  List, 
  Target,
  TrendingUp,
  Star,
  Zap,
  FolderOpen,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

import ProjectCard from '../components/ProjectCard';
import DashboardLayout from '../components/DashboardLayout';
import { useAuthStore } from '../stores/authStore';

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
  status: string;
  priority: string;
  owner?: {
    id: string;
    name: string;
    email: string;
  };
}

const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    priority: 'medium',
    color: '#3B82F6',
    startDate: '',
    endDate: ''
  });

  const { user } = useAuthStore();

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/projects');
      if (response.ok) {
        const data = await response.json();
        
        // Format projects to match the expected format
        const formattedProjects = data.map((project: any) => ({
          id: project.id,
          name: project.name,
          description: project.description || '',
          progress: project.progress || 0,
          tasks: project.tasks || 0,
          completed: project.completed || 0,
          dueDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          team: project.team || [],
          color: project.color ? `from-aurora-blue to-aurora-green` : 'from-aurora-blue to-aurora-green',
          status: project.status || 'planning',
          priority: project.priority || 'medium',
          owner: project.owner
        }));
        
        setProjects(formattedProjects);
      } else {
        toast.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  // Create new project
  const handleCreateProject = async () => {
    if (!newProject.name.trim()) {
      toast.error('Project name is required');
      return;
    }

    if (!user?.id) {
      toast.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProject,
          ownerId: user.id,
        }),
      });

      if (response.ok) {
        await response.json();
        toast.success('Project created successfully!');
        setShowCreateModal(false);
        setNewProject({
          name: '',
          description: '',
          priority: 'medium',
          color: '#3B82F6',
          startDate: '',
          endDate: ''
        });
        fetchProjects(); // Refresh the project list
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showCreateModal) {
        setShowCreateModal(false);
      }
    };

    if (showCreateModal) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showCreateModal]);

  // Calculate dynamic stats from actual projects
  const stats = [
    { 
      label: 'Total Projects', 
      value: projects.length.toString(), 
      icon: <Target className="w-6 h-6" />, 
      color: 'text-aurora-blue' 
    },
    { 
      label: 'Active Projects', 
      value: projects.filter(p => p.status === 'active').length.toString(), 
      icon: <Zap className="w-6 h-6" />, 
      color: 'text-aurora-green' 
    },
    { 
      label: 'Completed', 
      value: projects.filter(p => p.status === 'completed').length.toString(), 
      icon: <Star className="w-6 h-6" />, 
      color: 'text-aurora-purple' 
    },
    { 
      label: 'Avg. Progress', 
      value: projects.length > 0 ? 
        Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length) + '%' : 
        '0%', 
      icon: <TrendingUp className="w-6 h-6" />, 
      color: 'text-aurora-pink' 
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || project.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
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
              <h1 className="text-3xl font-bold gradient-text mb-2">Projects</h1>
              <p className="text-gray-300">Manage and track your project portfolio</p>
            </div>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neo-button bg-aurora-green text-black px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Project</span>
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
                  placeholder="Search projects..."
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
                <option value="all">All Projects</option>
                <option value="active">Active</option>
                <option value="planning">Planning</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-aurora-green text-white' 
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-aurora-green text-white' 
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-3 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </motion.div>
        ) : filteredProjects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              {searchQuery || selectedFilter !== 'all' 
                ? 'No projects found' 
                : 'No projects yet'
              }
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {searchQuery || selectedFilter !== 'all'
                ? 'Try adjusting your search or filters to find projects'
                : 'Get started by creating your first project. Organize your work and track progress in one place.'
              }
            </p>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neo-button bg-aurora-green text-black px-8 py-4 rounded-xl flex items-center space-x-3 mx-auto text-lg font-semibold"
            >
              <Plus className="w-6 h-6" />
              <span>Create Your First Project</span>
            </motion.button>
          </motion.div>
        )}

      </div>
    </DashboardLayout>
    
    {/* Create Project Modal - Outside DashboardLayout */}
    {showCreateModal && (
      <div className="fixed inset-0 z-[9999]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowCreateModal(false)}
        />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass p-8 rounded-xl border border-glass-secondary max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg glass hover:bg-glass-accent transition-colors"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-6">Create New Project</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Enter project name..."
                    className="w-full px-4 py-3 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Describe your project..."
                    rows={3}
                    className="w-full px-4 py-3 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={newProject.priority}
                      onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                      className="w-full px-4 py-3 bg-glass-dark border border-glass-secondary rounded-lg text-white focus:outline-none focus:border-aurora-green transition-colors"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Color
                    </label>
                    <input
                      type="color"
                      value={newProject.color}
                      onChange={(e) => setNewProject({ ...newProject, color: e.target.value })}
                      className="w-full h-12 bg-glass-dark border border-glass-secondary rounded-lg focus:outline-none focus:border-aurora-green transition-colors"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                      className="w-full px-4 py-3 bg-glass-dark border border-glass-secondary rounded-lg text-white focus:outline-none focus:border-aurora-green transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newProject.endDate}
                      onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                      className="w-full px-4 py-3 bg-glass-dark border border-glass-secondary rounded-lg text-white focus:outline-none focus:border-aurora-green transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 bg-glass-dark text-gray-300 rounded-lg hover:bg-glass-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateProject}
                    disabled={!newProject.name.trim()}
                    className="neo-button bg-aurora-green text-black px-6 py-3 rounded-lg font-medium hover:bg-aurora-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects; 