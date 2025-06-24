export interface BaseRequest {
  id: string;
  userId: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  remarks?: string;
}

export interface IDCardRequest extends BaseRequest {
  type: 'idcard';
  reason: 'new' | 'lost' | 'damaged';
  deliveryAddress?: string;
}

export interface LeaveRequest extends BaseRequest {
  type: 'leave';
  fromDate: string;
  toDate: string;
  reason: string;
  leaveType: 'casual' | 'sick' | 'earned' | 'academic';
  document?: string;
}