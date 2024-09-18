import CartIcon from "../../components/ui/icons/CartIcon";
import useGetCart from "../../hooks/Cart/useGetCart";

function CartIconWithItemNumber() {
  const { isCartLoading, cartError, cart } = useGetCart();
  if (isCartLoading || cartError || !cart) return <CartIcon />;
  const itemNumber: number | boolean = cart?.cartItems?.length
    ? cart?.cartItems?.length
    : false;
  return (
    <div className="relative">
      {itemNumber && (
        <p className="absolute bottom-6 left-4 h-[2rem] w-[2rem] rounded-full bg-orange-200 text-center font-bold text-zinc-950">
          {itemNumber}
        </p>
      )}
      <CartIcon />
    </div>
  );
}

export default CartIconWithItemNumber;
