import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Adress from "../components/adress";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import api from "../lib/api";

function Checkout() {
  const { cart } = useSelector((state) => state.cart);
  const [adress, setAdress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handlepayment = (event) => {
    setPaymentMethod(event.target.value);
  };

  const validateAdress = () => {
    // if (Object.keys(adress).length === 0) {
    //   alert("please fill out the address feild");
    //   return false;
    // }
    return true;
  };

  const makePayment = async () => {
    if (!validateAdress()) return;

    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const body = {
      products: cart.products,
      paymentMethod,
    };

    try {
      const respone = await api.post(`/auth/create_checkout_session`, body, {
        headers: { "Content-type": "application/json" },
      });
      const data = respone.data;

      if (paymentMethod === "cod") {
        navigate(data.navigationEndpoint.url);
        return;
      }

      if (paymentMethod === "card") {
        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        console.log(result.error);
      }
    } catch (error) {
      console.error("Error during payment", error);
    }
  };

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    }
  };

  return (
    <div className="container mx-auto mt-10 py-4 px-7">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Checkout</h2>
      <div className="grid grid-cols-2">
        <div>
          {/* Shipping Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Shipping Information
            </h3>
            <div className="mb-4">
              <Adress onAdressSubmit={(data) => setAdress(data)} />
            </div>
          </div>
          {/* Payment Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Payment Information
            </h3>
            <div className="mb-4 dark:text-white">
              <div>
                <label>
                  <input
                    type="radio"
                    value={"cod"}
                    checked={paymentMethod === `cod`}
                    onChange={handlepayment}
                  />
                  Cash on Delivery
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value={"card"}
                    checked={paymentMethod === `card`}
                    onChange={handlepayment}
                  />
                  card
                </label>
                <p>
                  you selected :{""}
                  {paymentMethod === "cod"
                    ? "cash On delivery"
                    : paymentMethod === "card"
                    ? "card"
                    : "None"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-3">
          <div className="row-span-1">
            <h1 className="font-semibold text-2xl border-b pb-8 dark:text-white">
              Order Summary
            </h1>
          </div>
          <div>
            {/* displaying cart items */}
            <div>
              <div className=" grid-cols-1 gap-6">
                {cart?.products?.map((items) => (
                  <div key={items.product._id}>
                    <div className="flex items-center ">
                      <img
                        src={items.product.images[0]}
                        alt={items.product.name}
                        className="w-20 h-20 object-cover"
                      />

                      {/* Product Name */}
                      <h2 className="text-lg font-semibold truncate ml-4 dark:text-white">
                        {truncateString(items?.product?.title, 20)}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between mt-10 border-t pb-8">
            <span className="font-semibold text-sm uppercase dark:text-white">
              Items: {cart?.products?.length}
            </span>

            <div>
              <span className="font-semibold text-sm dark:text-white">
                sub Total: &#8377; {cart?.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="flex justify-end">
        <button
          onClick={makePayment}
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none pl-4 dark:text-white"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
