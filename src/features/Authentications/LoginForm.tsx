import { useState } from "react";
import useAuth from "../../hooks/Auth/useUserLogin";
import Loader from "../../components/ui/Loader";

const LoginForm = () => {
  const { isLoading, login } = useAuth();
  const [username, setUsername] = useState<string>("admin1@test.com");
  const [password, setPassword] = useState<string>("Abcd1234!");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ username, password });
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="userName">User name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="userName">Password</label>
          <input
            type="text"
            name="password"
            id="userName"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
