import { useMutation } from "@tanstack/react-query";
import useSetAuthToLocalStorage from "./useSetAuthToLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "../../services/api/authentication";

const useUserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setToLocalStorage } = useSetAuthToLocalStorage();

  const { isPending: isLoading, mutate: login } = useMutation({
    mutationFn: getAuth,
    onSuccess: (data) => {
      setToLocalStorage(data);
      navigate(from, { replace: true });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { isLoading, login };
};

export default useUserLogin;
