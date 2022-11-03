import { Theme } from '@mui/material';

export default function Card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: 'relative',
          boxShadow: theme.shadows[2],
          zIndex: 0,
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'subtitle2' },
        subheaderTypographyProps: { variant: 'caption' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
