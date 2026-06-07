import React from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { mockEmployees } from '../../lib/mockData';

export const PayrollView = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Monthly Payout</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-display font-bold text-slate-900">$4.2M</p>
            <span className="text-xs font-bold text-emerald-500">+1.2%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">TDS Liabilities</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-display font-bold text-slate-900">$840k</p>
            <span className="text-xs font-bold text-slate-400">STABLE</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Processing Status</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <p className="text-lg font-bold text-emerald-600">Cycle Active</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-slate-900">Current Payroll Cycle: April 2026</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
              Run Batch Payroll
            </button>
            <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Download className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Basic Pay</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Allowances</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Deductions</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Net Payout</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                        {emp.firstName[0]}{emp.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{emp.firstName} {emp.lastName}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm font-medium text-slate-600">${(emp.salary / 12).toLocaleString()}</td>
                  <td className="px-8 py-4 text-sm font-medium text-emerald-600">+$1,200</td>
                  <td className="px-8 py-4 text-sm font-medium text-rose-600">-$450</td>
                  <td className="px-8 py-4 text-sm font-bold text-slate-900">${((emp.salary / 12) + 750).toLocaleString()}</td>
                  <td className="px-8 py-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      Verified
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
