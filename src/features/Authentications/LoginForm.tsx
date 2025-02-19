import { useState } from "react";
import useAuth from "../../hooks/Auth/useUserLogin";
import Loader from "../../components/ui/Loader";
import ParsonIcon from "../../components/ui/icons/ParsonIcon";
import LockIcon from "../../components/ui/icons/LockIcon";

const LoginForm = () => {
  const { isLoading, login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ username, password });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-[1280px] h-full mx-auto">
      <div className="mt-[10rem] flex flex-col gap-12 justify-center items-center">
        <h1 className="text-4xl">Login</h1>
        <form onSubmit={onSubmit} className="grid w-[50%] gap-8">
          <div className="grid">
            <div className="flex items-center rounded-full bg-pink-300">
              <div className="flex h-full items-center justify-center  px-2">
                <ParsonIcon />
              </div>
              <label
                htmlFor="username"
                className="min-w-[5rem] border-e border-pink-400 py-3 pe-2"
              >
                Username
              </label>
              <input
                className="w-full rounded-full rounded-s bg-pink-50 px-2 py-3 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-30"
                type="text"
                name="username"
                placeholder="user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center rounded-full bg-pink-300">
              <div className="flex h-full items-center justify-center px-2">
                <LockIcon />
              </div>
              <label
                htmlFor="password"
                className="min-w-[5rem] border-e border-pink-400 py-3 pe-2"
              >
                Password
              </label>
              <input
                className="w-full rounded-full rounded-s bg-pink-50 px-2 py-3 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className="w-full  rounded-full bg-pink-300 px-12 py-3 font-semibold uppercase tracking-widest shadow-sm shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-400 "
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-[50%] mx-auto mt-[2rem] text-[1.2rem] gap-8 p-12 flex flex-col border-2 border-gray-700 border-dotted">
        <h2 className="text-center text-[1.5rem] font-bold">
          Test users credentials
        </h2>
        <div>
          <h3>Admin</h3>
          <p>User Name: admin1@test.com</p>
          <p>Password: Abcd1234!</p>
        </div>
        <div>
          <h3>Employee</h3>
          <p>User Name: emp1@test.com</p>
          <p>Password: Abcd1234!</p>
        </div>
        <div>
          <h3>Customer</h3>
          <p>User Name: cus1@test.com</p>
          <p>Password: Abcd1234!</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
