import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Blogify
        </Link>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                to="/create"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Create Blog
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="text-sm text-gray-700 hover:text-blue-600" to="/login">
                Login
              </Link>
              <Link
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
