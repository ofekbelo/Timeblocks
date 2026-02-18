import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  activeTimer: {
    id: string | null;
    projectId: string | null;
    projectName: string | null;
    projectColor: string | null;
    description: string | null;
    startTime: string | null;
    elapsedSeconds: number;
  } | null;
  isRunning: boolean;
}

const loadTimerFromStorage = (): TimerState['activeTimer'] => {
  try {
    const stored = localStorage.getItem('activeTimer');
    if (stored) {
      const timer = JSON.parse(stored);
      // Calculate elapsed time since start
      const startTime = new Date(timer.startTime);
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      return {
        ...timer,
        elapsedSeconds,
      };
    }
  } catch (error) {
    console.error('Failed to load timer from storage:', error);
  }
  return null;
};

const initialState: TimerState = {
  activeTimer: loadTimerFromStorage(),
  isRunning: !!loadTimerFromStorage(),
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (
      state,
      action: PayloadAction<{
        projectId: string;
        projectName: string;
        projectColor: string;
        description?: string;
      }>
    ) => {
      const startTime = new Date().toISOString();
      state.activeTimer = {
        id: null, // Will be set when synced with backend
        projectId: action.payload.projectId,
        projectName: action.payload.projectName,
        projectColor: action.payload.projectColor,
        description: action.payload.description || null,
        startTime,
        elapsedSeconds: 0,
      };
      state.isRunning = true;

      // Save to localStorage
      localStorage.setItem('activeTimer', JSON.stringify(state.activeTimer));
    },

    stopTimer: (state) => {
      state.activeTimer = null;
      state.isRunning = false;
      localStorage.removeItem('activeTimer');
    },

    updateElapsedTime: (state) => {
      if (state.activeTimer && state.isRunning) {
        const startTime = new Date(state.activeTimer.startTime!);
        const now = new Date();
        state.activeTimer.elapsedSeconds = Math.floor(
          (now.getTime() - startTime.getTime()) / 1000
        );
      }
    },

    updateDescription: (state, action: PayloadAction<string>) => {
      if (state.activeTimer) {
        state.activeTimer.description = action.payload;
        // Update localStorage
        localStorage.setItem('activeTimer', JSON.stringify(state.activeTimer));
      }
    },

    setTimerId: (state, action: PayloadAction<string>) => {
      if (state.activeTimer) {
        state.activeTimer.id = action.payload;
        localStorage.setItem('activeTimer', JSON.stringify(state.activeTimer));
      }
    },
  },
});

export const {
  startTimer,
  stopTimer,
  updateElapsedTime,
  updateDescription,
  setTimerId,
} = timerSlice.actions;

export default timerSlice.reducer;
