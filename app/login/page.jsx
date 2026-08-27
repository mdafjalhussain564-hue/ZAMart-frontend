
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3003/api/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.success) {
        alert(res.data.message);

        // Token save
        const token = res.data.token;

        localStorage.setItem("token", token);

        // User save
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        console.log("Token:", token);
        console.log("User:", res.data.user);

        // Check karo Add to Cart se koi product pending hai ya nahi
        const pendingProduct =
          localStorage.getItem("pendingCartProduct");

        if (pendingProduct) {
          try {
            // Product ko cart me add karo
            await axios.post(
              "http://localhost:3003/api/cart/add",
              {
                product_id: pendingProduct,
                quantity: 1,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("Pending product added to cart");

            // Pending product remove
            localStorage.removeItem("pendingCartProduct");

            // Navbar cart count update
            window.dispatchEvent(
              new Event("cartUpdated")
            );

            // Cart page
            router.push("/cart");

          } catch (cartError) {
            console.error(
              "Pending Cart Error:",
              cartError.response?.data || cartError.message
            );
          }

        } else {
          // Normal login
          router.push("/");
        }
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err);

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">

      <div className="w-80 p-6 border rounded-lg shadow">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        {/* Email */}
        <div className="mb-3">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}

        </div>

        {/* Password */}
        <div className="mb-3">

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}

        </div>

        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-5 text-center text-sm text-gray-500">
          dont have an account?
          <span onClick={() => router.push("/registrationui")} className="ml-1 cursor-pointer font-semibold text-blue-600 hover:underline">
            Signup
          </span>
        </p>
        
      </div>
    </div>
  );
};

export default Login;

