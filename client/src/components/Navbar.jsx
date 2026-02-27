import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, setUser, userData, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">🛒</span>
          <span>MarketPlace</span>
        </Link>
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <span className="text-white hidden md:inline">Welcome, {userData?.username || 'User'}!</span>
              <Link to="/add" className="hover:text-blue-200 transition-colors duration-300 font-medium">
                Add Product
              </Link>
              <button 
                onClick={logout} 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
