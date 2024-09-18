import { useState } from "react";
import Error from "../../components/ui/Error";
import Loader from "../../components/ui/Loader";
import useGetCart from "../../hooks/Cart/useGetCart";
import OrderDetail from "./OrderDetail";
import ShippingAddress from "./ShippingAddress";
import toast from "react-hot-toast";
import { CreateOrderDto } from "../../utils/types/order";
import useAddOrder from "../../hooks/Order/useAddOrder";

function CreateOrder() {
  const { isCartLoading, cartError, cart } = useGetCart();
  const { isAddOrderLoading, addNewOrder } = useAddOrder();
  const [fullName, setFullName] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [postCode, setPostCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("Finland");

  const handelOrderSubmit = () => {
    if (!fullName || !addressLine1 || !postCode || !city || !country)
      toast.error("Please fill up all the fields in address from!");
    const newOrder: CreateOrderDto = {
      addressDetailId: null,
      shippingAddress: {
        fullName,
        addressLine1,
        addressLine2: null,
        postCode,
        city,
        country,
      },
    };
    addNewOrder(newOrder);
  };

  if (isCartLoading || !cart || isAddOrderLoading) return <Loader />;
  if (cartError) return <Error message={cartError.message.toString()} />;
  return (
    <div>
      <OrderDetail cart={cart} />
      <ShippingAddress
        fullName={fullName}
        setFullName={setFullName}
        addressLine1={addressLine1}
        setAddressLine1={setAddressLine1}
        postCode={postCode}
        setPostCode={setPostCode}
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
      />
      <div className="flex justify-center py-8">
        <button
          className={
            cart.cartItems.length < 1
              ? "min-h-[4rem] min-w-[30%] rounded-full bg-gray-500 px-4  py-2 font-semibold uppercase shadow-sm shadow-zinc-500 outline-none"
              : "min-h-[4rem] min-w-[30%] rounded-full bg-pink-200 px-4  py-2 font-semibold uppercase shadow-sm shadow-zinc-500 outline-none duration-200 ease-in  hover:bg-pink-300"
          }
          type="button"
          onClick={handelOrderSubmit}
          disabled={cart.cartItems.length < 1}
        >
          {false ? "Submitting....." : "Order"}
        </button>
      </div>
    </div>
  );
}

export default CreateOrder;
