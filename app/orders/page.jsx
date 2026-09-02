"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "https://zamart-backend3.onrender.com";


export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const getOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            console.log("ADMIN TOKEN:", token);

            if (!token) {
                alert("Please login first");
                return;
            }

            const response = await axios.get(
                `${API_URL}/api/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("ORDERS RESPONSE:", response.data);

            setOrders(response.data.orders || []);
        } catch (error) {
            console.error(
                "Get Orders Error:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };


    
    useEffect(() => {
        getOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-10 text-center">
                        <h2 className="text-xl font-semibold">
                            No orders found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You haven't placed any orders yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">

                        {orders.map((order) => (
                            <div key={`${order.order_id}-${order.product_id}`}
                                className="bg-white rounded-lg shadow p-5"
                            >

                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b pb-4">

                                    <div>
                                        <h2 className="font-bold text-lg">
                                            Order #{order.order_id}
                                        </h2>

                                        <p className="text-gray-500 text-sm">
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
                                <div className="flex gap-5 py-5">

                                    <img
                                        src={order.image}
                                        alt={order.product_name}
                                        className="w-28 h-32 object-contain rounded-lg"
                                    />

                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {order.product_name}
                                        </h3>

                                        <p className="text-gray-600 mt-2">
                                            Price: ₹{order.price}
                                        </p>

                                        <p className="text-gray-600">
                                            Quantity: {order.quantity}
                                        </p>
                                    </div>

                                </div>

                                {/* Total */}
                                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                                    <span>Total Amount</span>

                                    <span>
                                        ₹{Number(order.total_amount).toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    onClick={() => router.push(`/orders/${order.order_id}`)}
                                    className="bg-black text-white px-5 py-2 rounded-lg mt-4"
                                >
                                    View Details
                                </button>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}