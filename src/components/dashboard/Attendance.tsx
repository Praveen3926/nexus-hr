import React from 'react';
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
  Download,
  Clock,
  CalendarDays,
  Timer
} from 'lucide-react';
import { mockEmployees } from '../../lib/mockData';
import { cn } from '../../lib/utils';

export const AttendanceView = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today</p>
                <p className="text-sm font-bold text-slate-900">April 28, 2026</p>
              </div>
           </div>
           <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Present</p>
                <p className="text-sm font-bold text-slate-900">4,821 / 5,000</p>
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
            Filter by Shift
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 whitespace-nowrap">
            Process Leave Requests
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Check In</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Check Out</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Hours</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
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
                     <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm font-medium">09:12 AM</span>
                     </div>
                  </td>
                  <td className="px-8 py-4">
                     <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm font-medium">06:05 PM</span>
                     </div>
                  </td>
                  <td className="px-8 py-4">
                     <div className="flex items-center gap-2">
                        <Timer className="w-3.5 h-3.5 text-primary-500" />
                        <span className="text-sm font-bold text-slate-700">8h 53m</span>
                     </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-xs">{emp.location.split(',')[0]} (In-Office)</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                      PRESENT
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
