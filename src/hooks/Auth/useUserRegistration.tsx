import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../useAxiosPrivate";
import { CreateUserProfileDto } from "../../utils/types/user";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function useUserRegistration() {
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigate();
  const addUser = async (user: CreateUserProfileDto) => {
    const res = await axiosPrivate.post("/users/profile", user);
    return res.data;
  };

  const { isPending: isUserSingUpPending, mutate: createUser } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("Registration Completed!");
      navigation(`/login`);
    },
    onError: (error: AxiosError) => {
      if (error?.response?.data) {
        toast.error(JSON.stringify(error.response.data));
      } else toast.error(error.message);
    },
  });
  return { isUserSingUpPending, createUser };
}

export default useUserRegistration;
