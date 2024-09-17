import { useEffect, useState } from "react";
import useGetProductById from "../../hooks/products/useGetProductById";
import Loader from "../../components/ui/Loader";
import toast from "react-hot-toast";
import NotAvailable from "../../components/NotAvailable";
import ImageCarousel from "../../components/ImageCarousel";
import VariationsSelector from "./VariationsSelector";
import ProductReviews from "./ProductReviews";
import AddProductReview from "./AddProductReview";
import useAddProductReview from "../../hooks/products/useAddProductReview";

function ProductDetail() {
  const { isProductLoading, isError, error, product } = useGetProductById();
  const [selectedVariation, setSelectedVariation] = useState<string>();
  const { isReviewLoading, addNewReview } = useAddProductReview();
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  useEffect(() => {
    if (isError && error) toast.error(error.message);
  }, [isError, error, isReviewLoading, addNewReview]);
  if (isProductLoading) return <Loader />;
  if (product === undefined || null) return <NotAvailable item={"product"} />;
  return (
    <div className="py-12 px-12">
      <h1 className="text-center tracking-widest text-6xl ">
        {product?.title}
      </h1>
      <div className="py-12 grid grid-cols-2">
        <div className="flex flex-col gap-12 px-12">
          <ImageCarousel images={product?.images} />
          <div>
            <h2 className="text-2xl">Product Description</h2>
            <p className=" text-justify ">{product?.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-12 px-12">
          <div>
            <h2 className="text-2xl">Product Rating</h2>
            <span className="text-2xl text-orange-400">
              {"★".repeat(product?.avgStar || 0)}
            </span>
          </div>
          <VariationsSelector
            variations={product?.variations}
            selectedVariation={selectedVariation}
            setSelectedVariation={setSelectedVariation}
          />
          <button className="w-full  rounded-b-md bg-pink-300 px-12 py-3 font-semibold uppercase tracking-widest shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-500 ">
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="px-12">
        <div className="flex gap-8 items-center">
          <h2 className="text-2xl my-4">Product Review</h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="text-xl border-2 w-8 h-8 rounded-md border-pink-200 font-semibold uppercase tracking-widest shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-500 "
          >
            {showReviewForm ? "-" : "+"}
          </button>
        </div>
        {showReviewForm && <AddProductReview productId={product?.productId} />}
        <ProductReviews reviews={product?.productReviews} />
      </div>
    </div>
  );
}

export default ProductDetail;
