import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import ErrorPage from "./error-page";
import Root from "./routes/root";
import Signup from "./routes/signup";
import Login from "./routes/login";
import Home, { loader as homeLoader } from "./routes/home";
import Details, { loader as detailsLoader } from "./routes/details";
import Cart from "./routes/cart";
import Checkout from "./routes/checkout";
import Success from "./routes/success";
import Search, { loader as searchLoader } from "./routes/search";
import Profile, { loader as profileLoader } from "./routes/profile";
import Shop, { loader as shopLoader } from "./routes/shop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        Component: Home,
        loader: homeLoader,
      },
      {
        path: "/:slug/dp/:productId",
        Component: Details,
        loader: detailsLoader,
      },
      {
        path: "/signup",
        Component: Signup,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/orders",
        children: [
          {
            path: "check-out",
            Component: Checkout,
          },
          {
            path: "success",
            Component: Success,
          },
        ],
      },
      {
        path: "search",
        Component: Search,
        loader: searchLoader,
      },
      {
        path: "profile",
        Component: Profile,
        loader: profileLoader,
      },
      {
        path: "offers",
        Component: Shop,
        loader: shopLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
