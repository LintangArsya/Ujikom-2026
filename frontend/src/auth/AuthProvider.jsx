import { useState } from "react";
import { AuthContext } from "./authContext";

const AuthProvider = ({ children }) => {
  let parsedUser = null;

  try {
    const storedUser = localStorage.getItem("user");
    parsedUser = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    console.log("Invalid user data in localStorage, clearing...");
    localStorage.removeItem("user");
    parsedUser = null;
  }

  const [user, setUser] = useState(parsedUser);

  const login = (userData) => {
    if (!userData) return;
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
