import { useMemo } from 'react';
import { formatDuration } from '@timeblocks/shared/utils';
import type { TimeEntryWithProject } from '@timeblocks/shared/types';
import { Card } from '@/components/ui/Card';
import styles from './SummaryReport.module.scss';

interface Props {
  entries: TimeEntryWithProject[];
}

export function SummaryReport({ entries }: Props) {
  const stats = useMemo(() => {
    const totalSeconds = entries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
    const uniqueProjects = new Set(
      entries.map((entry) => entry.project.id)
    ).size;

    return {
      totalTime: formatDuration(totalSeconds),
      totalEntries: entries.length,
      totalProjects: uniqueProjects,
    };
  }, [entries]);

  return (
    <div className={styles.summaryReport}>
      <Card variant="outlined" padding="lg">
        <div className={styles.stat}>
          <div className={styles.label}>Total Time</div>
          <div className={styles.value}>{stats.totalTime}</div>
        </div>
      </Card>

      <Card variant="outlined" padding="lg">
        <div className={styles.stat}>
          <div className={styles.label}>Total Entries</div>
          <div className={styles.value}>{stats.totalEntries}</div>
        </div>
      </Card>

      <Card variant="outlined" padding="lg">
        <div className={styles.stat}>
          <div className={styles.label}>Projects</div>
          <div className={styles.value}>{stats.totalProjects}</div>
        </div>
      </Card>
    </div>
  );
}
