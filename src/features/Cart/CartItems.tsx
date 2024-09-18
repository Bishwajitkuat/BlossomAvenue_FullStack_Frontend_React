import TrashCanIcon from "../../components/ui/icons/TrashCanIcon";
import Loader from "../../components/ui/Loader";
import useAddToCart from "../../hooks/Cart/useAddToCart";
import useDeleteItemFromCart from "../../hooks/Cart/useDeleteItemFromCart";
import useReduceQuantityFromCart from "../../hooks/Cart/useReduceQuantityFromCart";
import { ReadCartItemDto } from "../../utils/types/cart";

function CartItems({ item }: { item: ReadCartItemDto }) {
  const { isAddToCartLoading, addToCart } = useAddToCart();
  const { isReduceQtyLoading, reduceQtyByOneFromCart } =
    useReduceQuantityFromCart();
  const { isDeleteItemFromCartLoading, deleteItemFromCart } =
    useDeleteItemFromCart();

  const {
    cartItemsId,
    imageUrl,
    productId,
    variationId,
    variationName,
    price,
    quantity,
    title,
  } = item;
  if (isAddToCartLoading || isReduceQtyLoading || isDeleteItemFromCartLoading)
    return <Loader />;
  return (
    <li className="grid w-full grid-cols-4 items-center gap-1 rounded-md bg-pink-100 p-3 text-sm shadow-md shadow-zinc-200 duration-150 ease-in hover:bg-pink-100  hover:shadow-pink-300/50 md:gap-4 md:p-4">
      <img className=" rounded-md" src={imageUrl} alt={title} />
      <div className="col-span-1">
        <h2 className="tracking-widest md:text-xl">{variationName}</h2>
        <p>{price.toFixed(2)}€</p>
      </div>
      <div className="grid grid-cols-3 items-center justify-center gap-2 justify-self-center md:col-span-1 md:text-xl md:font-bold">
        <button
          className=" hover:text-green-500"
          onClick={() => addToCart({ productId, variationId, quantity: 1 })}
        >
          +
        </button>
        <p>{quantity}</p>
        <button
          className=" hover:text-red-500"
          onClick={() =>
            reduceQtyByOneFromCart({ productId, variationId, quantity: 1 })
          }
        >
          -
        </button>
      </div>
      <div className="flex flex-nowrap items-center justify-end gap-2 justify-self-end">
        <p className="md:text-xl md:font-bold md:tracking-widest">
          {(price * quantity).toFixed(2)}€
        </p>
        <button
          className="duration-200 ease-in hover:scale-105"
          onClick={() => deleteItemFromCart(cartItemsId)}
        >
          <TrashCanIcon />
        </button>
      </div>
    </li>
  );
}

export default CartItems;
