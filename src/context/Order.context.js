import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useReducer } from "react";
import { db } from "../firebaseInit";
import { useAuthValues } from "./Authentication.context";

const orderContext = createContext();

const useOrderValues = () => {
  return useContext(orderContext);
};

const reducer = (state, action) => {
  const { data } = action;

  switch (action.type) {
    case "ORDER_DATA":
      return {
        ...state,
        orders: data,
      };

    default:
      return state;
  }
};

function OrderContextProvider({ children }) {
  const { user } = useAuthValues();
  const [state, dispatch] = useReducer(reducer, {
    orders: [],
  });

  const getOrders = () => {
    const orderRef = collection(db, "usersOrders", user.uid, "myOrders");

    const unsub = onSnapshot(orderRef, (snapshot) => {
      const orders = snapshot.docs.map((doc) => doc.data());
      dispatch({
        type: "ORDER_DATA",
        data: orders,
      });
    });

    return unsub;
  };

  const createOrder = () => {};

  return (
    <orderContext.Provider value={{ ...state, createOrder, getOrders }}>
      {children}
    </orderContext.Provider>
  );
}

export { useOrderValues };
export default OrderContextProvider;
