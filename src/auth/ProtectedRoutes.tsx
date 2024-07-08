import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <Outlet /> // This will render the child routes of the parent route if logged in
  ) : (
    <Navigate to="/" replace /> //replace url with home page if not logged in
  );
};

export default ProtectedRoutes;
