import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  Video,
  Phone,
  MoreHorizontal,
  Filter,
  Search
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'task' | 'deadline' | 'event';
  priority: 'low' | 'medium' | 'high';
  location?: string;
  attendees?: string[];
  color: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Calendar navigation
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar days for month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getEventsForDay = (date: Date) => {
    return events.filter(event => 
      event.start.toDateString() === date.toDateString()
    );
  };

  const handleCreateEvent = () => {
    setShowEventModal(true);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
            <h1 className="text-3xl font-bold gradient-text">Calendar</h1>
            <p className="text-gray-400 mt-1">Manage your schedule and events</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
              />
            </div>
            
            <button
              onClick={handleCreateEvent}
              className="neo-button bg-aurora-green text-black px-4 py-2 rounded-lg font-medium hover:bg-aurora-blue transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Event</span>
            </button>
          </div>
        </motion.div>

        {/* Calendar Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-xl border border-glass-secondary"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-lg glass hover:bg-glass-accent transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <h2 className="text-2xl font-bold text-white">
                {formatDate(currentDate)}
              </h2>
              
              <button
                onClick={goToNext}
                className="p-2 rounded-lg glass hover:bg-glass-accent transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-glass-accent rounded-lg text-white hover:bg-glass-secondary transition-colors"
              >
                Today
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {(['month', 'week', 'day'] as const).map((viewType) => (
                <button
                  key={viewType}
                  onClick={() => setView(viewType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === viewType
                      ? 'bg-aurora-green text-black'
                      : 'bg-glass-dark text-gray-300 hover:bg-glass-accent'
                  }`}
                >
                  {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Month View */}
          {view === 'month' && (
            <div className="space-y-4">
              {/* Week headers */}
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day) => (
                  <div key={day} className="p-3 text-center text-gray-400 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((date, index) => {
                  const dayEvents = getEventsForDay(date);
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`relative h-24 p-2 rounded-lg border transition-colors ${
                        isToday(date)
                          ? 'bg-aurora-green/20 border-aurora-green'
                          : isCurrentMonth(date)
                          ? 'bg-glass-dark border-glass-secondary hover:bg-glass-accent'
                          : 'bg-gray-800/20 border-gray-700 text-gray-500'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col h-full">
                        <span className={`text-sm font-medium ${
                          isToday(date) ? 'text-aurora-green' : 'text-white'
                        }`}>
                          {date.getDate()}
                        </span>
                        
                        {dayEvents.length > 0 && (
                          <div className="flex-1 mt-1 space-y-1">
                            {dayEvents.slice(0, 2).map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className="w-full h-1 rounded-full"
                                style={{ backgroundColor: event.color }}
                              />
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-400">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Week/Day views placeholder */}
          {(view === 'week' || view === 'day') && (
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                {view.charAt(0).toUpperCase() + view.slice(1)} View
              </h3>
              <p className="text-gray-400">
                {view === 'week' ? 'Weekly' : 'Daily'} calendar view coming soon
              </p>
            </div>
          )}
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-xl border border-glass-secondary"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-aurora-green" />
            Upcoming Events
          </h3>

          {events.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h4 className="text-lg font-medium text-white mb-2">No events scheduled</h4>
              <p className="text-gray-400 mb-4">Get started by creating your first event</p>
              <button
                onClick={handleCreateEvent}
                className="neo-button bg-aurora-green text-black px-4 py-2 rounded-lg font-medium hover:bg-aurora-blue transition-colors"
              >
                Create Event
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {events.slice(0, 5).map((event) => (
                <motion.div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-glass-dark rounded-lg border border-glass-secondary hover:bg-glass-accent transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />
                    <div>
                      <h4 className="font-medium text-white">{event.title}</h4>
                      <p className="text-sm text-gray-400">
                        {event.start.toLocaleDateString()} at {event.start.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <button className="p-2 rounded-lg hover:bg-glass-secondary transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Event Creation Modal */}
        {showEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEventModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass p-6 rounded-xl border border-glass-secondary max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Create New Event</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter event title..."
                    className="w-full px-3 py-2 bg-glass-dark border border-glass-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 bg-glass-dark border border-glass-secondary rounded-lg text-white focus:outline-none focus:border-aurora-green transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 bg-glass-dark border border-glass-secondary rounded-lg text-white focus:outline-none focus:border-aurora-green transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2 bg-glass-dark text-gray-300 rounded-lg hover:bg-glass-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="neo-button bg-aurora-green text-black px-4 py-2 rounded-lg font-medium hover:bg-aurora-blue transition-colors"
                  >
                    Create Event
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

export default Calendar;