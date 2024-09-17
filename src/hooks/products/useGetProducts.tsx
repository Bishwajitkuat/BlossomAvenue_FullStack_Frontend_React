import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../services/api/axios";
import {
  GetAllProductReadDto,
  PaginatedResponse,
} from "../../utils/types/product";
import { useSearchParams } from "react-router-dom";

function useGetProducts() {
  // add pagination and filtering
  const [searchParams] = useSearchParams();
  const pageSize = searchParams.get("PageSize")
    ? searchParams.get("PageSize")
    : "10";
  const pageNo = searchParams.get("PageNo") ? searchParams.get("PageNo") : "1";

  const routeString = `/products?PageSize=${pageSize}&PageNo=${pageNo}`;

  const getProducts = async (): Promise<
    PaginatedResponse<GetAllProductReadDto>
  > => {
    const res = await axiosPublic.get(routeString);
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
