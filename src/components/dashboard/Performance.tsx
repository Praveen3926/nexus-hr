import React from 'react';
import { 
  Trophy, 
  Target, 
  MessageSquare, 
  TrendingUp, 
  Star,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { mockEmployees } from '../../lib/mockData';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export const PerformanceView = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Completion Rate', value: '84%', icon: Target, color: 'bg-primary-500' },
          { label: 'Avg. Rating', value: '4.2', icon: Star, color: 'bg-accent-gold' },
          { label: 'Feedback cycles', value: 'Active', icon: MessageSquare, color: 'bg-emerald-500' },
          { label: 'Promotion Pool', value: '124', icon: TrendingUp, color: 'bg-brand-orange' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white", stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-display font-bold text-slate-900">{stat.value}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-slate-900">Performance Leaderboard</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white rounded-lg">Top Performers</button>
              <button className="px-3 py-1.5 text-xs font-bold bg-white text-slate-500 border border-slate-200 rounded-lg">Underperformers</button>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">OKR Progress</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Manager Rating</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Review Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold">
                            {emp.firstName[0]}{emp.lastName[0]}
                          </div>
                          <p className="text-sm font-bold text-slate-900">{emp.firstName} {emp.lastName}</p>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                         <div className="w-full max-w-[120px] h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.random() * 40 + 60}%` }}
                              className="h-full bg-primary-500 rounded-full"
                            />
                         </div>
                      </td>
                      <td className="px-8 py-4">
                         <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
                            <span className="text-sm font-bold text-slate-700">{emp.performanceScore}</span>
                         </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary-50 text-primary-600">
                          COMPLETED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <h3 className="font-display font-bold text-lg text-slate-900 mb-6 relative z-10">AI Performance Suggestions</h3>
            <div className="space-y-4 relative z-10">
              {[
                "Suggest 15% increase for Sarah Chen based on market parity.",
                "David Smith is eligible for Senior UX lead promotion cycle.",
                "Elena Rodriguez requires upskilling in Strategic HR certification."
              ].map((msg, i) => (
                <div key={i} className="flex gap-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3 h-3 text-primary-600" />
                  </div>
                  {msg}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
             <h3 className="font-display font-bold text-lg text-slate-900 mb-6">360° Feedback Summary</h3>
             <div className="flex items-center justify-center h-40">
                <div className="text-center">
                  <p className="text-4xl font-display font-bold text-slate-900">4.8</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Network Score</p>
                </div>
             </div>
             <p className="text-sm text-slate-500 text-center leading-relaxed">
               Employee sentiment across the organization is trending 8% higher than Q1.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
