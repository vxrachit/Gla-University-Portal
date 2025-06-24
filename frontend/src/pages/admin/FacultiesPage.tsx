import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

interface Faculty {
  id: number;
  name: string;
  email: string;
}
const BASE_URL = import.meta.env.VITE_API_URL;
const FacultiesPage: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/faculties`);
      if (response.data && Array.isArray(response.data.faculties)) {
        setFaculties(response.data.faculties);
      } else {
        console.warn('Unexpected response format:', response.data);
        setFaculties([]);
      }
    } catch (error) {
      console.error('Failed to fetch faculties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/admin/faculty/${id}`);
      setFaculties((prev) => prev.filter((faculty) => faculty.id !== id));
    } catch (error) {
      console.error('Failed to delete faculty:', error);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Faculty Members</h1>
      {loading ? (
        <p>Loading...</p>
      ) : faculties.length === 0 ? (
        <p>No faculty members found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {faculties.map((faculty) => (
              <tr key={faculty.id}>
                <td className="px-6 py-4">{faculty.name}</td>
                <td className="px-6 py-4">{faculty.email}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(faculty.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="inline h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultiesPage;
