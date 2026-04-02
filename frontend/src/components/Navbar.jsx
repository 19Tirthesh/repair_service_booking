import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { apiPaths } from '../config/api';

const Navbar = () => {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    const token = user?.token;
    if (!token) {
      logout();
      navigate('/login');
      return;
    }
    setLoggingOut(true);
    try {
      await axiosInstance.post(
        apiPaths.auth.logout,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch {
      
    } finally {
      logout();
      navigate('/login');
      setLoggingOut(false);
    }
  };

  const isLoggedIn = ready && Boolean(user?.token);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Repair Management</Link>
      <div className="flex items-center gap-2">
        {!ready ? (
          <span className="text-sm text-blue-100">Loading…</span>
        ) : isLoggedIn ? (
          <>
            <Link to="/tasks" className="mr-4">Requests</Link>
            <Link to="/tasks/new" className="mr-4">New request</Link>
            <Link to="/profile" className="mr-4">Profile</Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60"
            >
              {loggingOut ? 'Logging out…' : 'Logout'}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
