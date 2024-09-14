import { Outlet } from "react-router-dom";
import { useGetAuthFromLocalStorage } from "../../hooks/Auth/useGetAuthFromLocalStorage";
import RestrictedAccess from "./RestrictedAccess";
import { UserRole } from "../../utils/types/authentication";

const EmployeeAdminProtectedRoutes = () => {
  const { userAuth } = useGetAuthFromLocalStorage();

  return userAuth?.isAuthenticated &&
    (userAuth?.userRole === UserRole.Admin ||
      userAuth.userRole === "Employee") ? (
    <Outlet />
  ) : (
    <RestrictedAccess role={"Employee and Admin"} />
  );
};

export default EmployeeAdminProtectedRoutes;
