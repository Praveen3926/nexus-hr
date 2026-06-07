import React from 'react';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  Clock, 
  Trophy, 
  BrainCircuit, 
  UserPlus, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  Terminal
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'attendance', label: 'Attendance', icon: Clock },
  { id: 'payroll', label: 'Payroll', icon: CreditCard },
  { id: 'performance', label: 'Performance', icon: Trophy },
  { id: 'ai-insights', label: 'AI Insights', icon: BrainCircuit },
  { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
  { id: 'python-analytics', label: 'Python Sandbox', icon: Terminal },
];

export const Sidebar = () => {
  const { currentView, setCurrentView, sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 260 : 80 }}
      className={cn(
        "h-screen bg-white text-slate-500 flex flex-col border-r border-slate-200 relative z-50",
        !sidebarOpen && "items-center"
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-brand-orange/20">
          <Building2 className="text-white w-6 h-6" />
        </div>
        {sidebarOpen && (
          <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
            Nexus<span className="text-brand-orange">HR</span>
          </span>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as any)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
              currentView === item.id 
                ? "bg-primary-50 text-primary-600 shadow-sm" 
                : "hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 shrink-0 transition-colors",
              currentView === item.id ? "text-primary-600" : "text-slate-400 group-hover:text-slate-600"
            )} />
            {sidebarOpen && <span className="font-bold">{item.label}</span>}
            {!sidebarOpen && (
              <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={() => setCurrentView('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors",
            currentView === 'settings' 
              ? "bg-primary-50 text-primary-600 shadow-sm" 
              : "text-slate-500 hover:bg-slate-50"
          )}
        >
          <Settings className={cn(
            "w-5 h-5 shrink-0",
            currentView === 'settings' ? "text-primary-600" : "text-slate-400"
          )} />
          {sidebarOpen && <span className="font-bold">Settings</span>}
        </button>
        
        <button 
          onClick={toggleSidebar}
          className="mt-4 w-full flex items-center justify-center p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
        >
          {sidebarOpen ? <ChevronLeft className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
        </button>
      </div>
      
      {sidebarOpen && (
        <div className="p-6">
          <button 
            onClick={() => setCurrentView('enterprise')}
            className={cn(
              "w-full text-left bg-slate-50 border rounded-2xl p-4 transition-all hover:bg-slate-100",
              currentView === 'enterprise' ? "border-primary-500 ring-1 ring-primary-500/20" : "border-slate-200"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className={cn(
                "w-4 h-4",
                currentView === 'enterprise' ? "text-primary-600" : "text-emerald-500"
              )} />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enterprise Status</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              SLA: <span className="text-emerald-600">99.95%</span><br/>
              NODES: <span className="text-emerald-600">ACTIVE</span>
            </div>
          </button>
        </div>
      )}
    </motion.aside>
  );
};
