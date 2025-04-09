import { createTheme, ThemeOptions } from '@mui/material/styles';

// Add custom color options to palette
declare module '@mui/material/styles' {
  interface Palette {
    growth: Palette['primary'];
    energy: Palette['primary'];
  }
  interface PaletteOptions {
    growth?: PaletteOptions['primary'];
    energy?: PaletteOptions['primary'];
  }
}

// Base theme configuration
const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
  },
};

// Light theme options
const lightThemeOptions: ThemeOptions = {
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#4CAF50', // Fresh Mint Green
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#2C3E50', // Navy Blue
      light: '#546E7A',
      dark: '#1B2631',
      contrastText: '#fff',
    },
    growth: {
      main: '#FFEB3B', // Golden Yellow
      light: '#FFF176',
      dark: '#FBC02D',
      contrastText: '#000',
    },
    energy: {
      main: '#FF7043', // Coral Orange
      light: '#FF8A65',
      dark: '#E64A19',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F5F5', // Light Gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50', // Navy Blue for text
      secondary: '#546E7A',
    },
  },
};

// Dark theme options
const darkThemeOptions: ThemeOptions = {
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#81C784', // Lighter Mint Green for dark mode
      light: '#A5D6A7',
      dark: '#4CAF50',
      contrastText: '#fff',
    },
    secondary: {
      main: '#546E7A', // Lighter Navy Blue for dark mode
      light: '#78909C',
      dark: '#37474F',
      contrastText: '#fff',
    },
    growth: {
      main: '#FFF176', // Lighter Yellow for dark mode
      light: '#FFF59D',
      dark: '#FFEB3B',
      contrastText: '#000',
    },
    energy: {
      main: '#FF8A65', // Lighter Orange for dark mode
      light: '#FFAB91',
      dark: '#FF7043',
      contrastText: '#fff',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
