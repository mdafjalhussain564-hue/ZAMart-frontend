"use client";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        let url = "https://zamart-backend3.onrender.com/api/getproduct";


        if (category) {
          url = `https://zamart-backend3.onrender.com/api/getproduct/category/${encodeURIComponent(
            category
          )}`;
        }

        const res = await axios.get(url);

        console.log("LIVE API RESPONSE:", res.data);

        setProducts(res.data.data || []);
      } catch (error) {
        console.log(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-3xl font-bold mb-2">
        {category || "All Products"}
      </h1>

      <p className="text-gray-500 mb-8">
        {products.length} Products
      </p>

      {loading ? (
        <div className="text-center py-20">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((item) => (
            <Link
              key={item.id}
              href={`/productdetail/${item.id}`}
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border">

                <div className="h-56 flex justify-center items-center bg-gray-100 p-4">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.product_name}
                    className="h-full w-full object-contain hover:scale-105 transition"
                  />
                </div>

                <div className="p-4">

                  <h4 className="text-sm text-gray-500">
                    {item.brand}
                  </h4>

                  <h2 className="text-lg font-semibold mt-1 line-clamp-2">
                    {item.product_name}
                  </h2>

                  <div className="mt-2">
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                      {item.rating} ★
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-3 flex-wrap">

                    <span className="text-xl font-bold">
                      ₹{item.price}
                    </span>

                    <span className="text-gray-500 line-through">
                      ₹{item.mrp}
                    </span>

                    <span className="text-green-600 text-sm font-semibold">
                      {item.mrp > 0
                        ? Math.round(
                          ((item.mrp - item.price) / item.mrp) * 100
                        )
                        : 0}
                      % OFF
                    </span>

                  </div>

                  <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                    {item.description}
                  </p>

                </div>
              </div>
            </Link>
          ))}

        </div>
      )}

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20">
          Loading products...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}