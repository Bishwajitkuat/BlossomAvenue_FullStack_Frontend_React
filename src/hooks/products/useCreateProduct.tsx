import {
  CreateProductDto,
  GetProductByIdReadDto,
} from "../../utils/types/product";
import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateProduct() {
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigate();
  const addProduct = async (
    product: CreateProductDto
  ): Promise<GetProductByIdReadDto> => {
    const res = await axiosPrivate.post("/products", product);
    return res.data;
  };

  const { isPending: isCreateProductLoading, mutate: createProduct } =
    useMutation({
      mutationFn: addProduct,
      onSuccess: (data) => {
        toast.success("Product is added successfully!");
        navigation(`/products/${data.productId}`);
      },
      onError: (err: AxiosError) =>
        toast.error(JSON.stringify(err?.response?.data)),
    });
  return { isCreateProductLoading, createProduct };
}

export default useCreateProduct;
