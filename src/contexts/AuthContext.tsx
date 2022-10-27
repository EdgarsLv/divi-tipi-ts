import { createContext, useEffect, useReducer, useState, useContext, ReactNode } from 'react';

interface RootState {
  isAuthenticated: boolean;
  isInitialized?: boolean;
  user: any;
  login?: () => void;
  register?: () => void;
  logout?: () => void;
}
type ActionType = { type: 'INITIALISE'; payload: RootState };

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const reducer = (state: RootState, action: ActionType): RootState => {
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

type AuthContextType = ReturnType<typeof reducer>;

const AuthContext = createContext<AuthContextType>({
  ...initialState,
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (session) {
      dispatch({
        type: 'INITIALISE',
        payload: { isAuthenticated: true, user: session },
      });
    } else {
      dispatch({
        type: 'INITIALISE',
        payload: { isAuthenticated: false, user: null },
      });
    }
  }, [session]);

  const login = async () => {
    setSession(true);
  };
  const register = async () => {
    setSession(true);
  };
  const logout = async () => {
    setSession(null);
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
