import { supabase } from '@/service';
import { AuthResponse } from '@supabase/supabase-js';
import { createContext, useEffect, useReducer, useState, useContext, ReactNode } from 'react';

type RegisterUser = {
  name: string;
  age: string;
  gender: string;
  email: string;
  password: string;
};

type AuthUser = {
  email: string;
  id: string;
} | null;

type RootState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};
const initialState: RootState = {
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
  login: (_email: string, _password: string) => Promise.resolve<AuthResponse>(null as any),
  register: (_values: RegisterUser) => Promise.resolve<AuthResponse>(null as any),
  logout: () => Promise.resolve(),
});

function AuthProvider({ children }: { children: ReactNode }) {
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

  const login = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password });

  // prettier-ignore
  const register = ({ email, password, name, age, gender }: RegisterUser) =>
    supabase.auth.signUp({ email, password, options: { 
      data: { name, age, gender } },
    });

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
