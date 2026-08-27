

"use client";

import React, { useState } from "react";
import axios from "axios";

const Page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Name
        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (!/^[A-Za-z ]+$/.test(name.trim())) {
            newErrors.name = "Name can contain only letters";
        } else if (name.trim().length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        }

        // Email
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            newErrors.email = "Enter a valid email";
        }

        // Password
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        } else if (password.length > 10) {
            newErrors.password =
                "Password must not exceed 10 characters";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password =
                "Password must contain one uppercase letter";
        } else if (!/[a-z]/.test(password)) {
            newErrors.password =
                "Password must contain one lowercase letter";
        } else if (!/[0-9]/.test(password)) {
            newErrors.password =
                "Password must contain one number";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data = {
            name: name.trim(),
            email: email.trim(),
            password,
        };

        try {
            const res = await axios.post(
                "http://localhost:3003/api/admin/register",
                data
            );

            console.log("Response:", res.data);

            if (res.data.success) {
                alert("Admin registration successful");

                setName("");
                setEmail("");
                setPassword("");
                setErrors({});
            }
        } catch (error) {
            console.log("Error:", error);

            if (error.response) {
                alert(
                    error.response.data.message ||
                    "Registration failed"
                );
            } else {
                alert("Server connection failed");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">


                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">


                    <div className="bg-gray-900 px-8 py-7 text-center">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                            <span className="text-2xl">
                                👤
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold text-white">
                            Admin Registration
                        </h1>

                        <p className="mt-2 text-sm text-gray-300">
                            Create your administrator account
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="p-8"
                    >


                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                placeholder="Enter your full name"
                                onChange={(e) => {
                                    const value = e.target.value;

                                    if (/^[A-Za-z ]*$/.test(value)) {
                                        setName(value);
                                    }
                                }}
                                className={`h-12 w-full rounded-lg border px-4 text-sm outline-none transition
                                ${errors.name
                                        ? "border-red-500 focus:ring-2 focus:ring-red-100"
                                        : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
                                    }`}
                            />

                            {errors.name && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.name}
                                </p>
                            )}

                        </div>


                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                placeholder="admin@example.com"
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className={`h-12 w-full rounded-lg border px-4 text-sm outline-none transition
                                ${errors.email
                                        ? "border-red-500 focus:ring-2 focus:ring-red-100"
                                        : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
                                    }`}
                            />

                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.email}
                                </p>
                            )}

                        </div>


                        <div className="mb-6">

                            <div className="mb-2 flex items-center justify-between">

                                <label className="block text-sm font-semibold text-gray-700">
                                    Password
                                </label>

                                <span className="text-xs text-gray-400">
                                    0–10 characters
                                </span>

                            </div>

                            <input
                                type="password"
                                value={password}
                                maxLength={10}
                                placeholder="Enter your password"
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className={`h-12 w-full rounded-lg border px-4 text-sm outline-none transition
                                ${errors.password
                                        ? "border-red-500 focus:ring-2 focus:ring-red-100"
                                        : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
                                    }`}
                            />

                            {errors.password ? (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.password}
                                </p>
                            ) : (
                                <p className="mt-1.5 text-xs text-gray-400">
                                    Use uppercase, lowercase and a number.
                                </p>
                            )}

                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="h-12 w-full rounded-lg bg-gray-900 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
                        >
                            Create Admin Account
                        </button>

                        <p className="mt-5 text-center text-sm text-gray-500">
                            Already have an account?
                            <span onClick={() => router.push("")} className="ml-1 cursor-pointer font-semibold text-blue-600 hover:underline">
                                Login
                            </span>
                        </p>

                        <div className="mt-5 rounded-lg bg-gray-50 border border-gray-200 p-3">
                            <p className="text-center text-xs text-gray-500">
                                🔒 Your password will be securely encrypted.
                            </p>
                        </div>

                    </form>

                </div>

                {/* Footer */}
                <p className="mt-5 text-center text-xs text-gray-400">
                    Admin Panel • Secure Registration
                </p>

            </div>

        </div>
    );
};

export default Page;

