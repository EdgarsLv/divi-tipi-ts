import { router } from './routes';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider, ThemeProvider as ThemeModeProvider } from './contexts';
import { ThemeProvider } from './theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

import 'react-lazy-load-image-component/src/effects/blur.css';

function App() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <HelmetProvider>
          <ThemeModeProvider>
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
          </ThemeModeProvider>
        </HelmetProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}

export default App;
