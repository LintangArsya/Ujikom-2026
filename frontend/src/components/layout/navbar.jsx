import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="
        fixed top-0
        left-0 md:left-64 right-0
        h-16
        bg-white shadow
        px-4 md:px-6
        flex items-center justify-between
        z-40
      "
    >
      <div className="flex items-center gap-3">
        {/* Hamburger */}
        <button
          className="md:hidden text-xl"
          onClick={onMenuClick}
        >
          ☰
        </button>

        <h1 className="font-semibold text-lg capitalize">
          Dashboard {user?.role}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden md:block text-sm text-gray-600">
          {user?.name}
        </span>

        <button
            onClick={handleLogout}
            className="
                flex items-center gap-2
                text-sm
                bg-red-500 text-white
                px-4 py-1.5
                rounded-md
                transition-all duration-200
                hover:bg-red-600
                active:scale-95"
        >
            Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
