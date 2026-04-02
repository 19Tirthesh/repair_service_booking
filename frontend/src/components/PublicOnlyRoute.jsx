import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicOnlyRoute = ({ children }) => {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-500">
        Loading session…
      </div>
    );
  }

  if (user?.token) {
    return <Navigate to="/tasks" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
