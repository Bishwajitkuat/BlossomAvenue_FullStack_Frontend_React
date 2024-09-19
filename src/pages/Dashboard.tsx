import { Outlet } from "react-router-dom";
import { useGetAuthFromLocalStorage } from "../hooks/Auth/useGetAuthFromLocalStorage";
import { Link } from "react-router-dom";

function Dashboard() {
  const { userAuth } = useGetAuthFromLocalStorage();
  const isAdminOrEmployee =
    userAuth?.isAuthenticated &&
    (userAuth.userRole === "Admin" || userAuth.userRole === "Employee")
      ? true
      : false;
  return (
    <div className=" w-full mx-auto h-full grid grid-cols-8 bg-pink-200/50">
      <nav className="h-full flex flex-col py-8 px-8 bg-pink-200/80">
        <ul className="flex flex-col  gap-8 text-[1.2rem] font-light tracking-widest md:text-[1.5rem]">
          <li className="">
            <Link to="/user">Profile</Link>
          </li>
          <li className="">
            <Link to="/user/cart">Cart</Link>
          </li>
          <li className="">
            <Link to="/user/orders">Orders</Link>
          </li>
          {isAdminOrEmployee && (
            <>
              <li className="font-semibold">Employee Section</li>
              <li className="">
                <Link to="/user/employee/products">Products</Link>
              </li>
              <li className="">
                <Link to="/user/employee/products/create">Create Product</Link>
              </li>
              <li className="">
                <Link to="/user/employee/orders">Orders</Link>
              </li>
            </>
          )}
          {userAuth?.userRole === "Admin" && (
            <>
              <li className="font-semibold">Admin Section</li>
              <li className="">
                <Link to="/user/admin/users">Users</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="col-span-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
