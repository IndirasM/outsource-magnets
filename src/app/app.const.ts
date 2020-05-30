export interface LearningDays {
  learningDayId: number;
  subjectId: number,
  title: string;
  date: any;
}

export interface EmployeesLearningDays {
  employeeId: number;
  employeeName: string;
  title: string;
  date: string;
  subjectId: number;
}

export interface GlobalLimits {
  limitId: number;
  yearLimit: number;
  monthLimit: number;
  rowLimit: number;
}

export interface UserLimits {
  limitId: number;
  isGlobal: boolean;
  yearLimit: number;
  monthLimit: number;
  rowLimit: number;
  isBoss: boolean;
}

export interface EmployeesLimits {
  employeeId: number;
  employeeName: string;
  limitId: number;
  isGlobal: boolean;
  yearLimit: number;
  monthLimit: number;
  rowLimit: number;
}

export class Limit {
  limitId: number;
  isGlobal: boolean;
  yearLimit: number;
  monthLimit: number;
  rowLimit: number;
}
