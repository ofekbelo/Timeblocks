import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  startTimer,
  stopTimer,
  updateElapsedTime,
  updateDescription,
  setTimerId,
} from '@/store/slices/timerSlice';
import {
  useStartTimerMutation,
  useStopTimerMutation,
} from '@/store/api/timeEntriesApi';
import { useGetProjectsQuery } from '@/store/api/projectsApi';
import { formatDuration } from '@timeblocks/shared/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from './TimerControls.module.scss';

export function TimerControls() {
  const dispatch = useAppDispatch();
  const { activeTimer, isRunning } = useAppSelector((state) => state.timer);

  const { data: projects = [] } = useGetProjectsQuery();
  const [startTimerApi] = useStartTimerMutation();
  const [stopTimerApi] = useStopTimerMutation();

  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [description, setDescription] = useState('');

  // Update elapsed time every second when timer is running
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      dispatch(updateElapsedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  const handleStart = async () => {
    if (!selectedProjectId) {
      alert('Please select a project');
      return;
    }

    const project = projects.find((p) => p.id === selectedProjectId);
    if (!project) return;

    // Start timer in Redux
    dispatch(
      startTimer({
        projectId: project.id,
        projectName: project.name,
        projectColor: project.color,
        description,
      })
    );

    // Sync with backend
    try {
      const result = await startTimerApi({
        projectId: selectedProjectId,
        description: description || undefined,
      }).unwrap();

      // Store the backend ID
      dispatch(setTimerId(result.id));
    } catch (error) {
      console.error('Failed to start timer on backend:', error);
    }
  };

  const handleStop = async () => {
    // Stop timer in Redux
    dispatch(stopTimer());

    // Sync with backend
    try {
      await stopTimerApi().unwrap();
    } catch (error) {
      console.error('Failed to stop timer on backend:', error);
    }

    // Clear form
    setDescription('');
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    if (isRunning) {
      dispatch(updateDescription(value));
    }
  };

  return (
    <div className={styles.timerControls}>
      <div className={styles.display}>
        <div
          className={styles.timer}
          style={{
            borderColor: activeTimer?.projectColor || '#4A90E2',
          }}
        >
          <span className={styles.time}>
            {formatDuration(activeTimer?.elapsedSeconds || 0)}
          </span>
          {activeTimer && (
            <span className={styles.projectName}>
              {activeTimer.projectName}
            </span>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        {!isRunning ? (
          <>
            <div className={styles.field}>
              <label>Project</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className={styles.select}
              >
                <option value="">Select a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label>Description (optional)</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What are you working on?"
                fullWidth
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleStart}
              disabled={!selectedProjectId}
            >
              ▶️ Start Timer
            </Button>
          </>
        ) : (
          <>
            <div className={styles.field}>
              <label>Description</label>
              <Input
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="What are you working on?"
                fullWidth
              />
            </div>

            <Button
              variant="danger"
              size="lg"
              fullWidth
              onClick={handleStop}
            >
              ⏹️ Stop Timer
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
