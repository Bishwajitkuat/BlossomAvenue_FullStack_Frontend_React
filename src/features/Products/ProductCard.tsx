import BankNoteIcon from "../../components/ui/icons/BankNoteIcon";
import StockIcon from "../../components/ui/icons/StockIcon";
import { GetAllProductReadDto } from "../../utils/types/product";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }: { product: GetAllProductReadDto }) {
  const navigate = useNavigate();
  return (
    <li className="rounded-md bg-gradient-to-br from-orange-400 via-[#983cfb]/50 to-[#3fb02a] p-[1px] shadow-lg shadow-zinc-400 ">
      <div className="flex h-full flex-col gap-10 rounded-md bg-zinc-200/90 pt-6 duration-200 ease-in hover:bg-zinc-200/70">
        <img
          className={
            product.inventory < 1
              ? " shadow-md shadow-zinc-400 grayscale"
              : " shadow-md shadow-zinc-400"
          }
          src={product.imageUrl}
          alt={product.title}
        />
        <h2 className="text-center text-xl font-semibold uppercase tracking-widest">
          {product.title}
        </h2>
        <div className="flex items-center gap-2 px-2">
          <BankNoteIcon />
          <p className="text-2xl font-semibold tracking-wider">
            <span>Price</span> {product.minPrice.toFixed(2)}€
          </p>
        </div>
        <div className="flex items-center gap-2 px-2">
          <StockIcon />
          {product.inventory < 1 ? (
            <p className="text-xl font-semibold uppercase text-red-500">
              <span>Stock</span> Sold out
            </p>
          ) : (
            <p className="text-2xl font-semibold tracking-wider">
              <span>Stock</span> {product.inventory}
            </p>
          )}
        </div>
        <div className="text-center">
          <button
            className="w-full  rounded-b-md bg-pink-300 px-12 py-3 font-semibold uppercase tracking-widest shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-500 "
            onClick={() => navigate(`/products/${product.productId}`)}
          >
            Detail
          </button>
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
