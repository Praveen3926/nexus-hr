export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Terminated' | 'Onboarding';
  dateJoined: string;
  avatar?: string;
  performanceScore: number;
  attritionRisk: 'Low' | 'Medium' | 'High';
  salary: number;
  managerId?: string;
  location: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: 'Paid' | 'Pending' | 'Processing';
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
}

export interface AIInsight {
  type: 'attrition' | 'skill_gap' | 'retention_plan' | 'hiring_forecast';
  title: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  recommendedActions: string[];
}
