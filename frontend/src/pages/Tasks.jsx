import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { apiPaths } from '../config/api';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchRepairRequests = async () => {
      try {
        const response = await axiosInstance.get(apiPaths.repairRequests.root, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(response.data);
      } catch (error) {
        alert('Failed to fetch repair requests.');
      }
    };

    if (user?.token) fetchRepairRequests();
  }, [user]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Repair requests</h1>
        <Link
          to="/tasks/new"
          className="inline-flex justify-center items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium text-sm"
        >
          New repair request
        </Link>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Tasks;
