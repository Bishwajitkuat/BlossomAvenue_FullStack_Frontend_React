import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReadCartDto } from "../../utils/types/cart";
import toast from "react-hot-toast";

function useDeleteItemFromCart() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const deleteFromCart = async (cartItemId: string): Promise<ReadCartDto> => {
    const res = await axiosPrivate.delete(`/carts/${cartItemId}`);
    return res.data;
  };

  const { isPending: isDeleteItemFromCartLoading, mutate: deleteItemFromCart } =
    useMutation({
      mutationFn: deleteFromCart,
      onSuccess: (data) => {
        toast.success("Teh item id deleted from the cart successfully!");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
      onError: (err) => toast.error(err.message),
    });
  return { isDeleteItemFromCartLoading, deleteItemFromCart };
}

export default useDeleteItemFromCart;
