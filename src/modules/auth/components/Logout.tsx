import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../state';

export const LogoutButton = () => {
  const { removeUser } = useAuthState();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-auto bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
    >
      Logout
    </button>
  );
};
