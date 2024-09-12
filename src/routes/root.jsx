import { BsHandbag } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
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
              <div className="flex flex-row gap-4 items-center">
                <FiSearch size={24} />
                <BsHandbag size={24} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="pt-24">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
