import { Link } from "react-router-dom";
import { useGetAuthFromLocalStorage } from "../hooks/Auth/useGetAuthFromLocalStorage";
import useUserLogout from "../hooks/Auth/useUserLogout";
import Loader from "../components/ui/Loader";

const Header = () => {
  const { userAuth } = useGetAuthFromLocalStorage();
  const { isLoading, logout } = useUserLogout();

  if (isLoading) <Loader />;
  return (
    <header className=" bg-pink-300/80 p-4 md:px-[5rem] md:pb-2 md:pt-6">
      <nav className="flex flex-nowrap items-center justify-between ">
        <Link className="flex flex-nowrap items-center" to="/">
          <span className="text-xl font-light tracking-widest md:text-[2rem]">
            Blossom Avenue
          </span>
        </Link>
        <ul className="flex flex-nowrap  gap-8 text-[1.2rem] font-light tracking-widest md:text-[1.5rem]">
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li className="flex items-center justify-center">
            <Link to="/user">Profile</Link>
          </li>
          <li className="flex items-center justify-center">
            <Link to="/cart">Cart</Link>
          </li>
          {!userAuth?.isAuthenticated && (
            <li className="flex items-center justify-center">
              <Link to="/login">Login</Link>
            </li>
          )}
          {userAuth?.isAuthenticated && (
            <li className="flex items-center justify-center">
              <button onClick={() => logout()}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
