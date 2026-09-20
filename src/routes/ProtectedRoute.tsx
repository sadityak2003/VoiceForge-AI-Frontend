import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "./routePaths";

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.HOME}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;