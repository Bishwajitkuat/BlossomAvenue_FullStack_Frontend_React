import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetAuthFromLocalStorage } from "../../hooks/Auth/useGetAuthFromLocalStorage";
const ProtectedRoutes = () => {
  const { userAuth } = useGetAuthFromLocalStorage();
  const location = useLocation();
  return userAuth?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
