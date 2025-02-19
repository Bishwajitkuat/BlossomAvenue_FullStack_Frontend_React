import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function useUserLogout() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const postLogout = async () => {
    const res = await axiosPrivate.post("/auth/logout");
    return res;
  };

  const { isPending: isLoading, mutate: logout } = useMutation({
    mutationFn: postLogout,
    onSuccess: (data) => {
      toast.success(data.data);
      localStorage.removeItem("blossom_avenue_user_auth");
      navigate("/login");
    },
    onError: (err: AxiosError) =>
      toast.error(JSON.stringify(err?.response?.data)),
  });
  return { isLoading, logout };
}

export default useUserLogout;
