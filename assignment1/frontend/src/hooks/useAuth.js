import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem("token", token);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return { login, logout };
};
