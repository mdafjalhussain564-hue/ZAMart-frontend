
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                "https://zamart-backend3.onrender.com/api/admin/login",
                {
                    email,
                    password
                }
            );

            if (res.data.success) {

                
                localStorage.setItem("adminToken", res.data.token);

               
                localStorage.setItem(
                    "admin",
                    JSON.stringify(res.data.admin)
                );

                
                router.push("/admin/dashboard");
            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

             
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Admin Login
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your admin dashboard
                    </p>

                </div>


              
                {error && (
                    <div className="mb-5 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">
                        {error}
                    </div>
                )}


                
                <form onSubmit={handleLogin}>

                    
                    <div className="mb-5">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>


              
                    <div className="mb-6">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>


                   
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default AdminLogin;

