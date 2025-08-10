import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
  currentTheme: 'mountain' | 'desert' | 'default';
}

const initialState: ThemeState = {
  isDarkMode: false,
  currentTheme: 'default',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { toggleDarkMode, setTheme } = themeSlice.actions;
export default themeSlice.reducer;