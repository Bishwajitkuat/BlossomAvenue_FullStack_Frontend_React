import useAxiosPrivate from "../useAxiosPrivate";
import { ReadCartDto } from "../../utils/types/cart";
import { useQuery } from "@tanstack/react-query";

function useGetCart() {
  const axiosPrivate = useAxiosPrivate();

  const getCart = async (): Promise<ReadCartDto> => {
    const res = await axiosPrivate.get("/carts");
    return res.data;
  };

  const {
    isPending: isCartLoading,
    error: cartError,
    data: cart,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
  return { isCartLoading, cart, cartError };
}

export default useGetCart;
