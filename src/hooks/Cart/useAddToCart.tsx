import useAxiosPrivate from "../useAxiosPrivate";
import { CreateCartItemsDto, ReadCartDto } from "../../utils/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useAddToCart() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const addItemToCart = async (
    item: CreateCartItemsDto
  ): Promise<ReadCartDto> => {
    const res = await axiosPrivate.post("/carts", item);
    return res.data;
  };
  const { isPending: isAddToCartLoading, mutate: addToCart } = useMutation({
    mutationFn: addItemToCart,
    onSuccess: (data) => {
      toast.success("Item added to cart successfully!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isAddToCartLoading, addToCart };
}

export default useAddToCart;
