"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "https://zamart-backend3.onrender.com";


export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Cart fetch
    const getCart = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token not found");
                return;
            }

            const response = await axios.get(`${API_URL}/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCart(response.data.cart || []);
        } catch (error) {
            console.error(
                "Get Cart Error:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    // Quantity update
    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;

        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `${API_URL}/api/cart/update`,
                {
                    product_id: productId,
                    quantity: quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            getCart();
        } catch (error) {
            console.error(
                "Update Cart Error:",
                error.response?.data || error.message
            );
        }
    };

    // Remove product
    const removeFromCart = async (productId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${API_URL}/api/cart/remove`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    product_id: productId,
                },
            });

            getCart();

            // Navbar ka cart count refresh
            window.dispatchEvent(
                new Event("cartUpdated")
            );
            
        } catch (error) {
            console.error(
                "Remove Cart Error:",
                error.response?.data || error.message
            );
        }
    };

    // Total
    const total = cart.reduce((sum, item) => {
        return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">Loading cart...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    My Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-lg p-10 text-center shadow">
                        <h2 className="text-xl font-semibold mb-2">
                            Your cart is empty
                        </h2>

                        <p className="text-gray-500">
                            Add some products to your cart.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Cart Products */}
                        <div className="lg:col-span-2 space-y-4">

                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg shadow p-5 flex flex-col sm:flex-row gap-5"
                                >

                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={item.product_name}
                                        className="w-40 h-48 object-contain rounded-lg"
                                    />

                                    {/* Product Info */}
                                    <div className="flex-1">

                                        <h2 className="text-xl font-semibold">
                                            {item.product_name}
                                        </h2>

                                        <p className="text-gray-600 mt-2">
                                            ₹{item.price}
                                        </p>

                                        {/* Quantity */}
                                        <div className="flex items-center gap-3 mt-4">

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product_id,
                                                        Number(item.quantity) - 1
                                                    )
                                                }
                                                disabled={Number(item.quantity) <= 1}
                                                className="w-9 h-9 border rounded-md text-xl hover:bg-gray-100 disabled:opacity-40"
                                            >
                                                -
                                            </button>

                                            <span className="font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product_id,
                                                        Number(item.quantity) + 1
                                                    )
                                                }
                                                className="w-9 h-9 border rounded-md text-xl hover:bg-gray-100"
                                            >
                                                +
                                            </button>

                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() =>
                                                removeFromCart(item.product_id)
                                            }
                                            className="text-red-500 mt-4 hover:underline"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                    {/* Item Total */}
                                    <div className="font-bold text-lg">
                                        ₹
                                        {(
                                            Number(item.price) *
                                            Number(item.quantity)
                                        ).toFixed(2)}
                                    </div>

                                </div>
                            ))}

                        </div>

                        {/* Summary */}
                        <div className="bg-white rounded-lg shadow p-6 h-fit">

                            <h2 className="text-2xl font-bold mb-6">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mb-4">
                                <span>Items</span>
                                <span>{cart.length}</span>
                            </div>

                            <div className="border-t pt-4 flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={() => router.push("/checkout")}
                                className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800"
                            >
                                Proceed to Checkout
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}


