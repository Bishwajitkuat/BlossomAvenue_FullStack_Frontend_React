import { ReadProductReviewDto } from "../../utils/types/product";

function ProductReviews({
  reviews,
}: {
  reviews: ReadProductReviewDto[] | undefined;
}) {
  return reviews === undefined || reviews.length < 1 ? (
    <p>Product review is not available</p>
  ) : (
    <ul className="flex flex-col gap-4">
      {reviews.map((r) => (
        <li key={r.reviewId} className="text-xl">
          <p className=" flex items-center gap-2">
            Rating:{" "}
            <span className="text-2xl text-orange-400">
              {"★".repeat(r?.star ? r.star : 0)}
            </span>
          </p>
          <p>Review: {r.review}</p>
        </li>
      ))}
    </ul>
  );
}

export default ProductReviews;
