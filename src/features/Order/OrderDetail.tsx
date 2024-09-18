import NoItemInCart from "../Cart/NoItemInCart";
import NotAvailable from "../../components/NotAvailable";
import OrderItems from "./OrderItems";
import { Link } from "react-router-dom";
import { ReadCartDto } from "../../utils/types/cart";

function OrderDetail({ cart }: { cart: ReadCartDto }) {
  return cart ? (
    <div className="flex justify-center">
      <div className="m-2 rounded-md bg-pink-900/10 p-2 shadow-md shadow-zinc-900/30 md:m-8 md:w-full md:p-8">
        <div className="mb-4 flex w-full py-4 text-xl">
          <h1>Order Summary</h1>
        </div>
        {cart.cartItems.length > 0 ? (
          <ul className="flex flex-col gap-4 border-b border-t border-zinc-400 py-6">
            {cart.cartItems.map((cartItem) => (
              <OrderItems key={cartItem.cartItemsId} item={cartItem} />
            ))}
          </ul>
        ) : (
          <NoItemInCart />
        )}
        <div className="w-full flex justify-between py-4">
          <Link to={"/user/cart"}>
            <button
              className="min-h-[3rem] rounded-xl bg-pink-200 px-4 py-2 uppercase  shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-300 hover:shadow-pink-500/50"
              type="button"
            >
              Back To Cart
            </button>
          </Link>
          <p className="tracking-widest text-xl font-semibold">
            Total:{" "}
            {cart.cartItems
              .reduce((acc, item) => item.price * item.quantity + acc, 0)
              .toFixed(2)}
            €
          </p>
        </div>
      </div>
    </div>
  ) : (
    <NotAvailable item={"cart"} />
  );
}

export default OrderDetail;
