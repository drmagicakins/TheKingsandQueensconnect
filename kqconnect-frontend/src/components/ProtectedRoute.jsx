// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../auth/authStore";

export default function ProtectedRoute({ children, admin }) {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" />;
  if (admin && !user.is_admin) return <Navigate to="/" />;

  return children;
}
