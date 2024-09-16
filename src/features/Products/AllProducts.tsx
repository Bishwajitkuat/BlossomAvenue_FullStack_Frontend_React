import ProductCard from "./ProductCard";
import { GetAllProductReadDto } from "../../utils/types/product";
import NotAvailable from "../../components/NotAvailable";

function AllProducts({
  products,
}: {
  products: GetAllProductReadDto[] | undefined;
}) {
  if (products === undefined || products.length < 1)
    return <NotAvailable item={"products"} />;
  return (
    <ul className="grid justify-center gap-8 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-[5rem]">
      {Array.isArray(products) &&
        products.map((p) => (
          <ProductCard key={p.productId} product={p}></ProductCard>
        ))}
    </ul>
  );
}

export default AllProducts;
