import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Sidebar } from './Sidebar/Sidebar';
import { Header } from './Header/Header';
import styles from './RootLayout.module.scss';

export function RootLayout() {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={`${styles.main} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <Header />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
