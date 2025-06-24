import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface LeaveRequest {
  id: number;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  faculty_id: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AdminLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/leave/all`)
      .then((res) => setLeaves(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleApprove = (id: number) => {
    axios.put(`${BASE_URL}/leave/approve/${id}`)
      .then(() => {
        setLeaves((prev) =>
          prev.map((leave) =>
            leave.id === id ? { ...leave, status: 'approved' } : leave
          )
        );
      });
  };

  const handleReject = (id: number) => {
    axios.put(`${BASE_URL}/leave/reject/${id}`)
      .then(() => {
        setLeaves((prev) =>
          prev.map((leave) =>
            leave.id === id ? { ...leave, status: 'rejected' } : leave
          )
        );
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Faculty Leave Requests</h1>
      <div className="space-y-6">
        {leaves.map((leave) => (
          <div
            key={leave.id}
            className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="mb-3 space-y-1">
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Faculty ID:</span> {leave.faculty_id}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">From:</span> {leave.start_date}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">To:</span> {leave.end_date}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Reason:</span> {leave.reason}
              </p>
            </div>

            <p className="text-sm font-medium">
              Status:{' '}
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    leave.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : leave.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
              >
                {leave.status}
              </span>
            </p>

            {leave.status === 'pending' && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleApprove(leave.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(leave.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeaves;
