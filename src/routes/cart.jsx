import { useDispatch, useSelector } from "react-redux";
import { removeItems, updateQuantity } from "../features/cart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const handleQuantityChange = (productId, quantity) => {
    console.log(productId);
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  function handleRemoveItem(id) {
    if (!confirm("Are you sure")) return;
    console.log(id);

    dispatch(removeItems(id));
  }

  // if (cart.isPending) return "loading...";

  // console.log(cart.items);

  const CheckOutButton = ({ item }) => {
    return () => {
      if (!item || item.length === 0) {
        alert("your cart is empty");
      } else {
        navigate("/orders/check-out");
      }
    };
  };

  return (
    <section className="py-10">
      <div className="mx-auto lg:w-4/5">
        <h1 className="text-4xl uppercase font-bold mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-12">
          <div className="col-span-8">
            {!cart?.products?.length ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {cart?.products?.map((item) => (
                  <div
                    key={item?.product?._id}
                    className="grid grid-cols-12 p-4 border-b border-solid border-b-gray-500"
                  >
                    {/* Product Image */}
                    <div className="flex items-center col-span-8">
                      <img
                        src={item?.product?.images?.[0]}
                        alt={item?.product?.name}
                        className="w-20 h-20 object-cover"
                      />

                      {/* Product Name */}
                      <h2 className="text-lg font-semibold truncate ml-4 dark:text-white">
                        {item?.product?.title}
                      </h2>
                    </div>

                    {/* Quantity Control */}
                    <div className="col-span-4 items-center grid grid-cols-3 ">
                      <div className="flex items-center space-x-2 ml-6 flex-shrink-0 dark:text-white">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-1 bg-gray-200"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 bg-gray-200"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-lg font-semibold text-center dark:text-white">
                        &#8377;{item?.product?.price}
                      </p>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-4 ">
            <div className="bg-white shadow-lg p-8">
              <h1>Total</h1>
              <p>
                delivry fees:<span>&#8377;40</span>
              </p>
              <p>
                Subtotal:<span>&#8377;{cart?.totalPrice}</span>
              </p>
              <div>
                <button
                  onClick={CheckOutButton({ item: cart?.products })}
                  className="bg-blue-500 px-3 h-9 w-full rounded flex items-center justify-center mt-4 text-white  "
                >
                  CheckOut
                </button>
                {message && <p className="text-red-500 text-sm ">{message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
