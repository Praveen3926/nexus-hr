import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Play, 
  Sparkles, 
  RefreshCw, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle, 
  Code2, 
  FileCode, 
  Layers, 
  Cpu
} from 'lucide-react';
import { mockEmployees } from '../../lib/mockData';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface ScriptPreset {
  name: string;
  description: string;
  code: string;
}

const PRESETS: ScriptPreset[] = [
  {
    name: "Attrition & Retention Correlation",
    description: "Analyze how performance ratings correlate with attrition risk to identify high-value flight risks.",
    code: `# Attrition & Retention Correlation Analyzer
print("📊 STARTING TALENT RETENTION AND PERFORMANCE AUDIT")
print("-" * 55)

high_performers_at_risk = []
total_high_performers = 0

for emp in employees:
    if emp['performanceScore'] >= 4.0:
        total_high_performers += 1
        if emp['attritionRisk'] in ['High', 'Medium']:
            high_performers_at_risk.append(emp)

print(f"Total High Performers (Score >= 4.0): {total_high_performers}")
print(f"High-Value Flight Risks Identified: {len(high_performers_at_risk)}")
print("-" * 55)

if high_performers_at_risk:
    print("⚠️ ALERT: Urgent attention required for these key employees:")
    for emp in high_performers_at_risk:
        p_bar = "█" * int(emp['performanceScore'] * 2)
        print(f" - {emp['firstName']} {emp['lastName']} ({emp['role']})")
        print(f"   Dept: {emp['department']} | Risk: {emp['attritionRisk']} | Score: {emp['performanceScore']} {p_bar}")
        print(f"   Action: Schedule instant stay interview / check compensation baseline.")
else:
    print("✅ System clear. No top performers are currently at major attrition risk.")
`
  },
  {
    name: "Salary Equality & Departmental Distribution",
    description: "Group records to compute headcount, total investment, average salary, and peak compensation metrics across business sectors.",
    code: `# Salary Equality and Department Distribution Audit
print("💼 BUSINESS UNIT COMPENSATION SUMMARIES")
print("=" * 60)

dept_compensation = {}

for emp in employees:
    dept = emp['department']
    sal = emp['salary']
    
    if dept not in dept_compensation:
        dept_compensation[dept] = {
            'headcount': 0,
            'total_salary': 0,
            'salaries': []
        }
        
    dept_compensation[dept]['headcount'] += 1
    dept_compensation[dept]['total_salary'] += sal
    dept_compensation[dept]['salaries'].append(sal)

# Display results in formatted rows
print(f"{'Department':<20} | {'Headcount':<10} | {'Average Salary':<16} | {'Max Salary':<12}")
print("-" * 65)

for dept, stats in dept_compensation.items():
    headcount = stats['headcount']
    total_sal = stats['total_salary']
    avg_sal = total_sal / headcount if headcount > 0 else 0
    max_sal = max(stats['salaries']) if stats['salaries'] else 0
    
    print(f"{dept:<20} | {headcount:<10} | \${avg_sal:,.2f} | \${max_sal:,.2f}")

print("-" * 65)
print(f"Global Headcount: {len(employees)}")
print(f"Global Combined Payroll: \${sum(e['salary'] for e in employees):,}")
`
  },
  {
    name: "Employee Lifetime Tenure Profiler",
    description: "Calculate years of tenure and employee experience cohorts based on joining dates.",
    code: `# Employee Tenure and Level Profiler
from datetime import datetime

print("⌛ WORKFORCE EXPERIENCE PROFILE")
print("-" * 50)

cohort_counts = {
    'Senior (Over 4 years)': 0,
    'Mid-Level (2-4 years)': 0,
    'Associate (Under 2 years)': 0
}

current_year = 2026

for emp in employees:
    join_year = int(emp['dateJoined'].split('-')[0])
    tenure_years = current_year - join_year
    
    if tenure_years > 4:
        cohort = 'Senior (Over 4 years)'
    elif tenure_years >= 2:
        cohort = 'Mid-Level (2-4 years)'
    else:
        cohort = 'Associate (Under 2 years)'
        
    cohort_counts[cohort] += 1
    print(f"• {emp['firstName']} {emp['lastName']} - Joined {emp['dateJoined']} ({tenure_years} yrs tenure) -> {cohort.split(' ')[0]}")

print("-" * 50)
print("📊 Cohort Distribution Summary:")
for cohort, count in cohort_counts.items():
    pct = (count / len(employees)) * 100 if len(employees) > 0 else 0
    bar = "■" * count
    print(f" - {cohort:<26}: {count} ({pct:.1f}%) {bar}")
`
  }
];

export const PythonAnalyticsView = () => {
  const [code, setCode] = useState<string>(PRESETS[0].code);
  const [stdout, setStdout] = useState<string>("Click 'Execute Python Script' to run calculations.");
  const [stderr, setStderr] = useState<string>("");
  const [isSimulated, setIsSimulated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [generatingScript, setGeneratingScript] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>("");

  const handleSelectPreset = (preset: ScriptPreset) => {
    setCode(preset.code);
    setStdout(`Switched to preset:\n${preset.name}\n\nClick 'Execute' to run.`);
    setStderr("");
    setExplanation("");
  };

  const handleRunScript = async () => {
    setLoading(true);
    setStdout("Connecting to calculation runtime...\n");
    setStderr("");
    try {
      const response = await fetch("/api/run-python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, employees: mockEmployees }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setStdout(data.stdout || "No output printed to terminal (stdout is empty).");
        setStderr(data.stderr || "");
        setIsSimulated(data.isSimulated || false);
      } else {
        setStderr(data.error || "Failed to execute Python script.");
        setStdout("");
      }
    } catch (err: any) {
      setStderr("Connection lost or backend runtime unavailable.\nEnsure your local fullstack dev server is started and running.\nDetailed: " + err.message);
      setStdout("");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateScript = async () => {
    if (!aiPrompt.trim()) return;
    setGeneratingScript(true);
    try {
      const response = await fetch("/api/generate-python-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, employees: mockEmployees }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setCode(data.code);
        setExplanation(data.explanation);
        setStdout("AI has constructed a new custom script based on your query!\n\nReview the Python script on the left and click 'Execute Python Script' to analyze the data.\n\nExplanation:\n" + data.explanation);
        setStderr("");
      } else {
        setStderr(data.error || "Failed to generate Python script.");
      }
    } catch (err: any) {
      setStderr("Failed to connect to AI server: " + err.message);
    } finally {
      setGeneratingScript(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Title Grid */}
      <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/10">
                <Code2 className="text-white w-7 h-7" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-slate-900">Python Analytics Sandbox</h2>
                <p className="text-slate-500 text-sm">Write or generate real-time Python code to audit and profile your employees.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Layers className="text-primary-600 w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Dataset</p>
                <p className="text-sm font-bold text-slate-800">employees ({mockEmployees.length} records)</p>
              </div>
            </div>
            <div className="px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Cpu className="text-brand-orange w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Runtime Status</p>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  Python 3 Online
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/10 blur-3xl -rotate-45" />
        <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-accent-gold/5 blur-3xl" />
      </div>

      {/* AI Assistant Generator */}
      <div className="bg-gradient-to-r from-primary-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <h3 className="font-display font-bold text-xl flex items-center gap-2">
              <Sparkles className="text-accent-gold fill-accent-gold w-6 h-6 animate-pulse" />
              Gemini AI Python Intelligence Partner
            </h3>
            <p className="text-primary-100 text-sm leading-relaxed">
              Describe the metrics, distributions, or trends you want to analyze. Gemini will instantly construct a high-performance Python script targeting your active employee matrix.
            </p>
          </div>
          <div className="w-full lg:max-w-lg">
            <div className="flex gap-3 bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-sm focus-within:ring-4 focus-within:ring-white/10 transition-all">
              <input 
                type="text" 
                placeholder="e.g. Find salary inequalities between departments"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerateScript();
                }}
                className="flex-1 bg-transparent px-4 py-2.5 focus:outline-none text-white placeholder-white/50 text-sm font-medium"
                disabled={generatingScript}
              />
              <button 
                onClick={handleGenerateScript}
                disabled={generatingScript || !aiPrompt.trim()}
                className="px-6 py-2.5 bg-white text-primary-600 hover:bg-primary-50 active:bg-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingScript ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 text-primary-600" />
                )}
                Generate Code
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-[-50%] right-[-20%] w-[35rem] h-[35rem] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Core Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Container */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm flex-1 flex flex-col">
            {/* Editor Action Header */}
            <div className="px-8 py-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <FileCode className="text-slate-500 w-5 h-5" />
                <span className="font-bold text-slate-800 text-sm">Python Script Editor</span>
              </div>
              
              {/* Preset Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Presets:</span>
                <select 
                  onChange={(e) => {
                    const preset = PRESETS.find(p => p.name === e.target.value);
                    if (preset) handleSelectPreset(preset);
                  }}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all cursor-pointer shadow-sm"
                >
                  {PRESETS.map((p, idx) => (
                    <option key={idx} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Monospace Code Editor Block */}
            <div className="relative flex-1 min-h-[400px] flex bg-slate-900 border-b border-slate-200">
              {/* Simple Editor Line Numbering Gutter */}
              <div className="py-6 px-4 bg-slate-950 text-slate-600 text-right select-none font-mono text-sm border-r border-slate-800">
                {Array.from({ length: code.split('\n').length || 1 }).map((_, i) => (
                  <div key={i} className="h-6 leading-6">{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                className="flex-1 p-6 font-mono text-sm text-slate-100 bg-transparent resize-none leading-6 focus:outline-none font-medium h-full min-h-[400px] overflow-y-auto outline-none selection:bg-slate-700"
              />
            </div>

            {/* Execution Footer Controls */}
            <div className="p-6 bg-slate-50 flex items-center justify-between">
              <button 
                onClick={() => setCode(PRESETS[0].code)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-100 text-xs font-bold text-slate-600 rounded-xl transition-all"
                disabled={loading}
              >
                Reset Default Code
              </button>
              
              <button 
                onClick={handleRunScript}
                disabled={loading}
                className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/10 flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-white" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    Execute Python Script
                  </>
                )}
              </button>
            </div>
          </div>
          
          {explanation && (
            <div className="bg-primary-50 border border-primary-200 p-6 rounded-[1.5rem] flex gap-3 text-primary-900">
              <BookOpen size={20} className="text-primary-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm mb-1 text-primary-800">Analytic Insight Explanation:</p>
                <p className="text-xs text-primary-750 font-medium leading-relaxed">{explanation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Terminal logs panel */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="bg-slate-950 rounded-[2rem] border border-slate-800 overflow-hidden shadow-xl flex flex-col h-full min-h-[500px]">
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Terminal className="text-emerald-400 w-4.5 h-4.5" />
                <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest">stdout / Terminal output</span>
              </div>
              
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* Console Output Logs */}
            <div className="flex-1 p-6 font-mono text-xs overflow-y-auto selection:bg-emerald-800/20">
              <div className="text-slate-500 mb-4 text-[10px] uppercase tracking-wider font-bold">
                [SYSTEM LOG] Connecting to virtual standard input-output pipe...
              </div>
              
              {/* Output log */}
              {stdout && (
                <pre className="text-slate-100 whitespace-pre-wrap leading-relaxed font-mono">
                  {stdout}
                </pre>
              )}

              {/* Error log */}
              {stderr && (
                <div className="text-rose-400 mt-4 whitespace-pre-wrap leading-relaxed bg-rose-950/30 border border-rose-900/30 p-4 rounded-xl font-mono">
                  <div className="flex items-center gap-2 text-rose-500 font-bold mb-1.5 text-[10px] uppercase tracking-wider">
                    <AlertTriangle size={12} />
                    Execution stderr
                  </div>
                  {stderr}
                </div>
              )}
            </div>

            {/* Footer Console Stats */}
            <div className="px-6 py-4.5 bg-slate-900/40 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono select-none">
              <span className="text-slate-500">LINE CODES: UTF-8</span>
              <span className={cn(
                "px-2 py-0.5 rounded uppercase font-bold text-[9px] tracking-wider",
                isSimulated 
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              )}>
                {isSimulated ? "⚡ AI Virtualized" : "🟢 Native Sandbox"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
