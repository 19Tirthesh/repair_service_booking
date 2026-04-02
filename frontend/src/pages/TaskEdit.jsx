import { useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

const TaskEdit = () => {
  const { id } = useParams();
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <TaskForm repairRequestId={id} />
    </div>
  );
};

export default TaskEdit;
