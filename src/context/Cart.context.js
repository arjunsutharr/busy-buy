import { createContext, useContext, useReducer } from "react";
import { db } from "../firebaseInit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthValues } from "./Authentication.context";
import { toast } from "react-toastify";

const cartContext = createContext();

const reducer = (state, action) => {
  const { data } = action;
  switch (action.type) {
    case "CART_DATA":
      return {
        ...state,
        cart: data,
        cartTotalAmount: state.cart.reduce(
          (currentTotal, item) => item.amount + currentTotal,
          0
        ),
      };

    default:
      return state;
  }
};

// custom cart hook
const useCartValues = () => {
  return useContext(cartContext);
};

// custom cart context
function CartContextProvider({ children }) {
  const { user } = useAuthValues();
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
    cartTotalAmount: 0,
  });

  const { cart, cartTotalAmount } = state;

  const getCartItems = async () => {
    const cartRef = collection(db, "usersCarts", user.uid, "myCart");

    const unsub = onSnapshot(cartRef, (snapshot) => {
      const cartItems = snapshot.docs.map((doc) => doc.data());
      dispatch({
        type: "CART_DATA",
        data: cartItems,
      });
    });

    return unsub;
  };

  const addToCart = async (item) => {
    const foundItem = cart.find((cartItem) => cartItem.id === item.id);
    const cartRef = doc(db, "usersCarts", user.uid, "myCart", item.id);

    if (foundItem) {
      await updateDoc(cartRef, {
        qty: foundItem.qty + 1,
        amount: foundItem.price * (foundItem.qty + 1),
      });

      dispatch({
        type: "CART_DATA",
        data: cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                qty: cartItem.qty + 1,
                amount: foundItem.price * (foundItem.qty + 1),
              }
            : cartItem
        ),
      });
    } else {
      await setDoc(cartRef, { ...item, qty: 1, amount: item.price });
      dispatch({
        type: "CART_DATA",
        data: [...cart, { ...item, qty: 1, amount: item.price }],
      });
    }

    toast.success("Item added to cart.");
  };

  const increaseCartItemQuantity = async (item) => {
    const foundItem = cart.find((cartItem) => cartItem.id === item.id);
    const cartRef = doc(db, "usersCarts", user.uid, "myCart", item.id);
    await updateDoc(cartRef, {
      qty: foundItem.qty + 1,
      amount: foundItem.price * (foundItem.qty + 1),
    });

    dispatch({
      type: "CART_DATA",
      data: cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              qty: cartItem.qty + 1,
              amount: foundItem.price * (foundItem.qty + 1),
            }
          : cartItem
      ),
    });
  };

  const decreaseCartItemQuantity = async (item) => {
    const foundItem = cart.find((cartItem) => cartItem.id === item.id);
    const cartRef = doc(db, "usersCarts", user.uid, "myCart", item.id);
    if (foundItem.qty > 1) {
      await updateDoc(cartRef, {
        qty: foundItem.qty - 1,
        amount: foundItem.price * (foundItem.qty - 1),
      });

      dispatch({
        type: "CART_DATA",
        data: cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                qty: cartItem.qty - 1,
                amount: foundItem.price * (foundItem.qty - 1),
              }
            : cartItem
        ),
      });
    } else {
      return;
    }
  };

  const removeCartItem = async (item) => {
    const cartItemRef = doc(db, "usersCarts", user.uid, "myCart", item.id);
    await deleteDoc(cartItemRef);
  };

  const placeOrder = async () => {
    try {
      const orderRef = collection(db, "usersOrders", user.uid, "myOrders");
      await addDoc(orderRef, {
        totalAmount: cartTotalAmount,
        items: cart,
        createdOn: serverTimestamp(),
      });

      dispatch({
        type: "CART_DATA",
        data: [],
      });

      dispatch({
        type: "CART_TOTAL",
        data: 0,
      });

      await clearUserCart();

      return true;
    } catch (error) {
      console.log("error while placing order");
    }
  };

  const clearUserCart = async () => {
    try {
      const cartRef = collection(db, "usersCarts", user.uid, "myCart");
      const snapshot = await getDocs(cartRef);
      snapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.log("error while clearing cart");
    }
  };

  return (
    <cartContext.Provider
      value={{
        ...state,
        addToCart,
        getCartItems,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        removeCartItem,
        placeOrder,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export { cartContext, useCartValues };
export default CartContextProvider;
