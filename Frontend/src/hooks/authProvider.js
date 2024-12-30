import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

import { ApiErrorHandler } from "../utils/function";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/validate`;
        const response = await axios.get(url, { withCredentials: true });

        setAuth(response.data.success);
        setUser(response.data.user);
      } catch (error) {
        setAuth(false);
        setUser(null);
        ApiErrorHandler(error);
      }
    };

    checkAuth();
  }, []);

  const setSignedIn = (user) => {
    setAuth(true);
    setUser(user);
  };

  const setSignedOut = () => {
    setAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ auth, user, setSignedIn, setSignedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
