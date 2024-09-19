import { useState } from "react";
import Error from "../../components/ui/Error";
import Loader from "../../components/ui/Loader";
import useGetAllOrdersByAdmin from "../../hooks/Order/useGetAllOrdersByAdmin";
import toast from "react-hot-toast";
import useUpdateOrderStatus from "../../hooks/Order/useUpdateOrderStatus";
import useDeleteOrder from "../../hooks/Order/useDeleteOrder";

function AdminOrders() {
  const { isOrdersLoading, orderError, orders } = useGetAllOrdersByAdmin();
  const { isOrderStatusPending, updateOrderStatus } = useUpdateOrderStatus();
  const { isOrderDeletePending, deleteOrder } = useDeleteOrder();
  const [orderStatus, setOrderStatus] = useState<string>("");

  const handelUpdate = (orderId: string) => {
    if (!orderStatus) toast.error("Please change order status to save it");
    else {
      const updatedOrder = {
        orderStatus: orderStatus,
        shippingAddress: null,
        orderId,
      };
      updateOrderStatus(updatedOrder);
    }
  };
  if (isOrdersLoading || isOrderStatusPending || isOrderDeletePending)
    return <Loader />;
  if (orderError)
    return <Error message={orderError?.message || "Failed to fetch orders."} />;
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
            <h2>Change Status</h2>
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
                <select
                  onChange={(e) => setOrderStatus(e.target.value)}
                  name="orderStatus"
                  id="orderStatus"
                  className="p-4 rounded-md outline-none shadow-md"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Complete">Complete</option>
                  <option value="Canceled">Canceled</option>
                </select>
                <button
                  type="button"
                  onClick={() => handelUpdate(o.orderId)}
                  disabled={isOrderStatusPending || isOrderDeletePending}
                  className="border-2 border-lime-300/50 bg-lime-200/30 rounded-md px-4 py-2 shadow-md hover:bg-lime-100"
                >
                  Save
                </button>
                <button
                  onClick={() => deleteOrder(o.orderId)}
                  disabled={isOrderStatusPending || isOrderDeletePending}
                  className="border-2 border-red-400/30 bg-orange-200 rounded-md px-4 py-2 shadow-md hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminOrders;
