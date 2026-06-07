import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, User, Globe, Moon, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const SettingsView = () => {
  const [briefings, setBriefings] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(false);
  const [mfa, setMfa] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleApply = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Section */}
        <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
            <User size={20} className="text-primary-600" />
            <h2 className="text-lg font-bold text-slate-900">Personal Profile</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">Full Name</label>
              <input type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium" defaultValue="Admin User" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">Email Address</label>
              <input type="email" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium" defaultValue="admin@nexushr.io" />
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
            <Bell size={20} className="text-primary-600" />
            <h2 className="text-lg font-bold text-slate-900">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-[24px] border border-slate-100/50">
              <div>
                <p className="font-bold text-slate-800">Intelligence Briefings</p>
                <p className="text-xs text-slate-500">Daily AI-generated summaries of your workforce</p>
              </div>
              <button 
                onClick={() => setBriefings(!briefings)}
                className={cn(
                  "w-12 h-6 rounded-full relative transition-colors duration-200",
                  briefings ? "bg-primary-600" : "bg-slate-300"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200",
                  briefings ? "right-1" : "left-1"
                )} />
              </button>
            </div>
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-[24px] border border-slate-100/50">
              <div>
                <p className="font-bold text-slate-800">Risk Alerts</p>
                <p className="text-xs text-slate-500">Instant push notifications for anomaly detection</p>
              </div>
              <button 
                onClick={() => setRiskAlerts(!riskAlerts)}
                className={cn(
                  "w-12 h-6 rounded-full relative transition-colors duration-200",
                  riskAlerts ? "bg-primary-600" : "bg-slate-300"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200",
                  riskAlerts ? "right-1" : "left-1"
                )} />
              </button>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
            <Shield size={20} className="text-primary-600" />
            <h2 className="text-lg font-bold text-slate-900">Security Guardrails</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left px-6 py-5 bg-slate-50 hover:bg-slate-100 rounded-[24px] transition-all flex items-center justify-between group">
              <span className="font-bold text-slate-700 group-hover:text-primary-600">Update Secure Password</span>
              <span className="text-slate-300 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button 
              onClick={() => setMfa(!mfa)}
              className="w-full text-left px-6 py-5 bg-slate-50 hover:bg-slate-100 rounded-[24px] transition-all flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-slate-700 group-hover:text-primary-600 block">Multifactor Authentication</span>
                <span className="text-[10px] text-slate-400 font-medium">Extra layer of protection for your account</span>
              </div>
              <span className={cn(
                "text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest transition-colors",
                mfa ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500"
              )}>
                {mfa ? 'Active' : 'Inactive'}
              </span>
            </button>
          </div>
        </section>

        {/* Localization Section */}
        <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
            <Globe size={20} className="text-primary-600" />
            <h2 className="text-lg font-bold text-slate-900">Global Settings</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">System Language</label>
              <div className="relative">
                <select className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium appearance-none">
                  <option>English (United States)</option>
                  <option>English (Kingdom)</option>
                  <option>Español</option>
                  <option>Français</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold">↓</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-primary-50/50 p-5 rounded-[24px] border border-primary-100/50">
              <Moon size={18} className="text-primary-600 shrink-0 mt-0.5" />
              <p className="text-xs text-primary-700 leading-relaxed">
                <span className="font-bold">Display Mode:</span> Your interface automatically adjusts to your operating system's light or dark mode settings.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex items-center justify-end gap-5 pt-8">
        {showSuccess && (
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 size={18} />
            Changes saved successfully
          </div>
        )}
        <button className="px-8 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:text-slate-900 transition-all">
          Reset Changes
        </button>
        <button 
          onClick={handleApply}
          disabled={saving}
          className="px-10 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving ? 'Updating...' : 'Apply Update'}
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
        </button>
      </div>
    </div>
  );
};
