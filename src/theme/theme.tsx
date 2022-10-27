import { ReactNode, useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
  ThemeOptions,
} from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import { useThemeMode } from '../contexts/ThemeContext';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { isDark } = useThemeMode();

  const themeOptions = useMemo(
    () => ({
      palette: isDark ? palette.dark : palette.light,
      typography,
      breakpoints,
      shape: { borderRadius: 2 },
    }),
    [isDark],
  );

  const theme = createTheme(themeOptions as ThemeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
