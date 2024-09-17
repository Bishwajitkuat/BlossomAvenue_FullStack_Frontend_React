import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { axiosPublic } from "../../services/api/axios";
import { GetProductByIdReadDto } from "../../utils/types/product";

function useGetProductById() {
  const { productId } = useParams();
  useEffect(() => {
    if (productId === undefined || null)
      toast.error("Product id is missing, from route.");
  }, [productId]);

  const getProductById = async (): Promise<GetProductByIdReadDto> => {
    const res = await axiosPublic.get(`/products/${productId}`);
    return res.data;
  };

  const {
    isPending: isProductLoading,
    isError,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: getProductById,
  });
  return { isProductLoading, isError, error, product };
}

export default useGetProductById;
