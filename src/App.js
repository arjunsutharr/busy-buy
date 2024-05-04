import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./Components/nav/Nav";
import Products from "./pages/app/products/Products";
import ProductContextProvider from "./context/Product.context";
import CartContextProvider from "./context/Cart.context";
import Cart from "./pages/app/cart/Cart";
import SignUp from "./pages/app/signup/SignUp";
import AuthContextProvider from "./context/Authentication.context";
import SignIn from "./pages/app/signup/SignIn";
import MyOrders from "./pages/app/myOrders/MyOrders";
import OrderContextProvider from "./context/Order.context";
import Page404 from "./pages/misc/Page404/Page404";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      errorElement: <Page404 />,
      children: [
        { index: true, element: <Products /> },
        { path: "cart", element: <Cart /> },
        { path: "signup", element: <SignUp /> },
        { path: "signin", element: <SignIn /> },
        { path: "orders", element: <MyOrders /> },
      ],
    },
  ]);
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <div className="App">
              <RouterProvider router={browserRouter} />
            </div>
          </OrderContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
