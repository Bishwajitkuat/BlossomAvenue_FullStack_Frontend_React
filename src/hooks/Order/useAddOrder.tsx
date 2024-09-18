import toast from "react-hot-toast";
import { CreateOrderDto, ReadOrderDto } from "../../utils/types/order";
import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useAddOrder() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const addOrder = async (order: CreateOrderDto): Promise<ReadOrderDto> => {
    const res = await axiosPrivate.post("/orders", order);
    return res.data;
  };

  const { isPending: isAddOrderLoading, mutate: addNewOrder } = useMutation({
    mutationFn: addOrder,
    onSuccess: (data) => {
      toast.success("The order is placed successfully!");
      navigate(`/user/orders/${data.orderId}`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAddOrderLoading, addNewOrder };
}

export default useAddOrder;
