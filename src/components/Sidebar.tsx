import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/authService';
import { useUIStore } from '@/stores/uiStore';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', roles: ['admin', 'petugas', 'kader_pustu', 'kader_posyandu'] },
    { label: 'Screening', path: '/screening/ht', roles: ['petugas', 'kader_pustu', 'kader_posyandu'] },
    { label: 'Absensi', path: '/absensi', roles: ['admin', 'petugas'] },
    { label: 'Kunjungan Rumah', path: '/kunjungan-rumah', roles: ['kader_pustu'] },
    { label: 'Pemantauan Wilayah', path: '/pemantauan-wilayah', roles: ['kader_pustu'] },
    { label: 'Riwayat Screening', path: '/riwayat-screening', roles: ['admin', 'petugas', 'kader_pustu', 'kader_posyandu'] },
  ];

  const visibleMenus = menuItems.filter((item) => item.roles.includes(user?.role || ''));

  return (
    <>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>Pustu Dukuh</h1>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
        </div>

        <nav className="sidebar-nav">
          {visibleMenus.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;