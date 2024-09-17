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

  const orderWith = searchParams.get("ProductOrderWith")
    ? searchParams.get("ProductOrderWith")
    : null;
  const orderBy = searchParams.get("OrderBy")
    ? searchParams.get("OrderBy")
    : null;
  const categoryId = searchParams.get("CategoryId")
    ? searchParams.get("CategoryId")
    : null;
  const search = searchParams.get("Search");

  let routeString = `/products?PageSize=${pageSize}&PageNo=${pageNo}`;
  if (search) {
    routeString = `${routeString}&Search=${search}`;
  }
  if (categoryId) {
    routeString = `${routeString}&CategoryId=${categoryId}`;
  }
  if (orderWith) {
    routeString = `${routeString}&ProductOrderWith=${orderWith}`;
  }
  if (orderBy) {
    routeString = `${routeString}&OrderBy=${orderBy}`;
  }

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
