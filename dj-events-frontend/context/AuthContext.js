import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config/index";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => checkUserLoggedIn(), []);

  // Register User
  const register = async ({ username, email, password }) => {
    try {
      const res = await axios.post(
        `${NEXT_URL}/api/register`,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.statusText === "OK") {
        setUser(res.data.user);
        router.push("/account/dashboard");
      }
    } catch (err) {
      setError(err.response.data.message);
      setError(null);
    }
  };

  // Login User
  const login = async ({ email: identifier, password }) => {
    try {
      const res = await axios.post(
        `${NEXT_URL}/api/login`,
        { identifier, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.statusText === "OK") {
        setUser(res.data.user);
        router.push("/account/dashboard");
      }
    } catch (err) {
      setError(err.response.data.message);
      setError(null);
    }
  };

  //Logout User
  const logout = async () => {
    const res = await axios.post(`${NEXT_URL}/api/logout`);
    if (res.statusText === "OK") {
      setUser(null);
      router.push("/");
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    try {
      const res = await axios.get(`${NEXT_URL}/api/user`);

      if (res.statusText === "OK") {
   
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {}
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
