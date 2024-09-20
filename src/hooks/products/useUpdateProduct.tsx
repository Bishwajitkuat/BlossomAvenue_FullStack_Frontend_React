import useAxiosPrivate from "../useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateProductDto,
  GetProductByIdReadDto,
} from "../../utils/types/product";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function useUpdateProduct() {
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigate();
  const { productId } = useParams();
  const update = async (
    product: CreateProductDto
  ): Promise<GetProductByIdReadDto> => {
    const res = await axiosPrivate.patch(`/products/${productId}`, product);
    return res.data;
  };
  const { isPending: isUpdatingProductPending, mutate: updateProduct } =
    useMutation({
      mutationFn: update,
      onSuccess: (data) => {
        toast.success("Product is updated successfully!");
        navigation(`/products/${data.productId}`);
      },
      onError: (err: AxiosError) =>
        toast.error(JSON.stringify(err?.response?.data)),
    });
  return { isUpdatingProductPending, updateProduct };
}

export default useUpdateProduct;
