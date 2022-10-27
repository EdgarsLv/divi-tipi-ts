import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  useContext,
} from 'react';

const ThemeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  isDark: false,
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const getThemeFromLocalStorage = () => {
      const value = localStorage.getItem('theme-mode');
      if (value !== null && value === 'dark') {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };
    getThemeFromLocalStorage();
  }, []);

  const setThemeToLocalStorage = (theme: string) => {
    localStorage.setItem('theme-mode', theme);
  };

  const toggleTheme = useCallback(() => {
    const theme = isDark ? 'light' : 'dark';

    setThemeToLocalStorage(theme);
    return setIsDark(!isDark);
  }, [isDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isDark,
    }),
    [toggleTheme, isDark],
  );

  return <ThemeContext.Provider value={preferences}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;

export const useThemeMode = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('Theme context must be use inside ThemeModeProvider');

  return context;
};
