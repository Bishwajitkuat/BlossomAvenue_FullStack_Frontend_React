import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteOrder() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const orderDelete = async (orderId: string) => {
    const res = await axiosPrivate.delete(`/orders/admin/${orderId}`);
    return res.data;
  };

  const { isPending: isOrderDeletePending, mutate: deleteOrder } = useMutation({
    mutationFn: orderDelete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders", "admin"] });
      toast.success("The order is deleted successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isOrderDeletePending, deleteOrder };
}

export default useDeleteOrder;
