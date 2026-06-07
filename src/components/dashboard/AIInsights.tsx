import React from 'react';
import { 
  Brain, 
  Zap, 
  Target, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { mockAIInsights } from '../../lib/mockData';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export const AIInsightsView = () => {
  return (
    <div className="space-y-8">
      {/* Hero AI Status */}
      <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/20">
              <Brain className="text-white w-7 h-7" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl text-slate-900">Workforce Intelligence Active</h2>
              <p className="text-slate-500 text-sm">LLM Engine: Gemini 1.5 Flash | Last model refresh: 2h ago</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Attrition Accuracy</p>
              <p className="text-3xl font-display font-bold text-brand-orange">89.4%</p>
              <p className="text-[10px] text-emerald-600 mt-1 font-bold">+2.1% from baseline</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Sentiment Score</p>
              <p className="text-3xl font-display font-bold text-primary-600">7.8/10</p>
              <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase">Stable Performance</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Hiring Efficiency</p>
              <p className="text-3xl font-display font-bold text-emerald-600">92%</p>
              <p className="text-[10px] text-emerald-600 mt-1 font-bold uppercase">Optimal Range</p>
            </div>
          </div>
        </div>
        
        {/* Abstract Background bits */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 blur-3xl -rotate-45" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/5 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Insights Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-slate-900">Critical Predictive Insights</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              LIVE ANALYSIS
            </div>
          </div>
          
          {mockAIInsights.map((insight, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] border border-slate-200 p-8 hover:shadow-xl transition-all relative group"
            >
              <div className="flex items-start gap-6">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                  insight.impact === 'High' ? "bg-rose-500 shadow-rose-500/20" : "bg-primary-500 shadow-primary-500/20"
                )}>
                  {insight.type === 'attrition' ? <AlertCircle className="text-white w-7 h-7" /> : <Target className="text-white w-7 h-7" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-xl text-slate-900 group-hover:text-primary-600 transition-colors">
                      {insight.title}
                    </h4>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest",
                      insight.impact === 'High' ? "bg-rose-50 text-rose-600" : "bg-primary-50 text-primary-600"
                    )}>
                      {insight.impact} PRIORITY
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {insight.description}
                  </p>
                  
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-brand-orange" />
                      Recommended AI Action Plan
                    </p>
                    <ul className="space-y-3">
                      {insight.recommendedActions.map((action, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <button className="absolute bottom-8 right-8 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-brand-orange hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Mini-Insights */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="font-display font-bold text-lg text-slate-900 mb-6">Employee Sentiment</h3>
            <div className="space-y-6">
              {[
                { label: 'Growth Opportunities', score: 85, trend: 12 },
                { label: 'Work-Life Balance', score: 62, trend: -5 },
                { label: 'Leadership Confidence', score: 78, trend: 3 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-600">{item.label}</span>
                    <span className="font-bold text-slate-900">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                      className={cn(
                        "h-full rounded-full",
                        item.score > 75 ? "bg-emerald-500" : item.score > 60 ? "bg-amber-500" : "bg-rose-500"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary-600 p-8 rounded-[2rem] text-white shadow-xl shadow-primary-600/20 relative overflow-hidden transition-transform hover:-translate-y-1">
            <div className="relative z-10">
              <h3 className="font-display font-bold text-lg mb-2">Simulate Retention</h3>
              <p className="text-primary-100 text-sm mb-6 leading-relaxed">
                Run a 'What-If' scenario to see how salary adjustments would impact your top 10% talent.
              </p>
              <button className="w-full py-3 bg-white text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-colors">
                Launch Simulator
              </button>
            </div>
            <TrendingUp className="absolute bottom-[-20%] right-[-10%] w-40 h-40 text-primary-500/20 -rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
