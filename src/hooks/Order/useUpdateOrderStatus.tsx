import useAxiosPrivate from "../useAxiosPrivate";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function useUpdateOrderStatus() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const statusUpdate = async (order: {
    orderStatus: string;
    shippingAddress: null;
    orderId: string;
  }) => {
    const res = await axiosPrivate.patch(`/orders/admin/${order.orderId}`, {
      orderStatus: order.orderStatus,
      shippingAddress: order.shippingAddress,
    });
    return res.data;
  };

  const { isPending: isOrderStatusPending, mutate: updateOrderStatus } =
    useMutation({
      mutationFn: statusUpdate,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["orders", "admin"] });
        toast.success("The order status is updated successfully!");
      },
      onError: (err: AxiosError) =>
        toast.error(JSON.stringify(err?.response?.data)),
    });

  return { isOrderStatusPending, updateOrderStatus };
}

export default useUpdateOrderStatus;
