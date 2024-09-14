import { Outlet } from "react-router-dom";
import { useGetAuthFromLocalStorage } from "../../hooks/Auth/useGetAuthFromLocalStorage";
import RestrictedAccess from "./RestrictedAccess";
import { UserRole } from "../../utils/types/authentication";

const AdminProtectedRoutes = () => {
  const { userAuth } = useGetAuthFromLocalStorage();

  return userAuth?.isAuthenticated && userAuth?.userRole === UserRole.Admin ? (
    <Outlet />
  ) : (
    <RestrictedAccess role={"Admin"} />
  );
};

export default AdminProtectedRoutes;
