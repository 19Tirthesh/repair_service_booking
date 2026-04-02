import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomeRedirect = () => {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-500">
        Loading session…
      </div>
    );
  }

  return <Navigate to={user?.token ? '/tasks' : '/login'} replace />;
};

export default HomeRedirect;
