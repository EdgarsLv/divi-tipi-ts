import { supabase } from '@/service';
import { createContext, useEffect, useReducer, useState, useContext } from 'react';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: any, action: any) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  login: (_email: string, _password: string) => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      dispatch({
        type: 'INITIALISE',
        payload: { isAuthenticated: true, user: session.user },
      });
    } else {
      dispatch({
        type: 'INITIALISE',
        payload: { isAuthenticated: false, user: null },
      });
    }
  }, [session]);

  const login = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({ email, password });
  };

  const register = async (email: string, password: string) => {
    await supabase.auth.signUp({ email, password });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};
