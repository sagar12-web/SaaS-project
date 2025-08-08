import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Upload,
  Search,
  Filter,
  Grid,
  List,
  MoreVertical,
  Download,
  Share2,
  Edit,
  Trash2,
  Plus,
  Folder,
  File,
  Image,
  Video,
  Music,
  Archive,
  Eye,
  Calendar,
  User
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

interface Document {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other';
  size: number;
  createdAt: Date;
  modifiedAt: Date;
  owner: string;
  tags: string[];
  url?: string;
  thumbnail?: string;
  folder?: string;
}

interface Folder {
  id: string;
  name: string;
  documentsCount: number;
  createdAt: Date;
  color: string;
}

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const getFileIcon = (type: Document['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="w-8 h-8 text-blue-400" />;
      case 'image':
        return <Image className="w-8 h-8 text-green-400" />;
      case 'video':
        return <Video className="w-8 h-8 text-red-400" />;
      case 'audio':
        return <Music className="w-8 h-8 text-purple-400" />;
      case 'archive':
        return <Archive className="w-8 h-8 text-yellow-400" />;
      default:
        return <File className="w-8 h-8 text-gray-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    console.log('Files dropped:', files);
    // Handle file upload logic here
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = !selectedFolder || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Documents</h1>
            <p className="text-gray-400 mt-1">Manage your files and documents</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
              />
            </div>
            
            <button
              onClick={() => setShowCreateFolderModal(true)}
              className="neo-button bg-glass-dark text-white px-4 py-2 rounded-lg font-medium hover:bg-glass-accent transition-colors flex items-center space-x-2"
            >
              <Folder className="w-5 h-5" />
              <span>New Folder</span>
            </button>
            
            <button
              onClick={() => setShowUploadModal(true)}
              className="neo-button bg-aurora-green text-black px-4 py-2 rounded-lg font-medium hover:bg-aurora-blue transition-colors flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload</span>
            </button>
          </div>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-4 rounded-xl border border-glass-secondary"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    view === 'grid'
                      ? 'bg-aurora-green text-black'
                      : 'bg-glass-dark text-gray-300 hover:bg-glass-accent'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    view === 'list'
                      ? 'bg-aurora-green text-black'
                      : 'bg-glass-dark text-gray-300 hover:bg-glass-accent'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              <button className="p-2 rounded-lg bg-glass-dark text-gray-300 hover:bg-glass-accent transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-sm text-gray-400">
              {filteredDocuments.length} items
            </div>
          </div>
        </motion.div>

        {/* Folders */}
        {folders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Folders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {folders.map((folder) => (
                <motion.button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`glass p-4 rounded-xl border transition-colors text-left ${
                    selectedFolder === folder.id
                      ? 'border-aurora-green bg-aurora-green/10'
                      : 'border-glass-secondary hover:bg-glass-accent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Folder className="w-8 h-8" style={{ color: folder.color }} />
                    <button className="p-1 rounded-lg hover:bg-glass-secondary transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <h4 className="font-medium text-white mb-1">{folder.name}</h4>
                  <p className="text-sm text-gray-400">
                    {folder.documentsCount} documents
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {selectedFolder ? 'Folder Documents' : 'All Documents'}
            </h3>
            {selectedFolder && (
              <button
                onClick={() => setSelectedFolder(null)}
                className="text-aurora-green hover:text-aurora-blue transition-colors"
              >
                View All
              </button>
            )}
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`glass rounded-xl border-2 border-dashed transition-colors ${
              dragOver
                ? 'border-aurora-green bg-aurora-green/10'
                : 'border-glass-secondary'
            }`}
          >
            {filteredDocuments.length === 0 ? (
              <div className="p-12 text-center">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-medium text-white mb-2">No documents yet</h4>
                <p className="text-gray-400 mb-6">
                  Drag and drop files here or click to upload
                </p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="neo-button bg-aurora-green text-black px-6 py-3 rounded-lg font-medium hover:bg-aurora-blue transition-colors"
                >
                  Upload Files
                </button>
              </div>
            ) : (
              <div className="p-6">
                {view === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredDocuments.map((doc) => (
                      <motion.div
                        key={doc.id}
                        className="glass p-4 rounded-xl border border-glass-secondary hover:bg-glass-accent transition-colors group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          {getFileIcon(doc.type)}
                          <button className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-glass-secondary transition-all">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                        <h4 className="font-medium text-white mb-1 truncate">{doc.name}</h4>
                        <div className="space-y-1 text-sm text-gray-400">
                          <p>{formatFileSize(doc.size)}</p>
                          <p>{doc.modifiedAt.toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 rounded-lg hover:bg-glass-secondary transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 rounded-lg hover:bg-glass-secondary transition-colors">
                            <Download className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 rounded-lg hover:bg-glass-secondary transition-colors">
                            <Share2 className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredDocuments.map((doc) => (
                      <motion.div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-glass-dark rounded-lg border border-glass-secondary hover:bg-glass-accent transition-colors group"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center space-x-4">
                          {getFileIcon(doc.type)}
                          <div>
                            <h4 className="font-medium text-white">{doc.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span>{formatFileSize(doc.size)}</span>
                              <span>•</span>
                              <span>{doc.modifiedAt.toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{doc.owner}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-lg hover:bg-glass-secondary transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-glass-secondary transition-colors">
                            <Download className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-glass-secondary transition-colors">
                            <Share2 className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-glass-secondary transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Upload Modal */}
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass p-6 rounded-xl border border-glass-secondary max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Upload Files</h3>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-glass-secondary rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Drag and drop files here</p>
                  <p className="text-gray-400 text-sm mb-4">or</p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="neo-button bg-aurora-green text-black px-4 py-2 rounded-lg font-medium hover:bg-aurora-blue transition-colors cursor-pointer"
                  >
                    Browse Files
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 bg-glass-dark text-gray-300 rounded-lg hover:bg-glass-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="neo-button bg-aurora-green text-black px-4 py-2 rounded-lg font-medium hover:bg-aurora-blue transition-colors"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Create Folder Modal */}
        {showCreateFolderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateFolderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass p-6 rounded-xl border border-glass-secondary max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Create New Folder</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Folder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter folder name..."
                    className="w-full px-3 py-2 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateFolderModal(false)}
                    className="px-4 py-2 bg-glass-dark text-gray-300 rounded-lg hover:bg-glass-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowCreateFolderModal(false)}
                    className="neo-button bg-aurora-green text-black px-4 py-2 rounded-lg font-medium hover:bg-aurora-blue transition-colors"
                  >
                    Create Folder
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Documents;