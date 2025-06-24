export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  department: string;
  facultyId?: string;
  semester: number;
  isActive: boolean;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: 'pending' | 'approved' | 'rejected';
}