/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { EmployeeDirectory } from './components/dashboard/EmployeeDirectory';
import { AIInsightsView } from './components/dashboard/AIInsights';
import { PayrollView } from './components/dashboard/Payroll';
import { AttendanceView } from './components/dashboard/Attendance';
import { PerformanceView } from './components/dashboard/Performance';
import { SettingsView } from './components/dashboard/Settings';
import { EnterpriseStatusView } from './components/dashboard/EnterpriseStatus';
import { PythonAnalyticsView } from './components/dashboard/PythonAnalytics';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const { currentView } = useAppStore();

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeDirectory />;
      case 'ai-insights':
        return <AIInsightsView />;
      case 'payroll':
        return <PayrollView />;
      case 'attendance':
        return <AttendanceView />;
      case 'performance':
        return <PerformanceView />;
      case 'settings':
        return <SettingsView />;
      case 'enterprise':
        return <EnterpriseStatusView />;
      case 'python-analytics':
        return <PythonAnalyticsView />;
      case 'recruitment':
        return (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="bg-white p-12 rounded-[2rem] border border-slate-200 shadow-sm max-w-lg w-full text-center space-y-6">
              <div className="w-24 h-24 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <span className="text-4xl text-primary-600">🚀</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">Recruitment Hub</h3>
                <p className="text-slate-500 leading-relaxed">
                  Integrating the NexusRecruit engine. This module will feature AI-driven candidate ranking and automated scheduling.
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest">
                  Coming in Q3 2026
                </span>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}
