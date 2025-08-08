import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'viewer';
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    sound: boolean;
    animations: boolean;
  };
  stats: {
    tasksCompleted: number;
    projectsCreated: number;
    streakDays: number;
    totalPoints: number;
  };
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Mock user data
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            role: 'user',
            preferences: {
              theme: 'dark',
              notifications: true,
              sound: true,
              animations: true,
            },
            stats: {
              tasksCompleted: 42,
              projectsCreated: 8,
              streakDays: 7,
              totalPoints: 1250,
            },
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: 'Login failed. Please try again.',
          });
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Mock user data
          const user: User = {
            id: Date.now().toString(),
            email,
            name,
            role: 'user',
            preferences: {
              theme: 'dark',
              notifications: true,
              sound: true,
              animations: true,
            },
            stats: {
              tasksCompleted: 0,
              projectsCreated: 0,
              streakDays: 0,
              totalPoints: 0,
            },
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: 'Registration failed. Please try again.',
          });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updates },
          });
        }
      },

      updatePreferences: (preferences: Partial<User['preferences']>) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              preferences: { ...user.preferences, ...preferences },
            },
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 