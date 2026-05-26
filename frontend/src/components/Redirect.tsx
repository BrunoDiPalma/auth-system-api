import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function RootRedirect() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null;

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/register" />
  );
}
