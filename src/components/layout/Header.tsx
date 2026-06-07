import React from 'react';
import { Bell, Search, User, LogOut, ChevronDown } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Header = () => {
  const { currentView } = useAppStore();
  
  const viewTitles: Record<string, string> = {
    'dashboard': 'Executive Overview',
    'employees': 'Employee Directory',
    'attendance': 'Time & Attendance',
    'payroll': 'Payroll Engine',
    'performance': 'Performance Management',
    'ai-insights': 'AI Workforce Intelligence',
    'recruitment': 'Recruitment & Pipeline',
    'settings': 'System Settings',
    'enterprise': 'Enterprise Infrastructure',
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="font-display font-bold text-xl text-slate-900">
          {viewTitles[currentView] || 'Nexus HR'}
        </h1>
        <div className="h-6 w-px bg-slate-200 hidden md:block" />
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-brand-orange/20 w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full border-2 border-white" />
        </button>
        
        <div className="h-8 w-px bg-slate-200" />
        
        <button className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-xl transition-colors pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">Admin User</p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Super Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
            AU
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
};
