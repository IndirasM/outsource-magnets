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
