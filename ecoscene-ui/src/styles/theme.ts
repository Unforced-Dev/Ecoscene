import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      regenerative: string;
      community: string;
      wisdom: string;
    };
  }
  interface ThemeOptions {
    status?: {
      regenerative?: string;
      community?: string;
      wisdom?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Forest green - regenerative
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8E24AA', // Purple - wisdom/spiritual
      light: '#BA68C8',
      dark: '#6A1B9A',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#66BB6A', // Growth green
      light: '#81C784',
      dark: '#43A047',
    },
    warning: {
      main: '#FF9800', // Warm orange - community
      light: '#FFB74D',
      dark: '#F57C00',
    },
    info: {
      main: '#0288D1', // Sky blue - clarity
      light: '#03A9F4',
      dark: '#01579B',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
    },
  },
  status: {
    regenerative: '#2E7D32',
    community: '#FF9800',
    wisdom: '#8E24AA',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '8px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1B5E20 30%, #2E7D32 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});