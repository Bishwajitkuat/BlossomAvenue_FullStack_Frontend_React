import useAxiosPrivate from "../useAxiosPrivate";
import { UpdateUserProfileDto } from "../../utils/types/user";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function useUpdateProfile() {
  const axiosPrivate = useAxiosPrivate();

  const profileUpdate = async (user: UpdateUserProfileDto) => {
    const res = await axiosPrivate.patch("/users/profile", user);
    return res.data;
  };

  const { isPending: isUserUpdatePending, mutate: updateUser } = useMutation({
    mutationFn: profileUpdate,
    onSuccess: () => {
      toast.success("Update success!!!");
    },
    onError: (error: AxiosError) => {
      if (error?.response?.data) {
        toast.error(JSON.stringify(error.response.data));
      } else toast.error(error.message);
    },
  });
  return { isUserUpdatePending, updateUser };
}

export default useUpdateProfile;
