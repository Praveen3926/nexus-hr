import { Employee, AIInsight } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@amdox.com',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    status: 'Active',
    dateJoined: '2021-03-15',
    performanceScore: 4.8,
    attritionRisk: 'Low',
    salary: 125000,
    location: 'Bangalore, IN'
  },
  {
    id: 'EMP002',
    firstName: 'Marcus',
    lastName: 'Johnson',
    email: 'marcus.j@amdox.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'Active',
    dateJoined: '2022-01-10',
    performanceScore: 4.2,
    attritionRisk: 'Medium',
    salary: 110000,
    location: 'Seattle, WA'
  },
  {
    id: 'EMP003',
    firstName: 'Elena',
    lastName: 'Rodriguez',
    email: 'elena.r@amdox.com',
    role: 'HR Business Partner',
    department: 'Human Resources',
    status: 'Active',
    dateJoined: '2023-06-20',
    performanceScore: 3.9,
    attritionRisk: 'High',
    salary: 95000,
    location: 'Madrid, ES'
  },
  {
    id: 'EMP004',
    firstName: 'David',
    lastName: 'Smith',
    email: 'david.s@amdox.com',
    role: 'UX Designer',
    department: 'Design',
    status: 'Active',
    dateJoined: '2022-11-05',
    performanceScore: 4.5,
    attritionRisk: 'Low',
    salary: 105000,
    location: 'London, UK'
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    type: 'attrition',
    title: 'High Attrition Risk in Engineering',
    description: 'Based on recent engagement survey scores and tenure patterns, 15% of Senior Engineers show high attrition markers.',
    impact: 'High',
    recommendedActions: ['Perform stay interviews', 'Review market compensation adjustment']
  },
  {
    type: 'skill_gap',
    title: 'Generative AI Skill Gap identified',
    description: 'Current technical stack requires upskilling in LLM orchestration for 60% of the backend team.',
    impact: 'Medium',
    recommendedActions: ['Launch "Spring AI" certification program', 'Internal hackathon']
  }
];
