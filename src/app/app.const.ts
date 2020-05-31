export interface LearningDays {
  learningDayId: number;
  subjectId: number;
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
  employeeId: number;
  limitId: number;
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

export interface SetGlobalLimitRequestModel {
  yearLimit: number;
  monthLimit: number;
  rowLimit: number;
}

export interface SetEmployeeLimits {
  yearLimit: number;
  monthLimit: number;
  rowLimit: number;
}

export interface Team {
  teamId: number;
  name: string;
  managerId: number;
  managerName: string;
}

export interface LearnedSubjectsByTeam {
  subjectId: number;
  subjectName: string;
  employees: string[];
}

export interface SubjectsToLearnByTeam {
  subjectId: number;
  subjectName: string;
  employees: string[];
}
