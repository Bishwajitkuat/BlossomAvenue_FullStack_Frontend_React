import { axiosPublic } from "../services/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../utils/types/product";

function useGetAllCatagories() {
  const getCatagories = async (): Promise<Category[]> => {
    const res = await axiosPublic.get("/categories");
    return res.data;
  };

  const {
    isPending: isCategoriesLoading,
    data: categories,
    isError: isCategoriesError,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCatagories,
  });
  return {
    isCategoriesLoading,
    categories,
    isCategoriesError,
    categoriesError,
  };
}

export default useGetAllCatagories;
