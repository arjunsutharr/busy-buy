import { Navigate } from "react-router-dom";
import { useAuthValues } from "../../../context/Authentication.context";
import { useOrderValues } from "../../../context/Order.context";
import { useEffect } from "react";
import OrderTable from "../../../Components/orderTable/OrderTable";

function MyOrders() {
  const { orders, getOrders } = useOrderValues();
  const { isLoggedIn } = useAuthValues();

  useEffect(() => {
    if (isLoggedIn) {
      getOrders();
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        orders.length > 0 ? (
          <div>
            {orders.map((order, i) => (
              <OrderTable key={i} order={order} />
            ))}
          </div>
        ) : (
          <div>No Order Found</div>
        )
      ) : (
        <Navigate to="/signin" replace />
      )}
    </>
  );
}

export default MyOrders;
