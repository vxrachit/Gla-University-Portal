import React, { useState } from 'react';

const CreateFaculty: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      const res = await fetch(`${BASE_URL}/admin/create-faculty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to create faculty');
      }

      const data = await res.json();
      setSuccess(`Faculty created successfully! ID: ${data.faculty_id}`);
      setFormData({ name: '', email: '', password: '' ,department:''});
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Faculty Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Faculty Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Faculty Department"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Faculty Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default CreateFaculty;
