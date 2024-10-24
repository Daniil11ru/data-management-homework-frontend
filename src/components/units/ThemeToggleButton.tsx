import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../pages/utils/ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { toggleTheme, themeMode } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggleButton;
