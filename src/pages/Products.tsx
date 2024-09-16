import React, { useEffect } from "react";
import AllProducts from "../features/Products/AllProducts";
import useGetProducts from "../hooks/products/useGetProducts";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader";

const Products = () => {
  const { isProductsLoading, isError, error, paginatedProducts } =
    useGetProducts();

  useEffect(() => {
    if (isError && error) toast.error(error.message);
  }, [isError]);
  if (isProductsLoading) return <Loader />;
  return (
    <div>
      <AllProducts products={paginatedProducts?.items} />
    </div>
  );
};

export default Products;
