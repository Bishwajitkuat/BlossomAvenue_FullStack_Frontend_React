import { useMutation } from "@tanstack/react-query";
import { ProductReviewCreateDto } from "../../utils/types/product";
import toast from "react-hot-toast";
import useAxiosPrivate from "../useAxiosPrivate";

function useAddProductReview() {
  const axiosPrivate = useAxiosPrivate();
  const postProductReview = async (newReview: ProductReviewCreateDto) => {
    const res = await axiosPrivate.post("/ProductReview", newReview);
    return res.data;
  };

  const { isPending: isReviewLoading, mutate: addNewReview } = useMutation({
    mutationFn: postProductReview,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (err) => toast(err.message),
  });

  return { isReviewLoading, addNewReview };
}

export default useAddProductReview;
