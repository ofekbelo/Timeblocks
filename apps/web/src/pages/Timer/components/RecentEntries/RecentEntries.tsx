import { useGetTimeEntriesQuery } from '@/store/api/timeEntriesApi';
import { formatDuration } from '@timeblocks/shared/utils';
import { Spinner } from '@/components/ui/Spinner';
import styles from './RecentEntries.module.scss';

export function RecentEntries() {
  const { data: entries = [], isLoading } = useGetTimeEntriesQuery({
    limit: 5,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className={styles.recentEntries}>
        <h3 className={styles.title}>Recent Entries</h3>
        <div className={styles.empty}>
          <p>No recent entries yet.</p>
          <p className={styles.emptyHint}>Start a timer to track your time!</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
      return `Today at ${date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      })}`;
    } else if (isYesterday) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      })}`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className={styles.recentEntries}>
      <h3 className={styles.title}>Recent Entries</h3>
      <div className={styles.list}>
        {entries.map((entry) => (
          <div key={entry.id} className={styles.entry}>
            <div
              className={styles.projectIndicator}
              style={{ backgroundColor: entry.project?.color || '#4A90E2' }}
            />
            <div className={styles.content}>
              <div className={styles.header}>
                <span className={styles.projectName}>
                  {entry.project?.name || 'Unknown Project'}
                </span>
                <span className={styles.duration}>
                  {formatDuration(entry.duration || 0)}
                </span>
              </div>
              {entry.description && (
                <p className={styles.description}>{entry.description}</p>
              )}
              <p className={styles.timestamp}>{formatDate(entry.startTime)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
