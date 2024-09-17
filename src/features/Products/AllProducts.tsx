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
    <ul className="grid justify-center gap-8 grid-cols-3">
      {Array.isArray(products) &&
        products.map((p) => (
          <ProductCard key={p.productId} product={p}></ProductCard>
        ))}
    </ul>
  );
}

export default AllProducts;
