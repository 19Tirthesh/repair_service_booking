import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { apiPaths } from '../config/api';

const emptyForm = { issue_title: '', description: '', priority: 'medium', status: 'open' };

const TaskForm = ({ repairRequestId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isEdit = Boolean(repairRequestId);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const isStaff = user?.role === 'technician' || user?.role === 'admin';

  const authHeader = useMemo(() => ({ Authorization: `Bearer ${user.token}` }), [user.token]);

  useEffect(() => {
    if (!isEdit) {
      setFormData(emptyForm);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(apiPaths.repairRequests.byId(repairRequestId), {
          headers: authHeader,
        });
        if (cancelled) return;
        const t = res.data;
        setFormData({
          issue_title: t.issue_title || '',
          description: t.description || '',
          priority: t.priority || 'medium',
          status: t.status || 'open',
        });
      } catch {
        if (!cancelled) {
          alert('Could not load repair request.');
          navigate('/tasks', { replace: true });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [repairRequestId, isEdit, authHeader, navigate]); // ✅ added missing dependencies

  const buildPayload = () => {
    if (isEdit && isStaff) {
      return {
        issue_title: formData.issue_title,
        description: formData.description,
        priority: formData.priority,
        status: formData.status,
      };
    }
    if (isEdit) {
      return {
        issue_title: formData.issue_title,
        description: formData.description,
        priority: formData.priority,
      };
    }
    return {
      issue_title: formData.issue_title,
      description: formData.description,
      priority: formData.priority,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await axiosInstance.put(
          apiPaths.repairRequests.byId(repairRequestId),
          buildPayload(),
          { headers: authHeader }
        );
      } else {
        await axiosInstance.post(apiPaths.repairRequests.root, buildPayload(), {
          headers: authHeader,
        });
      }
      navigate('/tasks');
    } catch {
      alert('Failed to save repair request.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-600">
        Loading…
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-4">
        <Link to="/tasks" className="text-blue-600 hover:underline text-sm">
          ← Back to repair requests
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded border border-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          {isEdit ? 'Edit repair request' : 'New repair request'}
        </h1>
        <input
          type="text"
          placeholder="Issue title"
          value={formData.issue_title}
          onChange={(e) => setFormData({ ...formData, issue_title: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full mb-4 p-2 border rounded min-h-[100px]"
          required
        />
        <label className="block text-sm text-gray-600 mb-1">Priority</label>
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        {isEdit && isStaff && (
          <>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="open">Open</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 text-white p-2 rounded disabled:opacity-60"
          >
            {saving ? 'Saving…' : isEdit ? 'Update' : 'Create'}
          </button>
          <Link
            to="/tasks"
            className="px-4 py-2 border border-gray-300 rounded text-center text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;