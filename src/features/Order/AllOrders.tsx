import Error from "../../components/ui/Error";
import Loader from "../../components/ui/Loader";
import useGetAllOrders from "../../hooks/Order/useGetAllOrders";

function AllOrders() {
  const { isOrdersLoading, orderError, orders } = useGetAllOrders();
  if (isOrdersLoading || !orders) return <Loader />;
  if (orderError) return <Error message={orderError.message} />;
  return (
    <div className="p-12">
      <h1 className="text-[2.5rem] text-center tracking-widest">Orders</h1>
      {Array.isArray(orders) &&
        orders.map((o) => (
          <div
            key={o.orderId}
            className="grid gap-4 my-12 py-4 border-b border-t border-gray-700 border-dashed text-[1.2rem]"
          >
            <h2>
              <span className="font-bold">Order Id:</span> {o.orderId}
            </h2>
            <p>
              <span className="font-bold">Time:</span> {o.createdAt}
            </p>
            <p>
              <span className="font-bold">Status:</span> {o.orderStatus}
            </p>
            <p>
              <span className="font-bold">Total amount:</span>{" "}
              {o.totalAmount.toFixed(2)}€
            </p>
            <p className="font-bold">Shipping Detail</p>
            <p>
              <span className="font-bold">Name:</span>{" "}
              {o.shippingAddress.fullName}
            </p>
            <p>
              <span className="font-bold">Address:</span>{" "}
              {o.shippingAddress.addressLine1}
            </p>
            <p>
              <span className="font-bold">Post Code:</span>{" "}
              {o.shippingAddress.postCode}
            </p>
            <p>
              <span className="font-bold">City: </span>
              {o.shippingAddress.city}
            </p>
            <p>
              <span className="font-bold">Country:</span>{" "}
              {o.shippingAddress.country}
            </p>
          </div>
        ))}
    </div>
  );
}

export default AllOrders;
