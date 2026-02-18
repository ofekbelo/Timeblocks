import { useState, useMemo } from 'react';
import { useGetTimeEntriesQuery } from '@/store/api/timeEntriesApi';
import { DateRangePicker } from './components/DateRangePicker';
import { SummaryReport } from './components/SummaryReport';
import { ProjectBreakdown } from './components/ProjectBreakdown';
import styles from './Reports.module.scss';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

export function Reports() {
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30); // Default to last 30 days
    return { startDate, endDate };
  });

  const { data: allEntries = [], isLoading } = useGetTimeEntriesQuery();

  const filteredEntries = useMemo(() => {
    const startTime = dateRange.startDate.getTime();
    const endTime = dateRange.endDate.getTime();

    return allEntries.filter((entry) => {
      const entryDate = new Date(entry.startTime).getTime();
      return entryDate >= startTime && entryDate <= endTime;
    });
  }, [allEntries, dateRange]);

  return (
    <div className={styles.reports}>
      <div className={styles.header}>
        <h1>Reports & Analytics</h1>
        <p className={styles.subtitle}>
          Track your productivity and analyze time distribution across projects
        </p>
      </div>

      <div className={styles.content}>
        <DateRangePicker value={dateRange} onChange={setDateRange} />

        {isLoading ? (
          <div className={styles.loading}>Loading reports...</div>
        ) : (
          <>
            <SummaryReport entries={filteredEntries} />
            <ProjectBreakdown entries={filteredEntries} />
          </>
        )}
      </div>
    </div>
  );
}
