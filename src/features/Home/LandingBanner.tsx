import { Link } from "react-router-dom";
import useGetLatestProducts from "../../hooks/products/useGetLatestProducts";
import AllProducts from "../Products/AllProducts";

const LandingBanner = () => {
  const { isProductsLoading, paginatedProducts } = useGetLatestProducts();
  return (
    <div className="flex h-screen w-full flex-col items-center  bg-[url(../public/bg1.jpg)] bg-center bg-no-repeat pt-[3rem]  ">
      <div className="font-bold text-center grid gap-[2rem] rounded-lg bg-pink-200/50 p-[8rem] text-zinc-950/90 shadow-xl shadow-pink-200/40 ">
        <h1 className=" text-[4rem]  ">
          FLOWER DELIVERY IN HELSINKI AND ACROSS FINLAND
        </h1>
        <h2 className=" text-[1.5rem] md:text-[2rem] ">
          Garden-fresh blooms at your doorstep. In no time.
        </h2>
        <div className="flex justify-center gap-4"></div>
      </div>
      <div className="py-12">
        <h2 className="text-[2.5rem] font-bold py-12">The Latest</h2>
        <div>
          {isProductsLoading || !paginatedProducts ? (
            <h2 className="text-center">Loading......</h2>
          ) : (
            <AllProducts products={paginatedProducts?.items} />
          )}
        </div>
      </div>
      <Link to={"/products"}>
        {" "}
        <p className="text-[2.5rem] mb-12 hover:text-pink-400">
          Find More Products
        </p>{" "}
      </Link>
    </div>
  );
};

export default LandingBanner;
