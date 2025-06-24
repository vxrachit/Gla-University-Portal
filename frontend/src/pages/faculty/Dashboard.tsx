import React, { useEffect, useState } from 'react';
import { Users, CalendarClock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
interface LeaveRequest {
  id: number;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
}

const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchLeaves = async () => {
      try {
        console.log("Fetching leaves for faculty ID:", user.id);
        const res = await axios.get(`${BASE_URL}/faculty/${user.id}/leave`);

        console.log("Leaves API Response:", res.data);

        const leaves = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.leaves)
          ? res.data.leaves
          : [];

        setLeaveRequests(leaves);
      } catch (err) {
        console.error("Failed to fetch leave requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [user?.id]);

  const attendanceStats = {
    classes: 45,
    attended: 42,
    percentage: 93.33,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name}<br/>

          </p>
        </div>
        <div className="mt-4 sm:mt-0">
        <Link
  to="/faculty/leave"
  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition"
>
  <CalendarClock className="mr-2 h-4 w-4" />
  Request Leave
</Link>

        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/faculty/studentsdetails" className="dashboard-card">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">My Students</h3>
              <p className="text-sm text-gray-500">View student details</p>
            </div>
          </div>
        </Link>

        <Link to="/faculty/leave" className="dashboard-card">
          <div className="flex items-center">
            <CalendarClock className="h-8 w-8 text-secondary-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Leave Requests</h3>
              <p className="text-sm text-gray-500">
                {loading ? 'Loading...' : `${leaveRequests.length} total`}
              </p>
            </div>
          </div>
        </Link>

        <Link to="/faculty/attendance" className="dashboard-card">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-accent-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Attendance</h3>
              <p className="text-sm text-gray-500">
                {attendanceStats.percentage.toFixed(1)}% attendance rate
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Leave Requests</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading leaves...</p>
        ) : leaveRequests.length === 0 ? (
          <p className="text-sm text-gray-500">No leave requests submitted yet.</p>
        ) : (
          <div className="space-y-3">
            {leaveRequests.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{leave.reason}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(leave.start_date).toLocaleDateString()} - {new Date(leave.end_date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`status-badge ${
                  leave.status === 'approved'
                    ? 'status-approved'
                    : leave.status === 'rejected'
                    ? 'status-rejected'
                    : 'status-pending'
                }`}>
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
