"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const API_URL = "http://localhost:3003";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
       alert("Please login first");
        router.push("/login");
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ORDER DETAILS:", response.data);

      if (response.data.order?.length > 0) {
        setOrder(response.data.order[0]);
      }
    } catch (error) {
      console.error(
        "Order Details Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getOrderDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Order not found
          </h2>

          <button
            onClick={() => router.push("/orders")}
            className="mt-5 bg-black text-white px-6 py-3 rounded-lg"
          >
            Back to My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* Back Button */}

        <button
          onClick={() => router.push("/orders")}
          className="mb-6 text-gray-700 hover:text-black"
        >
          ← Back to My Orders
        </button>

        {/* Order Details */}

        <div className="bg-white rounded-xl shadow p-6">

          {/* Header */}

          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 border-b pb-5">

            <div>
              <h1 className="text-2xl font-bold">
                Order #{order.order_id}
              </h1>

              <p className="text-gray-500 mt-1">
                {new Date(
                  order.created_at
                ).toLocaleString()}
              </p>
            </div>

            <span className="text-green-600 font-semibold">
              {order.status}
            </span>

          </div>

          {/* Product */}

          <div className="flex flex-col sm:flex-row gap-6 py-7">

            <img
              src={order.image}
              alt={order.product_name}
              className="w-40 h-48 object-contain rounded-lg"
            />

            <div className="flex-1">

              <h2 className="text-2xl font-semibold">
                {order.product_name}
              </h2>

              <div className="mt-5 space-y-2 text-gray-600">

                <p>
                  Price: ₹{Number(order.price).toFixed(2)}
                </p>

                <p>
                  Quantity: {order.quantity}
                </p>

                <p>
                  Product ID: {order.product_id}
                </p>

              </div>

            </div>

          </div>

          {/* Total */}

          <div className="border-t pt-5">

            <div className="flex justify-between text-xl font-bold">
              <span>Total Amount</span>

              <span>
                ₹{Number(order.total_amount).toFixed(2)}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

