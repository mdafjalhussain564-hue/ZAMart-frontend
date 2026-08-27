// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import React from "react";

// export default function PaymentSuccess() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const orderId = searchParams.get("orderId");
//   const paymentId = searchParams.get("paymentId");
//   const amount = searchParams.get("amount");

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-center">

//         <div className="text-6xl mb-4">
//           ✅
//         </div>

//         <h1 className="text-3xl font-bold text-green-600 mb-3">
//           Payment Successful!
//         </h1>

//         <p className="text-gray-600 mb-6">
//           Your order has been placed successfully.
//         </p>

//         <div className="bg-gray-50 rounded-xl p-5 text-left space-y-4 mb-6">

//           <div className="flex justify-between">
//             <span className="text-gray-500">
//               Order ID
//             </span>

//             <span className="font-semibold">
//               #{orderId}
//             </span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-500">
//               Amount Paid
//             </span>

//             <span className="font-semibold">
//               ₹{Number(amount).toLocaleString("en-IN")}
//             </span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-500">
//               Payment Status
//             </span>

//             <span className="font-semibold text-green-600">
//               Paid ✓
//             </span>
//           </div>

//         </div>

//         <p className="text-xs text-gray-400 mb-6 break-all">
//           Payment ID: {paymentId}
//         </p>

//         <div className="space-y-3">

//           <button
//             onClick={() => router.push("/orders")}
//             className="w-full bg-black text-white py-3 rounded-lg font-semibold"
//           >
//             View My Orders
//           </button>

//           <button
//             onClick={() => router.push("/")}
//             className="w-full border border-gray-300 py-3 rounded-lg font-semibold"
//           >
//             Continue Shopping
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");
  const amount = searchParams.get("amount");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-center">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>

        <div className="bg-gray-50 rounded-xl p-5 text-left space-y-4 mb-6">

          <div className="flex justify-between">
            <span className="text-gray-500">
              Order ID
            </span>

            <span className="font-semibold">
              #{orderId || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Amount Paid
            </span>

            <span className="font-semibold">
              ₹{Number(amount || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Payment Status
            </span>

            <span className="font-semibold text-green-600">
              Paid ✓
            </span>
          </div>

        </div>

        <p className="text-xs text-gray-400 mb-6 break-all">
          Payment ID: {paymentId || "N/A"}
        </p>

        <div className="space-y-3">

          <button
            onClick={() => router.push("/orders")}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold"
          >
            View My Orders
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full border border-gray-300 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}