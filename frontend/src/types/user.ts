export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Student extends User {
  role: 'student';
  enrollmentNumber: string;
  program: string;
  semester: number;
  batch: string;
}

export interface Faculty extends User {
  role: 'faculty';
  employeeId: string;
  department: string;
  designation: string;
  joiningDate: string;
}

export interface Admin extends User {
  role: 'admin';
  employeeId: string;
  department: string;
  accessLevel: 'full' | 'limited';
}