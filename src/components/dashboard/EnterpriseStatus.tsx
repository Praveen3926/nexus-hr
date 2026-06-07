import React from 'react';
import { ShieldCheck, Activity, Server, Globe, Lock, Cpu } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const healthData = [
  { time: '00:00', latency: 240, uptime: 99.98 },
  { time: '04:00', latency: 210, uptime: 99.99 },
  { time: '08:00', latency: 310, uptime: 99.95 },
  { time: '12:00', latency: 280, uptime: 99.98 },
  { time: '16:00', latency: 260, uptime: 99.99 },
  { time: '20:00', latency: 230, uptime: 99.99 },
];

export const EnterpriseStatusView = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-emerald-500" size={20} />
            <h3 className="font-bold text-slate-800">Global Uptime</h3>
          </div>
          <p className="text-4xl font-display font-bold text-slate-900">99.98%</p>
          <p className="text-xs text-slate-500 mt-2">Enterprise SLA: &gt;99.95%</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="text-blue-500" size={20} />
            <h3 className="font-bold text-slate-800">API Latency</h3>
          </div>
          <p className="text-4xl font-display font-bold text-slate-900">265ms</p>
          <p className="text-xs text-slate-500 mt-2">Avg. P95 across 12 regions</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-amber-500" size={20} />
            <h3 className="font-bold text-slate-800">Compliance</h3>
          </div>
          <p className="text-4xl font-display font-bold text-slate-900">Certified</p>
          <p className="text-xs text-slate-500 mt-2">SOC2 Type II, GDPR, ISO 27001</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-6">Performance Matrix</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={3} dot={{fill: '#3b82f6', r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-6">Regional Node Status</h3>
          <div className="space-y-4">
            {[
              { region: 'US East (N. Virginia)', status: 'Operational', color: 'bg-emerald-500' },
              { region: 'Europe (Frankfurt)', status: 'Operational', color: 'bg-emerald-500' },
              { region: 'Asia Pacific (Tokyo)', status: 'Degraded', color: 'bg-amber-500' },
              { region: 'South America (São Paulo)', status: 'Operational', color: 'bg-emerald-500' },
            ].map((node, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Server size={18} className="text-slate-400" />
                  <span className="font-medium text-slate-700">{node.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${node.color}`} />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{node.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
