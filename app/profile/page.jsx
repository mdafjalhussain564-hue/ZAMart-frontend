"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);

    const getProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token not found");
                return;
            }

            const res = await axios.get(
                "http://localhost:3003/api/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Profile Response:", res.data);

            setUser(res.data.user);

        } catch (error) {
            console.log("Profile Error:", error.response?.data);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="p-10">



            {user && (
              
                <div className="min-h-screen bg-gray-100 py-10 px-4">
                    <div className="max-w-3xl mx-auto">

                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-white">
                                <div className="flex items-center gap-5">

                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center text-xl font-bold shadow-md">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-bold">
                                            {user.name}
                                        </h1>
                                        <p className="text-blue-100 mt-1">
                                            My Profile
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="p-2">

                                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                    Personal Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {/* Name */}
                                    <div className="bg-gray-50 border rounded-xl p-0 md:p-2">
                                        <p className="text-sm ml-2 text-gray-500 mb-1">
                                            Full Name
                                        </p>
                                        <p className="text-lg font-medium ml-2 text-gray-800">
                                            {user.name}
                                        </p>
                                    </div>

                                    {/* Email */}
                                    <div className="bg-gray-50 border rounded-xl p-0 md:p-2">
                                        <p className="text-sm text-gray-500 ml-2 mb-1">
                                            Email Address
                                        </p>
                                        <p className="text-lg font-medium ml-2 text-gray-800 break-all">
                                            {user.email}
                                        </p>
                                    </div>

                                    {/* Mobile */}
                                    <div className="bg-gray-50 border rounded-xl p-0 md:p-2">
                                        <p className="text-sm ml-2 text-gray-500 mb-1">
                                            Mobile Number
                                        </p>
                                        <p className="text-lg ml-2 font-medium text-gray-800">
                                            {user.mobile}
                                        </p>
                                    </div>

                                    {/* Address */}
                                    <div className="bg-gray-50 border rounded-xl p-0 md:p-2">
                                        <p className="text-sm ml-2 text-gray-500 mb-1">
                                            Address
                                        </p>
                                        <p className="text-lg ml-2 font-medium text-gray-800">
                                            {user.address}
                                        </p>
                                    </div>

                                    {/* City */}
                                    <div className="bg-gray-50 border rounded-xl p-0 md:p-2">
                                        <p className="text-sm ml-2 text-gray-500 mb-1">
                                            City
                                        </p>
                                        <p className="text-lg ml-2 font-medium text-gray-800">
                                            {user.city}
                                        </p>
                                    </div>

                                    {/* State */}
                                    <div className="bg-gray-50 border rounded-xl p-0 md:p-2">
                                        <p className="text-sm ml-2 text-gray-500 mb-1">
                                            State
                                        </p>
                                        <p className="text-lg ml-2 font-medium text-gray-800">
                                            {user.state}
                                        </p>
                                    </div>

                                    {/* Pincode */}
                                    <div className="bg-gray-50 border rounded-xl p-0 md:p-2">
                                        <p className="text-sm ml-2 text-gray-500 mb-1">
                                            Pincode
                                        </p>
                                        <p className="text-lg ml-2 font-medium text-gray-800">
                                            {user.pincode}
                                        </p>
                                    </div>

                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-8">

                                    <button
                                        className="flex-1 w-[20%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                                    >
                                        Edit Profile
                                    </button>

                                    <button
                                        className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold transition"
                                    >
                                        My Orders
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Profile;


