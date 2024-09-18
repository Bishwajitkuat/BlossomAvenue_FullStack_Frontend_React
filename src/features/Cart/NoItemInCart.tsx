import { Link } from "react-router-dom";

export default function NoItemInCart() {
  return (
    <div className="mb-12 text-xl w-full rounded-md bg-slate-100 px-4 py-8 text-center shadow-md shadow-zinc-200 duration-150 ease-in ">
      <h2 className="mb-8 text-red-500">
        You have no item in the cart. Please visit menu products to add product
        to cart!
      </h2>
      <Link
        className="min-h-[3rem] rounded-full bg-pink-100 px-4 py-2  uppercase  shadow-sm shadow-zinc-500 outline-none duration-200 ease-in  hover:bg-pink-300 hover:shadow-pink-500/50 "
        to="/products"
      >
        Products
      </Link>
    </div>
  );
}
