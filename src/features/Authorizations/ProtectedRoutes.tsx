import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetAuthFromLocalStorage } from "../../hooks/Auth/useGetAuthFromLocalStorage";
import { useEffect } from "react";
import toast from "react-hot-toast";
const ProtectedRoutes = () => {
  const { userAuth } = useGetAuthFromLocalStorage();
  const location = useLocation();
  useEffect(() => {
    if (!userAuth?.isAuthenticated) {
      toast.error("Please login to access this route.");
    }
  }, [userAuth]);
  return userAuth?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
