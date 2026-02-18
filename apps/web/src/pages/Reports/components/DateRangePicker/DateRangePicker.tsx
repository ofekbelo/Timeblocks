import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './DateRangePicker.module.scss';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface Props {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangePicker({ value, onChange }: Props) {
  const [customMode, setCustomMode] = useState(false);

  const setQuickRange = (days: number) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    onChange({ startDate, endDate });
    setCustomMode(false);
  };

  const handleCustomChange = (type: 'start' | 'end', dateString: string) => {
    const date = new Date(dateString);
    if (type === 'start') {
      onChange({ ...value, startDate: date });
    } else {
      onChange({ ...value, endDate: date });
    }
  };

  return (
    <Card variant="outlined" padding="lg">
      <div className={styles.dateRangePicker}>
        <div className={styles.quickRanges}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuickRange(0)}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuickRange(7)}
          >
            Last 7 Days
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuickRange(30)}
          >
            Last 30 Days
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuickRange(90)}
          >
            Last 90 Days
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCustomMode(true)}
          >
            Custom
          </Button>
        </div>

        {customMode && (
          <div className={styles.customRange}>
            <div className={styles.field}>
              <label>From</label>
              <input
                type="date"
                value={value.startDate.toISOString().split('T')[0]}
                onChange={(e) => handleCustomChange('start', e.target.value)}
                className={styles.dateInput}
              />
            </div>
            <div className={styles.field}>
              <label>To</label>
              <input
                type="date"
                value={value.endDate.toISOString().split('T')[0]}
                onChange={(e) => handleCustomChange('end', e.target.value)}
                className={styles.dateInput}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
