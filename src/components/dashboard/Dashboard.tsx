import React from 'react';
import { 
  Users, 
  Clock, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  Zap,
  TrendingDown,
  Brain
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { mockEmployees, mockAIInsights } from '../../lib/mockData';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

const attritionData = [
  { month: 'Jan', rate: 2.1 },
  { month: 'Feb', rate: 1.8 },
  { month: 'Mar', rate: 2.5 },
  { month: 'Apr', rate: 2.2 },
  { month: 'May', rate: 1.9 },
  { month: 'Jun', rate: 1.5 },
];

const deptData = [
  { name: 'Engineering', value: 45 },
  { name: 'Product', value: 20 },
  { name: 'HR', value: 10 },
  { name: 'Design', value: 15 },
  { name: 'Finance', value: 10 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const StatCard = ({ title, value, icon: Icon, trend, subtext, color, onClick }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    onClick={onClick}
    className={cn(
      "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all",
      onClick && "cursor-pointer"
    )}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <p className="text-3xl font-display font-bold text-slate-900">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <div className={cn(
        "flex items-center text-xs font-bold px-2 py-0.5 rounded-full",
        trend > 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
      )}>
        {trend > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
        {Math.abs(trend)}%
      </div>
      <span className="text-xs text-slate-400 font-medium">{subtext}</span>
    </div>
  </motion.div>
);

export const Dashboard = () => {
  const { setCurrentView } = useAppStore();

  return (
    <div className="space-y-8">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Employees" 
          value="50k+" 
          icon={Users} 
          trend={12} 
          subtext="vs last year"
          color="bg-primary-600"
          onClick={() => setCurrentView('employees')}
        />
        <StatCard 
          title="API Latency" 
          value="<285ms" 
          icon={Zap} 
          trend={-8} 
          subtext="optimized"
          color="bg-accent-gold"
          onClick={() => setCurrentView('enterprise')}
        />
        <StatCard 
          title="System Uptime" 
          value="99.98%" 
          icon={ShieldCheck} 
          trend={0.03} 
          subtext="Enterprise SLA"
          color="bg-emerald-500"
          onClick={() => setCurrentView('enterprise')}
        />
        <StatCard 
          title="Retention Rate" 
          value="92.4%" 
          icon={Activity} 
          trend={5} 
          subtext="AI Improved"
          color="bg-brand-orange"
          onClick={() => setCurrentView('ai-insights')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attrition Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Attrition Intelligence</h3>
              <p className="text-sm text-slate-500">Predicted vs Actual Attrition Trend</p>
            </div>
            <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              View Detailed Report
            </button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attritionData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRate)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Highlight */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                <Brain size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">AI Co-pilot</h3>
            </div>
            
            <div className="space-y-6">
              {mockAIInsights.slice(0, 2).map((insight, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-100 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn(
                      "text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded",
                      insight.impact === 'High' ? "bg-rose-50 text-rose-600" : "bg-primary-50 text-primary-600"
                    )}>
                      {insight.impact} IMPACT
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">JUST NOW</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 text-slate-800 group-hover:text-primary-600 transition-colors">{insight.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              Explore All Insights
              <Zap className="w-4 h-4 text-brand-orange fill-brand-orange" />
            </button>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-3xl -rotate-45" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-500/5 blur-3xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h3 className="font-display font-bold text-lg text-slate-900 mb-6">Workforce Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deptData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {deptData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display font-bold text-lg text-slate-900">Recent Employee Performance</h3>
            <button className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors">
              Filter by Dept
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Perf. Score</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockEmployees.map((emp) => (
                  <tr key={emp.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200">
                          {emp.firstName[0]}{emp.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{emp.firstName} {emp.lastName}</p>
                          <p className="text-[10px] text-slate-500 font-medium uppercase">{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-orange" 
                            style={{ width: `${(emp.performanceScore / 5) * 100}%` }} 
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{emp.performanceScore}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
