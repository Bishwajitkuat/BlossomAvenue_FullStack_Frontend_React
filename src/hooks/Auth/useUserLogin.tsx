import { useMutation } from "@tanstack/react-query";
import useSetAuthToLocalStorage from "./useSetAuthToLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "../../services/api/authentication";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const useUserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/products";
  const { setToLocalStorage } = useSetAuthToLocalStorage();

  const { isPending: isLoading, mutate: login } = useMutation({
    mutationFn: getAuth,
    onSuccess: (data) => {
      toast.success("Welcome again!");
      setToLocalStorage(data);
      navigate(from, { replace: true });
    },
    onError: (err: AxiosError) =>
      toast.error(JSON.stringify(err?.response?.data)),
  });

  return { isLoading, login };
};

export default useUserLogin;
