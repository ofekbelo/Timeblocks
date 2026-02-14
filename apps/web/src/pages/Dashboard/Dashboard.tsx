import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppSelector } from '@/store/hooks';
import styles from './Dashboard.module.scss';

export function Dashboard() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Welcome back, {user?.fullName || 'User'}!</h1>
          <p>Here's what's happening with your time tracking today.</p>
        </div>
        <Button variant="primary">Start Timer</Button>
      </div>

      <div className={styles.grid}>
        <Card variant="elevated">
          <div className={styles.stat}>
            <div className={styles.statValue}>0h 00m</div>
            <div className={styles.statLabel}>Today</div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className={styles.stat}>
            <div className={styles.statValue}>0h 00m</div>
            <div className={styles.statLabel}>This Week</div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className={styles.stat}>
            <div className={styles.statValue}>0</div>
            <div className={styles.statLabel}>Projects</div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className={styles.stat}>
            <div className={styles.statValue}>0</div>
            <div className={styles.statLabel}>Clients</div>
          </div>
        </Card>
      </div>

      <Card variant="elevated">
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.emptyState}>
          <p>No time entries yet. Start tracking your time!</p>
          <Button variant="primary">Start Timer</Button>
        </div>
      </Card>
    </div>
  );
}
