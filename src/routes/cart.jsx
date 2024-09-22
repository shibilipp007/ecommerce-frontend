import { useSelector } from "react-redux";

export default function Cart() {
  const { cart } = useSelector((state) => state.cart);

  function handleQuantityChange() {}

  function handleRemoveItem(id) {
    if (!confirm("Are you sure")) return;
    alert(JSON.stringify(`Item removed successfully ${id}`));
  }

  // if (cart.isPending) return "loading...";

  // console.log(cart.items);

  return (
    <section className="py-10">
      <div className="mx-auto lg:w-4/5">
        <h1 className="text-4xl uppercase font-bold mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-12">
          <div className="col-span-8">
            {cart?.products?.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {cart?.products?.map((item) => (
                  <div
                    key={item.product._id}
                    className="grid grid-cols-12 p-4 border-b border-solid border-b-gray-500"
                  >
                    {/* Product Image */}
                    <div className="flex items-center col-span-8">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover"
                      />

                      {/* Product Name */}
                      <h2 className="text-lg font-semibold truncate ml-4">
                        {item?.product?.title}
                      </h2>
                    </div>

                    {/* Quantity Control */}
                    <div className="col-span-4 items-center grid grid-cols-3">
                      <div className="flex items-center space-x-2 ml-6">
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-200"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-lg font-semibold">
                        &#8377;{item?.product?.price}
                      </p>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item._id)}
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
        </div>
      </div>
    </section>
  );
}
