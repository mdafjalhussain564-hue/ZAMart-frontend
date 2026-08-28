"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://zamart-backend3.onrender.com/api/getproduct")
      .then((res) => {
        console.log("Response:", res.data);
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);



  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
            <Link key={item.id} href={`/productdetail/${item.id}`}>
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border"
          >
            
            <div className="h-56 flex justify-center items-center bg-gray-100 p-4">
              <img
                src={item.image ? item.image : "/placeholder.png"}
                alt={item.product_name}
                className="h-full object-contain hover:scale-105 transition duration-300"
              />
            </div>

          
            <div className="p-4">
              <h4 className="text-sm text-gray-500">{item.brand}</h4>

              <h2 className="text-lg font-semibold mt-1 line-clamp-2">
                {item.product_name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                  {item.rating} ★
                </span>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-xl font-bold text-black">
                  ₹{item.price}
                </span>

                <span className="text-gray-500 line-through">
                  ₹{item.mrp}
                </span>

                <span className="text-green-600 text-sm font-semibold">
                  {Math.round(
                    ((item.mrp - item.price) / item.mrp) * 100
                  )}
                  % OFF
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                {item.description}
              </p>

              {/* <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
            Add to Cart
          </button> */}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;

