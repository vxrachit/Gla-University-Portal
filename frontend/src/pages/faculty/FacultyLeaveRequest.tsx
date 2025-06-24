import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FacultyLeavePage: React.FC = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const fetchLeaves = () => {
    if (user?.id) {
      axios
        .get(`${BASE_URL}/faculty/${user.id}/leave`)
        .then((res) => setLeaves(res.data))
        .catch(() => setLeaves([]));
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      await axios.post(`${BASE_URL}/leave/request?faculty_id=${user?.id}`, {
        start_date: startDate,
        end_date: endDate,
        reason,
      });

      setMessage('✅ Leave request submitted successfully!');
      setStartDate('');
      setEndDate('');
      setReason('');
      fetchLeaves();
    } catch (err) {
      setMessage('❌ Failed to submit leave request.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Faculty Leave Requests</h1>

      {/* Leave Application Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-10 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Apply for Leave</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg shadow-sm resize-none focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-all"
          >
            Submit Request
          </button>

          {message && (
            <p className="text-sm mt-2 font-medium text-green-600">{message}</p>
          )}
        </form>
      </div>

      {/* Leave Request Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">My Leave History</h2>
        {leaves.length === 0 ? (
          <p className="text-gray-500">No leave requests submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm text-left border">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 border">Start Date</th>
                  <th className="px-4 py-3 border">End Date</th>
                  <th className="px-4 py-3 border">Reason</th>
                  <th className="px-4 py-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave: any) => (
                  <tr key={leave.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 border">{leave.start_date}</td>
                    <td className="px-4 py-2 border">{leave.end_date}</td>
                    <td className="px-4 py-2 border">{leave.reason}</td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            leave.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : leave.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyLeavePage;
