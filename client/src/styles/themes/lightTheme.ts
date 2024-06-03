import { ThemeOptions } from '@mui/material/styles';

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#453C38',
    },
    secondary: {
      main: '#F4EFDB',
    },
    background: {
      default: '#BCA88E',
      paper: '#A8A8A9',
    },
    error: {
      main: '#a20b0b',
    },
    warning: {
      main: '#d2640b',
    },
    info: {
      main: '#11436b',
    },
    success: {
      main: '#0f4312',
    },
    text: {
      secondary: 'rgba(39,39,39,0.6)',
      disabled: 'rgba(65,64,64,0.38)',
    },
  },
};