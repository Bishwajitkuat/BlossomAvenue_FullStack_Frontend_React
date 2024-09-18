import useGetCart from "../../hooks/Cart/useGetCart";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";
import NotAvailable from "../../components/NotAvailable";
import { Link } from "react-router-dom";
import NoItemInCart from "./NoItemInCart";
import CartItems from "./CartItems";
import useClearCart from "../../hooks/Cart/useClearCart";

function CartDetail() {
  const { isCartLoading, cartError, cart } = useGetCart();
  const { isCartClearLoading, clearCart } = useClearCart();
  if (isCartLoading || !cart || isCartClearLoading) return <Loader />;
  if (cartError) return <Error message={cartError.message.toString()} />;

  return cart ? (
    <div className="flex justify-center">
      <div className="m-2 rounded-md bg-pink-900/10 p-2 shadow-md shadow-zinc-900/30 md:m-8 md:w-full md:p-8">
        <Link to="/products"> Products </Link>
        <div className="mb-4 flex w-full justify-between py-4 text-xl">
          <h1>Shopping Cart</h1>
          <p>
            Total:{" "}
            {cart.cartItems
              .reduce((acc, item) => item.price * item.quantity + acc, 0)
              .toFixed(2)}
            €
          </p>
        </div>
        {cart.cartItems.length > 0 ? (
          <ul className="flex flex-col gap-4 border-b border-t border-zinc-400 py-6">
            {cart.cartItems.map((cartItem) => (
              <CartItems key={cartItem.cartItemsId} item={cartItem} />
            ))}
          </ul>
        ) : (
          <NoItemInCart />
        )}
        <div className="flex justify-end gap-2 px-2 py-6 text-right uppercase md:tracking-widest">
          <button
            className="min-h-[3rem] rounded-xl bg-pink-200 px-4 py-2 uppercase  shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-300 hover:shadow-pink-500/50"
            onClick={() => clearCart()}
          >
            Clear Cart
          </button>
          <button
            className="min-h-[3rem] rounded-xl bg-pink-200 px-4 py-2  uppercase  shadow-md shadow-zinc-500 outline-none duration-200 ease-in  hover:bg-pink-300 hover:shadow-pink-500/50"
            // onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <NotAvailable item={"cart"} />
  );
}

export default CartDetail;
