export interface LearningDays {
  learningDayId: number;
  subjectId: number;
  title: string;
  date: any;
  notes: string;
}

export interface EmployeesLearningDays {
  employeeId: number;
  employeeName: string;
  title: string;
  date: string;
  subjectId: number;
  learningDayId: number;
  notes: string;
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
  employeeId: number;
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

export interface SetEmployeeSuggestedSubject {
  id: number;
}
