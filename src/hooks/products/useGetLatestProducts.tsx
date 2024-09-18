import {
  GetAllProductReadDto,
  PaginatedResponse,
} from "../../utils/types/product";
import { axiosPublic } from "../../services/api/axios";
import { useQuery } from "@tanstack/react-query";

function useGetLatestProducts() {
  const getProducts = async (): Promise<
    PaginatedResponse<GetAllProductReadDto>
  > => {
    const res = await axiosPublic.get(
      "/products?pageNo=1&pageSize=3&&ProductOrderWith=CreatedAt&OrderBy=DESC"
    );
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

export default useGetLatestProducts;
