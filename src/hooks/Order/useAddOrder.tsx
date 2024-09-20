import toast from "react-hot-toast";
import { CreateOrderDto, ReadOrderDto } from "../../utils/types/order";
import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

function useAddOrder() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const addOrder = async (order: CreateOrderDto): Promise<ReadOrderDto> => {
    const res = await axiosPrivate.post("/orders", order);
    return res.data;
  };

  const { isPending: isAddOrderLoading, mutate: addNewOrder } = useMutation({
    mutationFn: addOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("The order is placed successfully!");
      navigate(`/user/orders`);
    },
    onError: (err: AxiosError) => toast.error(JSON.stringify(err?.response?.data)),
  });

  return { isAddOrderLoading, addNewOrder };
}

export default useAddOrder;
