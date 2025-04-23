import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'https://backend-production-9810.up.railway.app';

const Employees = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'cashier',
  });

  const [activeEmployees, setActiveEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const token = localStorage.getItem('token');

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE}/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const active = res.data.filter((emp) => emp.is_active);
      const deleted = res.data.filter((emp) => !emp.is_active);

      setActiveEmployees(active);
      setDeletedEmployees(deleted);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/employees`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Employee added!');
      setFormData({ name: '', email: '', password: '', role: 'cashier' });
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Error adding employee');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await axios.delete(`${API_BASE}/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert('Failed to delete employee');
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.post(`${API_BASE}/employees/${id}/restore`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert('Failed to restore employee');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">👥 Manage Employees</h2>

      {/* Add Employee Form */}
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow-md mb-10 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Add New Employee</h3>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="cashier">Cashier</option>
          <option value="stocker">Stocker</option>
          <option value="manager">Manager</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Add Employee
        </button>
      </form>

      {/* Active Employees */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Active Employees</h3>
        {activeEmployees.length === 0 ? (
          <p className="text-gray-500">No active employees found.</p>
        ) : (
          <table className="w-full text-sm border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeEmployees.map((emp) => (
                <tr key={emp.id} className="border-t">
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2 capitalize">{emp.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Deleted Employees */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Deleted Employees</h3>
        {deletedEmployees.length === 0 ? (
          <p className="text-gray-500">No deleted employees.</p>
        ) : (
          <table className="w-full text-sm border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deletedEmployees.map((emp) => (
                <tr key={emp.id} className="border-t">
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2 capitalize">{emp.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRestore(emp.id)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Employees;
