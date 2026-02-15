import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiHome, FiFileText, FiPlusCircle, FiBriefcase, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initial =
    user?.displayName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    'U';

  const linkBase = 'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors';
  const linkActive = 'bg-primary text-white';
  const linkInactive = 'text-gray-700 hover:bg-gray-100';

  return (
    <aside className="w-[260px] bg-white border-r border-gray-200 fixed top-0 left-0 bottom-0 z-50 flex flex-col">
      {/* Brand */}
      <div className="px-5 py-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary">ProCV UAE</h1>
        <span className="text-xs text-gray-400 mt-0.5 block">Smart CV Builder</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-1">
        <NavLink to="/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
          <FiHome className="text-lg" /> Dashboard
        </NavLink>
        <NavLink to="/my-cvs" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
          <FiFileText className="text-lg" /> My CVs
        </NavLink>
        <NavLink to="/create-cv" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
          <FiPlusCircle className="text-lg" /> Create CV
        </NavLink>
        <NavLink to="/applications" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
          <FiBriefcase className="text-lg" /> Applications
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-primary-light text-white flex items-center justify-center font-semibold text-sm shrink-0">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{user?.displayName || 'User'}</div>
            <div className="text-[11px] text-gray-400 truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition w-full mt-2 cursor-pointer"
        >
          <FiLogOut /> Sign Out
        </button>
      </div>
    </aside>
  );
}
