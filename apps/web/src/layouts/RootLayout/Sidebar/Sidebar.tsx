import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleSidebar } from '@/store/slices/uiSlice';
import styles from './Sidebar.module.scss';

export function Sidebar() {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const dispatch = useAppDispatch();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: '📊' },
    { to: '/timer', label: 'Timer', icon: '⏱️' },
    { to: '/projects', label: 'Projects', icon: '📁' },
    { to: '/clients', label: 'Clients', icon: '👥' },
    { to: '/time-entries', label: 'Time Entries', icon: '📝' },
    { to: '/reports', label: 'Reports', icon: '📈' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⏰</span>
          {sidebarOpen && <span className={styles.logoText}>TimeBlocks</span>}
        </div>
        <button
          className={styles.toggleBtn}
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            {sidebarOpen && <span className={styles.label}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
