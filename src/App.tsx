import { useEffect } from 'react';
import { router } from './routes';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider, ThemeProvider as ThemeModeProvider } from './contexts';
import { ThemeProvider as MuiThemeProvider } from './theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { NotistackProvider } from './providers';
import { firebaseConfig } from './service';

import 'simplebar-react/dist/simplebar.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

function App() {
  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    getAnalytics(firebaseApp);
  }, []);

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <HelmetProvider>
          <ThemeModeProvider>
            <MuiThemeProvider>
              <NotistackProvider>
                <RouterProvider router={router} />
              </NotistackProvider>
            </MuiThemeProvider>
          </ThemeModeProvider>
        </HelmetProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}

export default App;
