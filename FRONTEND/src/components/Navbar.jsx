import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Taskify</Link>
        <div className="space-x-4">
          {token ? (
            <>
              <Link to="/" className="hover:text-blue-200">Todos</Link>
              <button 
                onClick={logout} 
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 