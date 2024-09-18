import { ReadCartItemDto } from "../../utils/types/cart";
import Loader from "../../components/ui/Loader";

function OrderItems({ item }: { item: ReadCartItemDto }) {
  const { variationName, price, quantity, title } = item;
  if (!item) return <Loader />;
  return (
    <li className="grid w-full grid-cols-5 items-center gap-1 rounded-md bg-pink-100 p-3 text-sm shadow-md shadow-zinc-200 duration-150 ease-in hover:bg-pink-100  hover:shadow-pink-300/50 md:gap-4 md:p-4">
      <div className="col-span-3">
        <h2 className="tracking-widest md:text-md ">{title}</h2>
        <h2 className="tracking-widest md:text-xl">{variationName}</h2>
        <p>{price.toFixed(2)}€</p>
      </div>
      <div className="text-center gap-2 justify-self-center md:col-span-1 md:text-xl">
        <p>
          {quantity} X {price.toFixed(2)}€
        </p>
      </div>
      <div className="flex flex-nowrap items-center justify-end gap-2 justify-self-end">
        <p className="md:text-xl font-semibold md:tracking-widest">
          {(price * quantity).toFixed(2)}€
        </p>
      </div>
    </li>
  );
}

export default OrderItems;
