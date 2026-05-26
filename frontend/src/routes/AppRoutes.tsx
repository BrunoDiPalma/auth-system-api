import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AuthContext } from "../contexts/AuthContext";
import { RootRedirect } from "../components/Redirect";

export function AppRoutes() {
  const { loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
