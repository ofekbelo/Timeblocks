import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatDuration } from '@timeblocks/shared/utils';
import type { TimeEntryWithProject } from '@timeblocks/shared/types';
import { Card } from '@/components/ui/Card';
import styles from './ProjectBreakdown.module.scss';

interface Props {
  entries: TimeEntryWithProject[];
}

export function ProjectBreakdown({ entries }: Props) {
  const chartData = useMemo(() => {
    const projectMap = new Map<string, { name: string; seconds: number; color: string }>();

    entries.forEach((entry) => {
      const projectId = entry.project.id;
      const projectName = entry.project.name;
      const projectColor = entry.project.color;

      if (!projectMap.has(projectId)) {
        projectMap.set(projectId, {
          name: projectName,
          seconds: 0,
          color: projectColor,
        });
      }

      const project = projectMap.get(projectId)!;
      project.seconds += entry.duration || 0;
    });

    return Array.from(projectMap.values())
      .map((project) => ({
        name: project.name,
        value: project.seconds,
        color: project.color,
      }))
      .sort((a, b) => b.value - a.value);
  }, [entries]);

  const formatTooltip = (value: number | undefined) => {
    return value !== undefined ? formatDuration(value) : '';
  };

  if (chartData.length === 0) {
    return (
      <Card variant="outlined" padding="lg">
        <h3 className={styles.title}>Project Breakdown</h3>
        <div className={styles.empty}>No data available</div>
      </Card>
    );
  }

  return (
    <Card variant="outlined" padding="lg">
      <h3 className={styles.title}>Project Breakdown</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={formatTooltip} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
