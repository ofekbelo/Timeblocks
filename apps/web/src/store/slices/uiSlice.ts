import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  modals: {
    [key: string]: boolean;
  };
}

const initialState: UiState = {
  sidebarOpen: true,
  theme: 'light',
  modals: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setTheme, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
