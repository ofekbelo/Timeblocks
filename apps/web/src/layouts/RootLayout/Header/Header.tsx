import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useLogoutMutation } from '@/store/api/authApi';
import { logout } from '@/store/slices/authSlice';
import styles from './Header.module.scss';

export function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [logoutMutation] = useLogoutMutation();
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutMutation({ refreshToken }).unwrap();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(logout());
      navigate('/auth/login');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <input type="search" placeholder="Search..." />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} title="Notifications">
          🔔
        </button>

        <div className={styles.userMenu}>
          <div className={styles.avatar}>
            {user?.fullName?.charAt(0) || '👤'}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user?.fullName || 'User'}</div>
            <div className={styles.userEmail}>{user?.email || ''}</div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
