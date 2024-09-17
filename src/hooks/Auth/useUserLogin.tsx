import { useMutation } from "@tanstack/react-query";
import useSetAuthToLocalStorage from "./useSetAuthToLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "../../services/api/authentication";
import toast from "react-hot-toast";

const useUserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/user";
  const { setToLocalStorage } = useSetAuthToLocalStorage();

  const { isPending: isLoading, mutate: login } = useMutation({
    mutationFn: getAuth,
    onSuccess: (data) => {
      toast.success("Welcome again!");
      setToLocalStorage(data);
      navigate(from, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, login };
};

export default useUserLogin;
