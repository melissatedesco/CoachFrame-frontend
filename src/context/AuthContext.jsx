import { createContext, useContext, useState, useCallback } from 'react';
import { authApi } from '../api/auth';
import { tokenStorage } from '../api/tokenStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => tokenStorage.getUser());

  const login = useCallback(async (email, password) => {
    const data = await authApi.login({ email, password });
    tokenStorage.setSession({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user,
    });
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async ({ name, surname, email, password }) => {
    return authApi.register({ name, surname, email, password });
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      await authApi.logout(refreshToken);
    } catch {
      // il logout locale deve comunque avvenire anche se la chiamata fallisce
    }
    tokenStorage.clear();
    setUser(null);
  }, []);

  const updateUser = useCallback((partialUser) => {
    setUser((prev) => {
      const next = { ...prev, ...partialUser };
      tokenStorage.setSession({ user: next });
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with its provider by design
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve essere usato dentro un AuthProvider');
  return ctx;
}
