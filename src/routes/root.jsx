import { useEffect, useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { loadCartItems } from "@/features/cart";
import api from "@/lib/api";
import { changeLoginStatus, logout } from "@/features/login";
import SearchBar from "@/components/searchBar";
import { LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Root() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [theme, setTheme] = useState("light");
  3;

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    dispatch(loadCartItems());
  }, []);

  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await api.get("/auth/verify");
        console.log(res.data);

        dispatch(
          changeLoginStatus({
            loggedIn: true,
            user: res.data,
          })
        );
      } catch {
        dispatch(
          changeLoginStatus({
            loggedIn: false,
            user: null,
          })
        );
      }
    }

    verifyAuth();
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col flex-grow min-h-screen">
        <header className="h-20 flex-shrink-0 shadow-lg z-50 sticky top-0 bg-white dark:bg-slate-950 dark:text-white drop-shadow flex items-stretch">
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
                  <SearchBar />
                  <div>
                    <Link to={"/cart"}>
                      <BsHandbag size={24} />
                      <span className="absolute top-2/3 bg-red-500 text-white w-5 h-5 rounded-full flex justify-center items-center">
                        {cart?.products?.length || 0}
                      </span>
                    </Link>
                  </div>
                  <div>
                    {loggedIn ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="bg-gray-300 h-10 w-10 flex flex-row justify-center items-center rounded-full">
                            {user?.name?.charAt(0).toUpperCase()}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem asChild>
                            <Link to={"/profile"}>
                              <User className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            className="flex justify-between items-center"
                          >
                            <Label htmlFor="dark">Dark Mode</Label>
                            <Switch
                              checked={theme === "dark"}
                              onCheckedChange={() => toggleTheme()}
                              id="dark"
                            />
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => {
                              dispatch(logout());
                              // window.location.reload();
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button asChild>
                        <Link to={"/login"}>Login</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow flex-shrink flex flex-col dark:bg-dark">
          <Outlet />
        </main>
        <footer className="bg-slate-800 dark:bg-black flex-shrink-0">
          <div className="mx-auto lg:w-4/5 text-white py-6 px-4 items-center relative">
            <div className="grid grid-cols-4 justify-between ">
              <div className="flex flex-col">
                <h1>About Us</h1>
                <span>company </span>
                <span>Blogs </span>
                <span>Sustainability </span>
              </div>
              <div className="flex flex-col">
                <h1>Programe</h1>
                <span>Become an ambasidor</span>
              </div>
              <div className="flex flex-col">
                <h1>Help</h1>
                <span>Terms & conditions </span>
                <span>Privacy policy</span>
                <span>user policy</span>
              </div>
              <div className="flex flex-col">
                <h1>Contact US</h1>
                <span>care.in@gmail.com </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
