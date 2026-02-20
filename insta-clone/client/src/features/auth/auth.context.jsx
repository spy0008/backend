import { createContext, useState, useEffect } from "react";
import { login, register } from "./services/auth.api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const result = await login(username, password);

      if (result.success) {
        setUser(result.user);
        return result;
      } else {
        toast.error(result.error);
        return null;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const result = await register(username, email, password);

      if (result.success) {
        setUser(result.user);
        return result;
      } else {
        toast.error(result.error);
        return null;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
}
