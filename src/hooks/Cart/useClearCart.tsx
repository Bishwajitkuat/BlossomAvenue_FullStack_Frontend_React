import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function useClearCart() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const clear = async () => {
    const res = await axiosPrivate.delete("/carts");
    return res.data;
  };

  const { isPending: isCartClearLoading, mutate: clearCart } = useMutation({
    mutationFn: clear,
    onSuccess: () => {
      toast.success("Cart is clear out successfully!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: AxiosError) =>
      toast.error(JSON.stringify(err?.response?.data)),
  });

  return { isCartClearLoading, clearCart };
}

export default useClearCart;
