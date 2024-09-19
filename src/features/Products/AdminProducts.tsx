import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useGetProducts from "../../hooks/products/useGetProducts";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/ui/Loader";
import FilterProduct from "./FilterProduct";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import useDeleteProduct from "../../hooks/products/useDeleteProduct";

function AdminProducts() {
  const queryClient = useQueryClient();
  const { isProductsLoading, isError, error, paginatedProducts } =
    useGetProducts();
  const [searchParams] = useSearchParams();
  const { isProductDeletePending, deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (isError && error) toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }, [isError, searchParams, queryClient, error]);
  if (isProductsLoading || isProductDeletePending) return <Loader />;
  return (
    <div className="h-full flex flex-col max-w-[1280px] mx-auto">
      <div>
        <FilterProduct />
      </div>
      <div className="flex-grow">
        {Array.isArray(paginatedProducts?.items) && (
          <ul>
            <li className="grid grid-cols-7 text-center text-[1.5rem] tracking-widest font-semibold  pb-4 mb-4 ">
              <p className="col-span-2 text-left">Name</p>
              <p>Price</p>
              <p>Inventory</p>
              <p>Avg Rating</p>
              <p className="col-span-2 text-center">Actions</p>
            </li>
            {paginatedProducts?.items?.map((p) => (
              <li
                key={p.productId}
                className="grid grid-cols-7 text-center text-[1.2rem] p-4 my-2 border-2 border-gray-700/30 shadow-md rounded-md hover:bg-pink-200"
              >
                <p className="col-span-2 text-left">{p.title}</p>
                <p>{p?.minPrice?.toFixed(2)}€</p>
                <p>{p?.inventory}</p>
                <p>{p?.avgStar}</p>
                <div className="col-span-2 flex gap-4 justify-end">
                  <Link to={`/products/${p.productId}`}>
                    <button className="border-2 border-blue-300/30 rounded-md px-4 py-2 shadow-md hover:bg-blue-200/30">
                      Detail
                    </button>
                  </Link>
                  <Link
                    to={`/user/employee/products/update/${p.productId}`}
                    className="border-2 border-yellow-300/30 rounded-md px-4 py-2 shadow-md hover:bg-yellow-200/30"
                  >
                    <button>Update</button>
                  </Link>
                  <button
                    onClick={() => deleteProduct(p.productId)}
                    className="border-2 border-red-400/30 rounded-md px-4 py-2 shadow-md hover:bg-red-300/30"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Pagination
        currentPage={paginatedProducts?.currentPage}
        itemPerPage={paginatedProducts?.itemPerPage}
        totalItemCount={paginatedProducts?.totalItemCount}
        totalPageCount={paginatedProducts?.totalPageCount}
      />
    </div>
  );
}

export default AdminProducts;
