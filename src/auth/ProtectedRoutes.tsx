import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // While Auth0 loading do nothing
  // After finish loading will cause rerender
  if (isLoading) {
    return null;
  }

  // This will render the child routes of the parent route if logged in
  if (isAuthenticated) {
    return <Outlet />;
  }

  //replace url with home page if not logged in
  return <Navigate to="/" replace />;
};

export default ProtectedRoutes;
