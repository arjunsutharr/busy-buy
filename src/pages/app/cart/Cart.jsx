import { Navigate, useNavigate } from "react-router-dom";
import CartItemCard from "../../../Components/cartItemCard/CartItemCard";
import cartStyles from "./Cart.module.css";
import { useAuthValues } from "../../../context/Authentication.context";
import { useEffect } from "react";
import { useCartValues } from "../../../context/Cart.context";
import { toast } from "react-toastify";

function Cart() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthValues();
  const { getCartItems, cart, cartTotalAmount, placeOrder } = useCartValues();

  useEffect(() => {
    if (isLoggedIn) {
      getCartItems();
    }
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const orderPlace = placeOrder();

      if (orderPlace) {
        navigate("/orders");
      }
    } catch (error) {
      console.log("error while placing order", error);
      toast.error("error while placing order");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        cart.length > 0 ? (
          <div className={cartStyles.container}>
            <div className={cartStyles.cartItemsContainer}>
              <CartItemCard cartItems={cart} />
            </div>
            <div className={cartStyles.cartSummaryContainer}>
              <p>Total Amount: {cartTotalAmount}</p>
              <button onClick={() => handlePlaceOrder()}>Place Order</button>
            </div>
          </div>
        ) : (
          <div>Your Cart Is Empty</div>
        )
      ) : (
        <Navigate to="/signin" replace />
      )}
    </>
  );
}

export default Cart;
