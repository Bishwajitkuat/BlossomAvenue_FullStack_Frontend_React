import useAxiosPrivate from "../useAxiosPrivate";
import { ReadOrderDto } from "../../utils/types/order";
import { useQuery } from "@tanstack/react-query";

function useGetAllOrdersByAdmin() {
  const axiosPrivate = useAxiosPrivate();
  const getOrders = async (): Promise<ReadOrderDto[]> => {
    const res = await axiosPrivate.get("/orders/admin");
    return res.data;
  };

  const {
    isPending: isOrdersLoading,
    error: orderError,
    data: orders,
  } = useQuery({
    queryKey: ["orders", "admin"],
    queryFn: getOrders,
  });
  return { isOrdersLoading, orderError, orders };
}

export default useGetAllOrdersByAdmin;
