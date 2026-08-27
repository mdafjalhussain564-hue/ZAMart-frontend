
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";

const API_URL = "http://localhost:3003";

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [addressLoading, setAddressLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  // ================= GET CART =================

  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(response.data.cart || []);
    } catch (error) {
      console.error(
        "Checkout Cart Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= GET ADDRESSES =================

  const getAddresses = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/address`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addressList = response.data.addresses || [];

      setAddresses(addressList);

      // Default address select karo
      const defaultAddress = addressList.find(
        (item) => Number(item.is_default) === 1
      );

      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      } else if (addressList.length > 0) {
        setSelectedAddressId(addressList[0].id);
      }
    } catch (error) {
      console.error(
        "Address Error:",
        error.response?.data || error.message
      );
    } finally {
      setAddressLoading(false);
    }
  };

  // ================= LOAD DATA =================

  useEffect(() => {
    getCart();
    getAddresses();
  }, []);

  // ================= TOTAL =================

  const total = cart.reduce((sum, item) => {
    return (
      sum +
      Number(item.price) * Number(item.quantity)
    );
  }, 0);

  // ================= PLACE ORDER =================

  // const placeOrder = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       alert("Please login first");
  //       router.push("/login");
  //       return;
  //     }

  //     if (cart.length === 0) {
  //       alert("Your cart is empty");
  //       return;
  //     }

  //     if (!selectedAddressId) {
  //       alert("Please select a delivery address");
  //       return;
  //     }

  //     setPlacingOrder(true);

  //     const response = await axios.post(
  //       `${API_URL}/api/orders/create`,
  //       {
  //         addressId: selectedAddressId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("ORDER RESPONSE:", response.data);

  //     window.dispatchEvent(new Event("cartUpdated"));

  //     alert("Order placed successfully!");

  //     router.push("/orders");

  //   } catch (error) {
  //     console.error(
  //       "Place Order Error:",
  //       error.response?.data || error.message
  //     );

  //     alert(
  //       error.response?.data?.message ||
  //       "Order placement failed"
  //     );
  //   } finally {
  //     setPlacingOrder(false);
  //   }
  // };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return null;
      }

      if (cart.length === 0) {
        alert("Your cart is empty");
        return null;
      }

      if (!selectedAddressId) {
        alert("Please select a delivery address");
        return null;
      }

      setPlacingOrder(true);

      const response = await axios.post(
        `${API_URL}/api/orders/create`,
        {
          addressId: selectedAddressId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ORDER RESPONSE:", response.data);

      window.dispatchEvent(new Event("cartUpdated"));

      // Order response return karo
      return response.data;

    } catch (error) {
      console.error(
        "Place Order Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Order placement failed"
      );

      return null;
    } finally {
      setPlacingOrder(false);
    }
  };



  // payNow

  const payNow = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }

      if (!selectedAddressId) {
        alert("Please select a delivery address");
        return;
      }

      setPlacingOrder(true);

      // Razorpay order create
      const response = await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          amount: total,
        }
      );

      const { order, key } = response.data;

      console.log("RAZORPAY KEY:", key);
      console.log("RAZORPAY ORDER:", order);

      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "Gmart",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (paymentResponse) {
          try {
            // Payment verify
            const verifyResponse = await axios.post(
              `${API_URL}/api/payment/verify`,
              {
                razorpay_order_id:
                  paymentResponse.razorpay_order_id,

                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,

                razorpay_signature:
                  paymentResponse.razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {
              const order = await placeOrder();

              if (!order) {
                return;
              }

              router.push(
                `/payment-success?orderId=${order.order_id}&paymentId=${paymentResponse.razorpay_payment_id}&amount=${order.total_amount}`
              );
            }

          } catch (error) {
            console.error(
              "VERIFY ERROR:",
              error.response?.data || error.message
            );

            alert("Payment verification failed");
            setPlacingOrder(false);
          }
        },

        prefill: {
          name: "Afjal",
          email: "afjal@gmail.com",
          contact: "9876543210",
        },

        theme: {
          color: "#000000",
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK is not loaded. Please refresh the page.");
        setPlacingOrder(false);
        return;
      }

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.error(
        "PAYMENT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Payment initialization failed"
      );

      setPlacingOrder(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading checkout...</p>
      </div>
    );
  }

  // ================= UI =================

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Razorpay SDK loaded");
        }}
        onError={() => {
          console.error("Razorpay SDK failed to load");
        }}
      />
      <div className="min-h-screen bg-gray-100 py-10 px-4">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            Checkout
          </h1>

          {cart.length === 0 ? (

            <div className="bg-white rounded-lg shadow p-10 text-center">

              <h2 className="text-xl font-semibold">
                Your cart is empty
              </h2>

              <button
                onClick={() => router.push("/")}
                className="mt-5 bg-black text-white px-6 py-3 rounded-lg"
              >
                Continue Shopping
              </button>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ================= LEFT ================= */}

              <div className="lg:col-span-2 space-y-6">

                {/* ================= DELIVERY ADDRESS ================= */}

                <div className="bg-white rounded-lg shadow p-6">

                  <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                      Delivery Address
                    </h2>

                    <button
                      onClick={() => router.push("/address")}
                      className="text-blue-600 font-semibold"
                    >
                      + Add Address
                    </button>

                  </div>

                  {addressLoading ? (

                    <p className="text-gray-500">
                      Loading addresses...
                    </p>

                  ) : addresses.length === 0 ? (

                    <div className="border border-dashed rounded-lg p-6 text-center">

                      <p className="text-gray-600 mb-4">
                        No delivery address found
                      </p>

                      <button
                        onClick={() => router.push("/address")}
                        className="bg-black text-white px-5 py-2 rounded-lg"
                      >
                        Add Delivery Address
                      </button>

                    </div>

                  ) : (

                    <div className="space-y-4">

                      {addresses.map((item) => (

                        <div
                          key={item.id}
                          onClick={() =>
                            setSelectedAddressId(item.id)
                          }
                          className={`border rounded-lg p-4 cursor-pointer transition ${Number(selectedAddressId) === Number(item.id)
                            ? "border-black bg-gray-50"
                            : "border-gray-200"
                            }`}
                        >

                          <div className="flex gap-3">

                            <input
                              type="radio"
                              name="deliveryAddress"
                              checked={
                                Number(selectedAddressId) ===
                                Number(item.id)
                              }
                              onChange={() =>
                                setSelectedAddressId(item.id)
                              }
                            />

                            <div>

                              <div className="flex items-center gap-2">

                                <h3 className="font-bold">
                                  {item.full_name}
                                </h3>

                                {Number(item.is_default) === 1 && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                    Default
                                  </span>
                                )}

                              </div>

                              <p className="text-gray-600 mt-1">
                                {item.mobile}
                              </p>

                              <p className="text-gray-700 mt-2">
                                {item.address}
                              </p>

                              <p className="text-gray-700">
                                {item.city}, {item.state} -{" "}
                                {item.pincode}
                              </p>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                </div>

                {/* ================= PRODUCTS ================= */}

                <div className="bg-white rounded-lg shadow p-6">

                  <h2 className="text-2xl font-bold mb-6">
                    Your Items
                  </h2>

                  <div className="space-y-5">

                    {cart.map((item) => (

                      <div
                        key={item.id}
                        className="flex gap-5 border-b pb-5"
                      >

                        <img
                          src={item.image}
                          alt={item.product_name}
                          className="w-28 h-32 object-contain rounded-lg"
                        />

                        <div className="flex-1">

                          <h3 className="text-lg font-semibold">
                            {item.product_name}
                          </h3>

                          <p className="text-gray-600 mt-2">
                            ₹{item.price}
                          </p>

                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>

                        </div>

                        <div className="font-bold">
                          ₹
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toFixed(2)}
                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

              {/* ================= ORDER SUMMARY ================= */}

              <div className="bg-white rounded-lg shadow p-6 h-fit">

                <h2 className="text-2xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-4">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between mb-4">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-4">
                  <span>Delivery</span>
                  <span className="text-green-600">
                    FREE
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span>
                    ₹{total.toFixed(2)}
                  </span>

                </div>

                <button
                  onClick={payNow}
                  disabled={
                    placingOrder ||
                    !selectedAddressId
                  }
                  className="w-full bg-black text-white py-3 rounded-lg mt-6 disabled:opacity-50"
                >
                  {placingOrder
                    ? "Processing Payment..."
                    : "Pay Now"}
                </button>

              </div>

            </div>

          )}

        </div>

      </div>
    </>
  );
}