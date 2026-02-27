import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? token : null;
  });

  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update userData when user changes
  useEffect(() => {
    if (user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    } else {
      setUserData(null);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, userData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
