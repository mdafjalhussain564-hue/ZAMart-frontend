// "use client"
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";


// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3003/api/getproduct/${id}`)
//       .then((res) => setProduct(res.data.data))
//       .catch((err) => console.log(err));
//   }, [id]);

//   if (!product) {
//     return <h2 className="text-center mt-20">Loading...</h2>;
//   }


//   const addToCart = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       // alert("Please login first");
//       router.push("/login") 
//       return;
//     }

//     const response = await axios.post(
//       "http://localhost:3003/api/cart/add",
//       {
//         product_id: id,
//         quantity: 1,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("ADD CART RESPONSE:", response.data);

//     window.dispatchEvent(new Event("cartUpdated"));

//     alert("Product added to cart");
//   } catch (error) {
//     console.error(
//       "Add Cart Error:",
//       error.response?.data || error.message
//     );
//   }
// };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">
//       <div className="grid md:grid-cols-2 gap-10">

//         <div>
//           <img
//             src={product.image}
//             alt={product.product_name}
//             className="w-sm h-[30rem]  rounded-lg shadow-lg"
//           />
//         </div>

//         <div>

//           <h4 className="text-sm text-gray-500">{product.brand}</h4>

//               <h2 className="text-lg font-semibold mt-1 line-clamp-2">
//                 {product.product_name}
//               </h2>

//               <div className="flex items-center gap-2 mt-2">
//                 <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
//                   {product.rating} ★
//                 </span>
//               </div>

//               <div className="flex items-center gap-3 mt-3">
//                 <span className="text-xl font-bold text-black">
//                   ₹{product.price}
//                 </span>

//                 <span className="text-gray-500 line-through">
//                   ₹{product.mrp}
//                 </span>

//                 <span className="text-green-600 text-sm font-semibold">
//                   {Math.round(
//                     ((product.mrp - product.price) / product.mrp) * 100
//                   )}
//                   % OFF
//                 </span>
//               </div>

//               <p className="text-gray-600 text-sm mt-3 line-clamp-3">
//                 {product.description}
//               </p>

//           <div className="mt-8 flex gap-5">
//             <button onClick={addToCart} className="w-[50%] border px-6 py-3 rounded-lg font-bold">
//               Add to Cart
//             </button>

//             <button className="bg-[#ffe51f]  w-[50%] text-black font-bold px-6 py-3 rounded-lg ">
//               Buy at ₹
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductDetails;






"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://zamart-backend3.onrender.com/api/getproduct/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-20">Loading...</h2>;
  }

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    // Login nahi hai
    if (!token) {
      // Product ID save karo
      localStorage.setItem("pendingCartProduct", id);
      // Login page
      router.push("/login");
      return;
    }

    // Already login hai
    try {
      await axios.post(
        "https://zamart-backend3.onrender.com/api/cart/add",
        {
          product_id: id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart");
    } catch (error) {
      console.error(
        "Add Cart Error:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">

        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.product_name}
            className="w-full h-[30rem] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div>

          <h4 className="text-sm text-gray-500">
            {product.brand}
          </h4>

          <h2 className="text-lg font-semibold mt-1">
            {product.product_name}
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
              {product.rating} ★
            </span>
          </div>

          <div className="flex items-center gap-3 mt-3">

            <span className="text-xl font-bold text-black">
              ₹{product.price}
            </span>

            <span className="text-gray-500 line-through">
              ₹{product.mrp}
            </span>

            <span className="text-green-600 text-sm font-semibold">
              {Math.round(
                ((product.mrp - product.price) / product.mrp) * 100
              )}
              % OFF
            </span>

          </div>

          <p className="text-gray-600 text-sm mt-3">
            {product.description}
          </p>

          <div className="mt-8 flex gap-5">

            <button
              onClick={addToCart}
              className="w-[50%] border px-6 py-3 rounded-lg font-bold"
            >
              Add to Cart
            </button>

            {/* <button
              className="bg-[#ffe51f] w-[50%] text-black font-bold px-6 py-3 rounded-lg"
            >
              Buy at ₹{product.price}
            </button> */}

            <button
              onClick={() => router.push(`/checkout?productId=${product.id}`)}
              className="bg-[#ffe51f] w-[50%] text-black font-bold px-6 py-3 rounded-lg"
            >
              Buy at ₹{product.price}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;




