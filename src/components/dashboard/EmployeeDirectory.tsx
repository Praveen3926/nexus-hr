import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Mail,
  MapPin,
  Calendar,
  ChevronRight,
  Download
} from 'lucide-react';
import { mockEmployees } from '../../lib/mockData';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEmployees = mockEmployees.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by name, role or department..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map((emp, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={emp.id} 
            className="bg-white rounded-[2rem] border border-slate-200 p-6 hover:shadow-xl hover:border-primary-100 transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary-500/20">
                  {emp.firstName[0]}{emp.lastName[0]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
                    {emp.firstName} {emp.lastName}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">{emp.role}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-slate-500">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">{emp.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-sm">Joined {new Date(emp.dateJoined).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Risk Status</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold inline-block text-center",
                  emp.attritionRisk === 'Low' ? "bg-emerald-50 text-emerald-600" :
                  emp.attritionRisk === 'Medium' ? "bg-amber-50 text-amber-600" :
                  "bg-rose-50 text-rose-600"
                )}>
                  {emp.attritionRisk} RISK
                </span>
              </div>
              <button className="flex items-center gap-1 text-sm font-bold text-primary-600 hover:gap-2 transition-all">
                Full Profile
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredEmployees.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <Users className="w-12 h-12 text-slate-200 mb-4" />
          <h3 className="font-bold text-slate-900">No employees found</h3>
          <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
