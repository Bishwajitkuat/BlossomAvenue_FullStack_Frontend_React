import { useState } from "react";
import useAddProductReview from "../../hooks/products/useAddProductReview";
import Loader from "../../components/ui/Loader";
import { useGetAuthFromLocalStorage } from "../../hooks/Auth/useGetAuthFromLocalStorage";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function AddProductReview({ productId }: { productId: string | undefined }) {
  const { userAuth } = useGetAuthFromLocalStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const { isReviewLoading, addNewReview } = useAddProductReview();
  const [review, setReview] = useState<string>("");
  const [star, setStar] = useState<string>("1");

  if (isReviewLoading) return <Loader />;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userAuth || !userAuth.isAuthenticated) {
      toast.error("Please login to add new product review.");
      navigate("/login", { state: { from: location } });
      return;
    }
    addNewReview({
      review,
      star,
      userId: null,
      productId: productId ? productId : null,
    });
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex text-xl my-12 max-w-[50%] flex-col gap-6 items-start  justify-center "
    >
      <h2 className="text-xl tracking-widest">Add Product Review</h2>
      <div className="grid w-full gap-2">
        <label htmlFor="review">Review</label>
        <textarea
          className="p-4 min-w-full min-h-[5rem] bg-pink-100 rounded-md outline-none  focus:ring-pink-300 focus:ring-opacity-90"
          id="review"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <div className="grid w-full gap-2">
        <label htmlFor="rating">Rating</label>
        <select
          className=" w-full min-h-8 text-xl text-orange-300 rounded-md outline-none focus:ring-pink-300 focus:ring-opacity-30 bg-pink-100"
          name="rating"
          id="rating"
          onChange={(e) => setStar(e.target.value)}
          value={star}
        >
          <option value="1">★</option>
          <option value="2">★★</option>
          <option value="3">★★★</option>
          <option value="4">★★★★</option>
          <option value="5">★★★★★</option>
        </select>
      </div>
      <button
        className="w-full  rounded-b-md bg-pink-300 px-12 py-3 font-semibold uppercase tracking-widest shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-500 "
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default AddProductReview;
