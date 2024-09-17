import { useEffect } from "react";
import AllProducts from "../features/Products/AllProducts";
import useGetProducts from "../hooks/products/useGetProducts";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Products = () => {
  const queryClient = useQueryClient();
  const { isProductsLoading, isError, error, paginatedProducts } =
    useGetProducts();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isError && error) toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }, [isError, searchParams, queryClient, error]);
  if (isProductsLoading) return <Loader />;
  return (
    <div className="h-full flex flex-col max-w-[1280px] mx-auto">
      <div className="flex-grow">
        <AllProducts products={paginatedProducts?.items} />
      </div>
      <Pagination
        currentPage={paginatedProducts?.currentPage}
        itemPerPage={paginatedProducts?.itemPerPage}
        totalItemCount={paginatedProducts?.totalItemCount}
        totalPageCount={paginatedProducts?.totalPageCount}
      />
    </div>
  );
};

export default Products;
