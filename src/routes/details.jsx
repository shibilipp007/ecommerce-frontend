import { useLoaderData, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart";

export async function loader({ params }) {
  const response = await api.get(`/products/${params.productId}`);
  const data = response.data;
  return { data };
}

export default function Details() {
  const { data: product } = useLoaderData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { loggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart =
    ({ productId, quantity }) =>
    () => {
      dispatch(addToCart({ productId, quantity }));
    };

  const protectedAction = (callback) => () => {
    if (!loggedIn) {
      return navigate(
        `/login?next=${encodeURIComponent(window.location.pathname)}`
      );
    }

    return callback();
  };

  return (
    <div className="mx-auto lg:w-4/5">
      <div className="px-5">
        <div className="flex justify-between gap-4">
          <div className="w-3/5">
            <div className="flex">
              <div>
                <ul className="space-y-4">
                  {product.images?.map((img, idx) => (
                    <li key={idx}>
                      <div
                        className={twMerge(
                          clsx(
                            "w-full cursor-pointer border-2 border-solid border-gray-200",
                            currentIndex === idx && "border-black"
                          )
                        )}
                        onClick={() => setCurrentIndex(idx)}
                      >
                        <img
                          src={img}
                          alt={product?.title}
                          className="w-[72px]"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-6">
                <img
                  className="max-w-full"
                  src={product.images?.[currentIndex]}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div>
              <div>
                <h1 className="font-bold text-xl mb-3 dark:text-white">
                  {product.title}
                </h1>
              </div>
              <div>
                <del className="dark:text-white">400</del>
                <h3 className="text-3xl font-medium dark:text-white">
                  &#8377;{product.price}
                </h3>
              </div>
              <div className="my-4 flex dark:text-white">
                <button
                  onClick={() => {
                    if (quantity <= 1) {
                      setQuantity(1);
                    } else {
                      setQuantity((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => {
                    if (quantity < product.quantity) {
                      setQuantity((prev) => prev + 1);
                    }
                  }}
                >
                  +
                </button>
              </div>
              <button
                className="px-4 h-9 rounded-md select-none bg-blue-500 text-white font-medium w-full mt-2"
                onClick={protectedAction(
                  handleAddToCart({
                    productId: product._id,
                    quantity,
                  })
                )}
              >
                Add to bag
              </button>
              <p className="mt-4 text-sm text-slate-600">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
