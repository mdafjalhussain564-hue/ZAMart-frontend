
"use client";

import React, { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Validation
  const validateForm = () => {
    const newErrors = {};


    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }


    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }


    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }


    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile = "Enter a valid 10 digit mobile number";
    }


    if (!address.trim()) {
      newErrors.address = "Address is required";
    }


    if (!city.trim()) {
      newErrors.city = "City is required";
    }


    if (!state.trim()) {
      newErrors.state = "State is required";
    }


    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const data = {
      name,
      email,
      password,
      mobile,
      address,
      city,
      state,
      pincode,
    };

    try {
      const res = await axios.post(
        "http://localhost:3003/api/register",
        data
      );

      console.log("Response:", res.data);

      if (res.data.success) {
        alert("Registration successful");
        setName("");
        setEmail("");
        setPassword("");
        setMobile("");
        setAddress("");
        setCity("");
        setState("");
        setPincode("");

        setErrors({});
        router.push("/");
      }
    } catch (error) {
      console.log("Error:", error);

      if (error.response) {
        alert(
          error.response.data.message || "Registration failed"
        );
      } else {
        alert("Server connection failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 sm:p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Fill in your details to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Mobile Number
              </label>

              <input
                type="tel"
                value={mobile}
                placeholder="Enter 10 digit mobile number"
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setMobile(value);
                }}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.mobile && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.mobile}
                </p>
              )}
            </div>


            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>

              <input
                type="text"
                value={address}
                placeholder="Enter your full address"
                onChange={(e) => setAddress(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.address}
                </p>
              )}
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>

              <input
                type="text"
                value={city}
                placeholder="Enter your city"
                onChange={(e) => setCity(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.city && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.city}
                </p>
              )}
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                State
              </label>

              <input
                type="text"
                value={state}
                placeholder="Enter your state"
                onChange={(e) => setState(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.state && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.state}
                </p>
              )}
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Pincode
              </label>

              <input
                type="text"
                value={pincode}
                placeholder="Enter 6 digit pincode"
                maxLength={6}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPincode(value);
                }}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.pincode && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.pincode}
                </p>
              )}
            </div>

          </div>


          <button
            type="submit"
            className="mt-8 h-12 w-full rounded-lg bg-blue-600 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Create Account
          </button>

        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?
          <span onClick={() => router.push("/login")} className="ml-1 cursor-pointer font-semibold text-blue-600 hover:underline">
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Page;

