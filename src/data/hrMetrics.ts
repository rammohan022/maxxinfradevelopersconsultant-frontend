export type MetricCategory = 
  | 'All Metrics'
  | 'Recruitment'
  | 'Retention'
  | 'Attendance'
  | 'Payroll'
  | 'Performance';

export interface HRMetric {
  id: string;
  name: string;
  category: MetricCategory;
  description: string;
  formula: string;
  example: string;
  exampleHighlight?: string; // e.g. "Turnover Rate = 10%"
  interpret: string;
  interpretTip?: string;
  benchmark: {
    good: string;
    average: string;
    high: string;
  };
  whyItMatters: string;
  relatedMetrics: string[];
}

export const hrMetricsData: HRMetric[] = [
  {
    id: '01',
    name: 'Employee Turnover Rate',
    category: 'Retention',
    description: 'Measures the percentage of employees who leave the organization during a specific period.',
    formula: 'Employee Turnover Rate = ( Number of Employee Exits / Average Number of Employees ) x 100',
    example: 'If 12 employees left during the year and the average number of employees is 120.\n( 12 / 120 ) x 100 = 10%',
    exampleHighlight: 'Turnover Rate = 10%',
    interpret: 'A lower turnover rate indicates better employee satisfaction and retention. Compare this metric over time and with industry benchmarks.',
    interpretTip: 'High turnover may indicate issues in engagement, compensation, management or work environment.',
    benchmark: {
      good: '< 10%',
      average: '10% - 20%',
      high: '> 20%',
    },
    whyItMatters: 'Helps in understanding employee stability, recruitment planning and retention effectiveness.',
    relatedMetrics: ['Attrition Rate', 'Retention Rate', 'Employee Engagement Score', 'Absenteeism Rate'],
  },
  {
    id: '02',
    name: 'Time to Hire',
    category: 'Recruitment',
    description: 'Measures the number of days between when a candidate enters the hiring process and when they accept the offer.',
    formula: 'Time to Hire = Date of Offer Acceptance - Date Candidate Entered Process',
    example: 'A candidate applies on Jan 1st and accepts the offer on Jan 20th.',
    exampleHighlight: 'Time to Hire = 20 Days',
    interpret: 'Shorter time to hire indicates a more efficient recruitment process. Delays can lead to losing top talent.',
    interpretTip: 'Long time to hire might suggest slow decision making or a complex interview process.',
    benchmark: {
      good: '< 20 Days',
      average: '20 - 40 Days',
      high: '> 40 Days',
    },
    whyItMatters: 'Optimizes recruitment costs and improves candidate experience.',
    relatedMetrics: ['Time to Fill', 'Cost per Hire', 'Offer Acceptance Rate'],
  },
  {
    id: '03',
    name: 'Time to Fill',
    category: 'Recruitment',
    description: 'Measures the total time elapsed between the approval of a job requisition and a candidate accepting the job offer.',
    formula: 'Time to Fill = Date of Offer Acceptance - Date Requisition Approved',
    example: 'Job approved on Jan 1st, candidate accepts offer on Jan 30th.',
    exampleHighlight: 'Time to Fill = 30 Days',
    interpret: 'A critical metric for business planning. High time to fill means prolonged productivity loss.',
    benchmark: {
      good: '< 30 Days',
      average: '30 - 45 Days',
      high: '> 45 Days',
    },
    whyItMatters: 'Directly impacts organizational capability and project delivery.',
    relatedMetrics: ['Time to Hire', 'Quality of Hire'],
  },
  {
    id: '04',
    name: 'Cost per Hire',
    category: 'Recruitment',
    description: 'The average cost incurred to hire a new employee, including both internal and external costs.',
    formula: 'Cost per Hire = ( Internal Recruiting Costs + External Recruiting Costs ) / Total Number of Hires',
    example: 'Total costs are $10,000 for 5 hires.',
    exampleHighlight: 'Cost per Hire = $2,000',
    interpret: 'Lowering this cost without sacrificing candidate quality is a primary goal for talent acquisition.',
    benchmark: {
      good: 'Below Industry Avg',
      average: 'Industry Avg',
      high: 'Above Industry Avg',
    },
    whyItMatters: 'Helps in HR budget planning and evaluating recruitment channel efficiency.',
    relatedMetrics: ['Time to Hire', 'Quality of Hire'],
  },
  {
    id: '05',
    name: 'Offer Acceptance Rate',
    category: 'Recruitment',
    description: 'The percentage of job offers extended to candidates that are accepted.',
    formula: 'Offer Acceptance Rate = ( Number of Offers Accepted / Number of Offers Extended ) x 100',
    example: '10 offers extended, 8 accepted. (8 / 10) x 100 = 80%',
    exampleHighlight: 'Offer Acceptance Rate = 80%',
    interpret: 'A high rate means your compensation and employer brand are competitive.',
    interpretTip: 'A low rate might indicate issues with compensation packages or employer branding.',
    benchmark: {
      good: '> 90%',
      average: '80% - 90%',
      high: '< 80%',
    },
    whyItMatters: 'Indicates the competitiveness of your offers in the talent market.',
    relatedMetrics: ['Cost per Hire', 'Time to Hire'],
  },
  {
    id: '06',
    name: 'Attrition Rate',
    category: 'Retention',
    description: 'The rate at which employees voluntarily or involuntarily leave the workforce over a period.',
    formula: 'Attrition Rate = ( Number of Attritions / Average Number of Employees ) x 100',
    example: '5 employees left, average workforce is 100. (5 / 100) x 100 = 5%',
    exampleHighlight: 'Attrition Rate = 5%',
    interpret: 'Similar to turnover but often includes retirements and other uncontrollable factors.',
    benchmark: {
      good: '< 10%',
      average: '10% - 15%',
      high: '> 15%',
    },
    whyItMatters: 'Essential for succession planning and workforce management.',
    relatedMetrics: ['Turnover Rate', 'Retention Rate'],
  },
  {
    id: '07',
    name: 'Retention Rate',
    category: 'Retention',
    description: 'The percentage of employees who remain in the organization over a specific period.',
    formula: 'Retention Rate = ( (Total Employees at Start - Employees Left) / Total Employees at Start ) x 100',
    example: 'Started with 100, 10 left. ((100 - 10) / 100) x 100 = 90%',
    exampleHighlight: 'Retention Rate = 90%',
    interpret: 'High retention implies strong organizational culture and employee satisfaction.',
    benchmark: {
      good: '> 90%',
      average: '80% - 90%',
      high: '< 80%',
    },
    whyItMatters: 'Reduces recruitment and training costs associated with high turnover.',
    relatedMetrics: ['Turnover Rate', 'Employee Engagement Score'],
  },
  {
    id: '08',
    name: 'Absenteeism Rate',
    category: 'Attendance',
    description: 'Measures the rate of unplanned absences due to sickness or other causes.',
    formula: 'Absenteeism Rate = ( Total Absent Days / Total Working Days Available ) x 100',
    example: '50 absent days out of 1000 total working days. (50 / 1000) x 100 = 5%',
    exampleHighlight: 'Absenteeism Rate = 5%',
    interpret: 'High rates can indicate burnout, low morale, or health and safety issues.',
    interpretTip: 'Persistent absenteeism can severely impact team productivity.',
    benchmark: {
      good: '< 2%',
      average: '2% - 4%',
      high: '> 4%',
    },
    whyItMatters: 'Helps identify potential issues in workplace culture and employee well-being.',
    relatedMetrics: ['Turnover Rate', 'Employee Engagement Score'],
  }
];
