import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../services/api/axios";
import {
  GetAllProductReadDto,
  PaginatedResponse,
} from "../../utils/types/product";

function useGetProducts() {
  // add pagination and filtering
  const getProducts = async (): Promise<
    PaginatedResponse<GetAllProductReadDto>
  > => {
    const res = await axiosPublic.get("/products");
    return res.data;
  };

  const {
    isPending: isProductsLoading,
    data: paginatedProducts,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { isProductsLoading, isError, error, paginatedProducts };
}

export default useGetProducts;
