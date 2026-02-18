import { useGetTimeEntriesQuery } from '@/store/api/timeEntriesApi';
import { formatDuration } from '@timeblocks/shared/utils';
import { Spinner } from '@/components/ui/Spinner';
import styles from './TodayStats.module.scss';

export function TodayStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: entries = [], isLoading } = useGetTimeEntriesQuery({
    startDate: today.toISOString(),
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  // Calculate total time for today
  const totalSeconds = entries.reduce((sum, entry) => sum + (entry.duration || 0), 0);

  // Count number of entries
  const entryCount = entries.length;

  // Get unique projects worked on today
  const uniqueProjects = new Set(
    entries.map((entry) => entry.project?.name).filter(Boolean)
  );

  return (
    <div className={styles.todayStats}>
      <h3 className={styles.title}>Today's Summary</h3>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.icon}>⏱️</div>
          <div className={styles.content}>
            <span className={styles.value}>
              {formatDuration(totalSeconds)}
            </span>
            <span className={styles.label}>Total Time</span>
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.icon}>📝</div>
          <div className={styles.content}>
            <span className={styles.value}>{entryCount}</span>
            <span className={styles.label}>
              {entryCount === 1 ? 'Entry' : 'Entries'}
            </span>
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.icon}>📊</div>
          <div className={styles.content}>
            <span className={styles.value}>{uniqueProjects.size}</span>
            <span className={styles.label}>
              {uniqueProjects.size === 1 ? 'Project' : 'Projects'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
