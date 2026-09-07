// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const API_URL = "https://zamart-backend3.onrender.com";


// export default function OrdersPage() {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     const getOrders = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             console.log("ADMIN TOKEN:", token);

//             if (!token) {
//                 alert("Please login first");
//                 return;
//             }

//             const response = await axios.get(
//                 `${API_URL}/api/orders`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             console.log("ORDERS RESPONSE:", response.data);

//             setOrders(response.data.orders || []);
//         } catch (error) {
//             console.error(
//                 "Get Orders Error:",
//                 error.response?.data || error.message
//             );
//         } finally {
//             setLoading(false);
//         }
//     };



//     useEffect(() => {
//         getOrders();
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p>Loading orders...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 py-10 px-4">
//             <div className="max-w-5xl mx-auto">

//                 <h1 className="text-3xl font-bold mb-8">
//                     My Orders
//                 </h1>

//                 {orders.length === 0 ? (
//                     <div className="bg-white rounded-lg shadow p-10 text-center">
//                         <h2 className="text-xl font-semibold">
//                             No orders found
//                         </h2>

//                         <p className="text-gray-500 mt-2">
//                             You haven't placed any orders yet.
//                         </p>
//                     </div>
//                 ) : (
//                     <div className="space-y-5">

//                         {orders.map((order) => (
//                             <div key={`${order.order_id}-${order.product_id}`}
//                                 className="bg-white rounded-lg shadow p-5"
//                             >

//                                 {/* Order Header */}
//                                 <div className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b pb-4">

//                                     <div>
//                                         <h2 className="font-bold text-lg">
//                                             Order #{order.order_id}
//                                         </h2>

//                                         <p className="text-gray-500 text-sm">
//                                             {new Date(
//                                                 order.created_at
//                                             ).toLocaleString()}
//                                         </p>
//                                     </div>

//                                     <span className="text-green-600 font-semibold">
//                                         {order.status}
//                                     </span>

//                                 </div>

//                                 {/* Product */}
//                                 <div className="flex gap-5 py-5">

//                                     <img
//                                         src={order.image}
//                                         alt={order.product_name}
//                                         className="w-28 h-32 object-contain rounded-lg"
//                                     />

//                                     <div>
//                                         <h3 className="text-lg font-semibold">
//                                             {order.product_name}
//                                         </h3>

//                                         <p className="text-gray-600 mt-2">
//                                             Price: ₹{order.price}
//                                         </p>

//                                         <p className="text-gray-600">
//                                             Quantity: {order.quantity}
//                                         </p>
//                                     </div>

//                                 </div>

//                                 {/* Total */}
//                                 <div className="border-t pt-4 flex justify-between text-lg font-bold">
//                                     <span>Total Amount</span>

//                                     <span>
//                                         ₹{Number(order.total_amount).toFixed(2)}
//                                     </span>
//                                 </div>

//                                 <button
//                                     onClick={() => router.push(`/orders/${order.order_id}`)}
//                                     className="bg-black text-white px-5 py-2 rounded-lg mt-4"
//                                 >
//                                     View Details
//                                 </button>

//                             </div>
//                         ))}

//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// }




"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "https://zamart-backend3.onrender.com";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Return states
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [returnReason, setReturnReason] = useState("");
    const [returnDescription, setReturnDescription] = useState("");
    const [returnLoading, setReturnLoading] = useState(false);

    const router = useRouter();

    const getOrders = async () => {
        try {
            const token = localStorage.getItem("token");

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

    // Open Return Modal
    const openReturnModal = (order) => {
        setSelectedOrder(order);
        setReturnReason("");
        setReturnDescription("");
        setShowReturnModal(true);
    };

    // Submit Return
    const submitReturn = async () => {
        if (!returnReason) {
            alert("Please select return reason");
            return;
        }

        try {
            setReturnLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first");
                return;
            }

            // Backend API hum next step me banayenge
            const response = await axios.post(
                `${API_URL}/api/returns`,
                {
                    order_id: selectedOrder.order_id,
                    product_id: selectedOrder.product_id,
                    reason: returnReason,
                    description: returnDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("RETURN RESPONSE:", response.data);

            alert("Return request submitted successfully!");

            setShowReturnModal(false);

            // Local UI status update
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.order_id === selectedOrder.order_id &&
                        order.product_id === selectedOrder.product_id
                        ? {
                            ...order,
                            return_status: "Return Requested",
                        }
                        : order
                )
            );

        } catch (error) {
            console.error(
                "Return Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to submit return request"
            );
        } finally {
            setReturnLoading(false);
        }
    };

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
                            <div
                                key={`${order.order_id}-${order.product_id}`}
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
                                        src={
                                            order.image?.startsWith("/uploads/")
                                                ? `https://zamart-backend3.onrender.com${order.image}`
                                                : order.image || "/placeholder.png"
                                        }
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

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-3 mt-4">

                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/orders/${order.order_id}`
                                            )
                                        }
                                        className="bg-black text-white px-5 py-2 rounded-lg"
                                    >
                                        View Details
                                    </button>

                                    {/* Return Button */}
                                    <button
                                        onClick={() => openReturnModal(order)}
                                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                                    >
                                        Return Product
                                    </button>

                                    {/* Return Status */}
                                    {order.return_status && (
                                        <span className="px-5 py-2 rounded-lg bg-yellow-100 text-yellow-700 font-semibold">
                                            {order.return_status}
                                        </span>
                                    )}

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

            {/* ================= RETURN MODAL ================= */}

            {showReturnModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">

                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-xl font-bold">
                                Return Product
                            </h2>

                            <button
                                onClick={() => setShowReturnModal(false)}
                                className="text-gray-500 text-2xl"
                            >
                                ×
                            </button>

                        </div>

                        {/* Product */}
                        <div className="flex gap-3 mb-5">

                            <img
                                src={selectedOrder.image}
                                alt={selectedOrder.product_name}
                                className="w-16 h-16 object-contain border rounded"
                            />

                            <div>
                                <h3 className="font-semibold">
                                    {selectedOrder.product_name}
                                </h3>

                                <p className="text-gray-500 text-sm">
                                    Order #{selectedOrder.order_id}
                                </p>
                            </div>

                        </div>

                        {/* Reason */}
                        <label className="block font-semibold mb-2">
                            Return Reason
                        </label>

                        <select
                            value={returnReason}
                            onChange={(e) =>
                                setReturnReason(e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-3 mb-4 outline-none"
                        >
                            <option value="">
                                Select reason
                            </option>

                            <option value="Wrong Product Received">
                                Wrong Product Received
                            </option>

                            <option value="Damaged Product">
                                Damaged Product
                            </option>

                            <option value="Product Not as Described">
                                Product Not as Described
                            </option>

                            <option value="Missing Parts / Items">
                                Missing Parts / Items
                            </option>

                            <option value="Quality Issue">
                                Quality Issue
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>

                        {/* Description */}
                        <label className="block font-semibold mb-2">
                            Description
                        </label>

                        <textarea
                            value={returnDescription}
                            onChange={(e) =>
                                setReturnDescription(e.target.value)
                            }
                            placeholder="Tell us more about the problem..."
                            rows="4"
                            className="w-full border rounded-lg px-3 py-3 outline-none resize-none"
                        />

                        {/* Buttons */}
                        <div className="flex gap-3 mt-5">

                            <button
                                onClick={() =>
                                    setShowReturnModal(false)
                                }
                                className="flex-1 border border-gray-300 py-3 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={submitReturn}
                                disabled={returnLoading}
                                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >
                                {returnLoading
                                    ? "Submitting..."
                                    : "Submit Return"}
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}

