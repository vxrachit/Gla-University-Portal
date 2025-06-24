import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiTrash2, FiUser, FiMail, FiBook, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
  photo?: string;
}

const StudentsDetails: React.FC = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/faculty/students`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      const res = await fetch(`${BASE_URL}/faculty/students/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
      } else {
        throw new Error('Failed to delete');
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Student Management</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
            <FiUsers className="text-gray-500 mr-2" />
            <span className="text-gray-700 font-medium">{students.length} Students</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : students.length === 0 ? (
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
            <FiUser className="mx-auto text-5xl text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No students found</h3>
            <p className="text-gray-500 mt-2">Add new students to get started</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {students.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-all duration-200"
              >
                <div className="p-5">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img
                        src={student.photo || '/avatar-placeholder.png'}
                        alt={student.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-semibold text-center text-gray-800 mb-1">
                    {student.name}
                  </h2>
                  
                  <div className="flex items-start text-gray-600 text-sm mt-4 mb-2">
                    <FiMail className="mt-1 mr-2 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  
                  <div className="flex items-start text-gray-600 text-sm mb-5">
                    <FiBook className="mt-1 mr-2 text-gray-500 flex-shrink-0" />
                    <span>{student.department}</span>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="flex items-center px-4 py-2 text-sm bg-white text-red-600 rounded-md border border-red-100 hover:bg-red-50 transition-colors duration-200"
                    >
                      <FiTrash2 className="mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentsDetails;