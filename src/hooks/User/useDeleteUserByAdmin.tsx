import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteUserByAdmin() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const userDelete = async (userId: string) => {
    const res = await axiosPrivate.delete(`/users/${userId}`);
    return res.data;
  };

  const { isPending: isUserDeletePending, mutate: deleteUser } = useMutation({
    mutationFn: userDelete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users", "admin"] });
      toast.success("The user is deleted successfully!");
    },
    onError: (err) => toast(err.message),
  });
  return { isUserDeletePending, deleteUser };
}

export default useDeleteUserByAdmin;
