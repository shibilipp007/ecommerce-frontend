import { useEffect } from "react";
import { BsHandbag } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { loadCartItems } from "../features/cart";

export default function Root() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(loadCartItems());
  }, []);

  return (
    <>
      <header className="h-20 shadow-lg z-50 fixed top-0 left-0 right-0 bg-white drop-shadow flex items-stretch">
        <div className="flex items-stretch mx-auto lg:w-4/5">
          <div className="px-4 flex items-center justify-between w-full">
            <Link
              to={"/"}
              className="text-lg font-medium uppercase tracking-wide"
            >
              Vergio
            </Link>
            <nav>
              <ul className="flex flex-row gap-6 items-center">
                <li>
                  <Link>Home</Link>
                </li>
                <li>
                  <Link>Shop</Link>
                </li>
                <li>
                  <Link>About us</Link>
                </li>
                <li>
                  <Link>Contact us</Link>
                </li>
              </ul>
            </nav>
            <div>
              <div className="flex flex-row gap-4 items-center relative">
                <FiSearch size={24} />
                <div>
                  <Link to={"/cart"}>
                    <BsHandbag size={24} />
                    <span className="absolute top-2/3 bg-red-500 text-white w-5 h-5 rounded-full flex justify-center items-center">
                      {cart?.products?.length || 0}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="pt-24">
        <Outlet />
      </main>
      <footer>
        <div className="bg-black mx-auto lg:w-4/5 text-white py-6 px-4 items-center relative">
          <div className="grid grid-cols-4 justify-between ">
            <div className="flex flex-col">
              <h1>About Us</h1>
              <span>company </span>
              <span>Blogs </span>
              <span>Sustainability </span>
            </div>
            <div className="flex flex-col">
              <h1>About Us</h1>
              <span>company </span>
              <span>Blogs </span>
              <span>Sustainability </span>
            </div>
            <div className="flex flex-col">
              <h1>About Us</h1>
              <span>company </span>
              <span>Blogs </span>
              <span>Sustainability </span>
            </div>
            <div className="flex flex-col">
              <h1>About Us</h1>
              <span>company </span>
              <span>Blogs </span>
              <span>Sustainability </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
