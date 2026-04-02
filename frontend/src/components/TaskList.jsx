import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { apiPaths } from '../config/api';

const TaskList = ({ tasks, setTasks }) => {
  const { user } = useAuth();

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(apiPaths.repairRequests.byId(taskId), {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert('Failed to delete repair request.');
    }
  };

  const customerLabel = (c) => (c && typeof c === 'object' ? c.name : '—');
  const techLabel = (t) => (t && typeof t === 'object' ? t.name : '—');

  const formatStatus = (s) =>
    s ? String(s).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '—';

  if (!tasks.length) {
    return (
      <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500 mb-4">No repair requests yet.</p>
        <Link
          to="/tasks/new"
          className="text-blue-600 font-medium hover:underline"
        >
          Create your first repair request
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Issue
            </th>
            <th scope="col" className="px-4 py-3 font-semibold max-w-xs">
              Description
            </th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              Priority
            </th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              Status
            </th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              Customer
            </th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              Technician
            </th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              Created
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-right whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900 align-top">
                {task.issue_title}
              </td>
              <td className="px-4 py-3 text-gray-600 align-top max-w-xs">
                <span className="line-clamp-2" title={task.description}>
                  {task.description}
                </span>
              </td>
              <td className="px-4 py-3 capitalize align-top whitespace-nowrap">{task.priority}</td>
              <td className="px-4 py-3 align-top whitespace-nowrap">{formatStatus(task.status)}</td>
              <td className="px-4 py-3 text-gray-700 align-top whitespace-nowrap">
                {customerLabel(task.customer_id)}
              </td>
              <td className="px-4 py-3 text-gray-700 align-top whitespace-nowrap">
                {techLabel(task.technician_id)}
              </td>
              <td className="px-4 py-3 text-gray-500 align-top whitespace-nowrap text-xs">
                {task.created_at ? new Date(task.created_at).toLocaleString() : '—'}
              </td>
              <td className="px-4 py-3 align-top text-right whitespace-nowrap">
                <Link
                  to={`/tasks/${task._id}/edit`}
                  className="inline-block mr-2 bg-yellow-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
