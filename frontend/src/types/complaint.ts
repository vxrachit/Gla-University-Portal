export type ComplaintCategory = 'academic' | 'infrastructure' | 'services' | 'it' | 'other';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ComplaintStatus = 'new' | 'inprogress' | 'resolved' | 'closed' | 'reopened';

export interface Complaint {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  resolutionDetails?: string;
  attachments?: string[];
}