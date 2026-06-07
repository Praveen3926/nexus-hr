import { create } from 'zustand';

type View = 'dashboard' | 'employees' | 'payroll' | 'attendance' | 'performance' | 'ai-insights' | 'recruitment' | 'settings' | 'enterprise' | 'python-analytics';

interface AppState {
  currentView: View;
  setCurrentView: (view: View) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'dashboard',
  setCurrentView: (view) => set({ currentView: view }),
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
