import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCartItemsDto, ReadCartDto } from "../../utils/types/cart";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function useReduceQuantityFromCart() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const reduceQty = async (item: CreateCartItemsDto): Promise<ReadCartDto> => {
    const res = await axiosPrivate.patch("/carts", item);
    return res.data;
  };

  const { isPending: isReduceQtyLoading, mutate: reduceQtyByOneFromCart } =
    useMutation({
      mutationFn: reduceQty,
      onSuccess: (data) => {
        toast.success("Item amount is reduced by 1.");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
      onError: (err: AxiosError) => toast.error(JSON.stringify(err?.response?.data)),
    });

  return { isReduceQtyLoading, reduceQtyByOneFromCart };
}

export default useReduceQuantityFromCart;
