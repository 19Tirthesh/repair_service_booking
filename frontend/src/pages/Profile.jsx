import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { apiPaths } from '../config/api';

const Profile = () => {
  const { user, updateSession } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [role, setRole] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(apiPaths.auth.profile, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: '',
        });
        setRole(response.data.role || '');
        setCreatedAt(response.data.created_at || '');
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
      };
      if (formData.password) payload.password = formData.password;
      const response = await axiosInstance.put(apiPaths.auth.profile, payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const d = response.data;
      updateSession({
        id: d.id,
        name: d.name,
        email: d.email,
        role: d.role,
        created_at: d.created_at,
        token: d.token ?? user.token,
      });
      setFormData((prev) => ({ ...prev, password: '' }));
      setRole(d.role || '');
      setCreatedAt(d.created_at || '');
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name && !formData.email) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
        {role && (
          <p className="text-sm text-gray-600 mb-2">
            Role: <span className="font-medium capitalize">{role}</span>
          </p>
        )}
        {createdAt && (
          <p className="text-sm text-gray-500 mb-4">
            Member since: {new Date(createdAt).toLocaleString()}
          </p>
        )}
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="New password (leave blank to keep current)"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
