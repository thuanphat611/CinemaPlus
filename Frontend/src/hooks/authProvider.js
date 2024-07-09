import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const url = 'http://localhost:3030/auth/check-auth';
        const response = await axios.get(url, { withCredentials: true });
        // console.log(response);

        setAuth(response.data.success);
        setUser(response.data.user);
      }
      catch (e) {
        console.error('Error checking auth:', e);
      }
    }

    checkAuth();
  }, []);

  const setSignedIn = (user) => {
    setAuth(true);
    setUser(user);
  }

  const setSignedOut = () => {
    setAuth(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ auth, user, setSignedIn, setSignedOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useAuth = () => {
 return useContext(AuthContext);
}