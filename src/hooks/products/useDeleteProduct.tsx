import useAxiosPrivate from "../useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function useDeleteProduct() {
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigate();
  const productDelete = async (productId: string) => {
    const res = await axiosPrivate.delete(`/products/${productId}`);
    return res.data;
  };

  const { isPending: isProductDeletePending, mutate: deleteProduct } =
    useMutation({
      mutationFn: productDelete,
      onSuccess: (data) => {
        toast.success("Product is deleted successfully!");
        navigation(`/user/employee/products`);
      },
      onError: (err: AxiosError) =>
        toast.error(JSON.stringify(err?.response?.data)),
    });
  return { isProductDeletePending, deleteProduct };
}

export default useDeleteProduct;
