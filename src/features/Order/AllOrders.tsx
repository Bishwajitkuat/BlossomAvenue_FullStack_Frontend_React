import Error from "../../components/ui/Error";
import Loader from "../../components/ui/Loader";
import useGetAllOrders from "../../hooks/Order/useGetAllOrders";

function AllOrders() {
  const { isOrdersLoading, orderError, orders } = useGetAllOrders();
  if (isOrdersLoading || !orders) return <Loader />;
  if (orderError) return <Error message={orderError.message} />;
  return (
    <div className="w-full flex flex-col justify-center p-12 text-[1.2rem]">
      <h1 className="text-[2rem] tracking-widest font-semibold text-center py-12  ">
        Orders
      </h1>
      {Array.isArray(orders) && (
        <ul className="flex flex-col gap-8">
          <li className="w-full grid grid-cols-4 p-4 text-[1.5rem] tracking-widest font-semibold">
            <h2>Summary</h2>
            <h2>Order Detail</h2>
            <h2>Shipping Address</h2>
            <h2>Status</h2>
          </li>
          {orders.map((o) => (
            <li
              key={o.orderId}
              className="w-full grid grid-cols-4 p-8 border-2 border-gray-700/30 shadow-md rounded-md"
            >
              <div>
                <p>
                  <span className="font-bold">Order Id:</span> {o.orderId}
                </p>
                <p>
                  <span className="font-bold">Date:</span> {o.createdAt}
                </p>
                <p>
                  <span className="font-bold">Total amount:</span>{" "}
                  {o.totalAmount.toFixed(2)}€
                </p>
              </div>
              <ul>
                {o.orderItems.map((oi) => (
                  <li key={oi.orderItemsId}>
                    <p>
                      {oi.title} {oi.quantity} X {oi?.price.toFixed(2)}€
                    </p>
                  </li>
                ))}
              </ul>
              <div>
                <p>{o.shippingAddress.fullName}</p>
                <p>{o.shippingAddress.addressLine1}</p>
                {o.shippingAddress?.addressLine2 && (
                  <p>{o.shippingAddress.addressLine2}</p>
                )}
                <p>
                  {o.shippingAddress.postCode}, {o.shippingAddress.city}
                </p>
                <p>{o.shippingAddress.country}</p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="tracking-widest font-semibold">
                  Current Status: {o.orderStatus}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllOrders;
