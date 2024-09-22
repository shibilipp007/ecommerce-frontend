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
