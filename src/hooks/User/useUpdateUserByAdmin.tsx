import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import toast from "react-hot-toast";

function useUpdateUserByAdmin() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const userUpdate = async (userWithId: {
    updatedUser: { isUserActive: boolean; userRole: string };
    userId: string;
  }) => {
    const res = await axiosPrivate.patch(
      `/users/${userWithId.userId}`,
      userWithId.updatedUser
    );
    return res.data;
  };

  const { isPending: isUserUpdatePending, mutate: updateUser } = useMutation({
    mutationFn: userUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "admin"] });
      toast.success("User updated successfully!");
    },
    onError: (err) => toast(err.message),
  });

  return { isUserUpdatePending, updateUser };
}

export default useUpdateUserByAdmin;
