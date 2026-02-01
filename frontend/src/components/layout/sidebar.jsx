import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { sidebarMenu } from "../../config/sidebarMenu";

const Sidebar = ({ open, onClose }) => {
  const { user } = useAuth();

  const menus = sidebarMenu[user?.role] || [];

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-full transition
     ${
       isActive
         ? "bg-slate-700 text-white"
         : "text-slate-300 hover:bg-slate-700 hover:text-white"
     }`;

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50
        w-64 h-screen bg-slate-800
        p-6
        transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white">Inventaris System</h2>
        <button className="md:hidden text-white" onClick={onClose}>
          ✕
        </button>
      </div>

      <nav className="flex flex-col gap-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            end={menu.path.split("/").length === 3}
            className={linkClass}
          >
            {menu.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
