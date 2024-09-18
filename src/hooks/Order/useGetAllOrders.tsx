import useAxiosPrivate from "../useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { ReadOrderDto } from "../../utils/types/order";

function useGetAllOrders() {
  const axiosPrivate = useAxiosPrivate();
  const getOrders = async (): Promise<ReadOrderDto[]> => {
    const res = await axiosPrivate.get("/orders");
    return res.data;
  };

  const {
    isPending: isOrdersLoading,
    error: orderError,
    data: orders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  return { isOrdersLoading, orderError, orders };
}

export default useGetAllOrders;
