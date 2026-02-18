import { TimerControls } from './components/TimerControls';
import { RecentEntries } from './components/RecentEntries';
import { TodayStats } from './components/TodayStats';
import styles from './Timer.module.scss';

export function Timer() {
  return (
    <div className={styles.timerPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Timer</h1>
        <p className={styles.subtitle}>Track your time and stay productive</p>
      </header>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <TimerControls />
        </div>

        <div className={styles.sideSection}>
          <TodayStats />
          <RecentEntries />
        </div>
      </div>
    </div>
  );
}
