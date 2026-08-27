
// "use client";

// import React, { useEffect, useState } from "react";
// import { IoCartOutline } from "react-icons/io5";
// import { FaMagnifyingGlass } from "react-icons/fa6";
// import { CgProfile } from "react-icons/cg";
// import Link from "next/link";

// const Navbar = () => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [productOpen, setProductOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [cartCount, setCartCount] = useState(0);

//     useEffect(() => {
//         const checkLogin = () => {
//             const token = localStorage.getItem("token");
//             setIsLoggedIn(Boolean(token));
//         };

//         // First time check
//         checkLogin();

//         // Login / logout event
//         window.addEventListener("authChange", checkLogin);

//         // Token change detect karega
//         const interval = setInterval(() => {
//             checkLogin();
//         }, 300);

//         return () => {
//             window.removeEventListener("authChange", checkLogin);
//             clearInterval(interval);
//         };
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         setIsLoggedIn(false);

//         window.dispatchEvent(new Event("authChange"));


//     };

//     return (
//         <nav className="bg-white shadow-md sticky top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">

//                     {/* Logo */}
//                     <Link href="/" className="text-xl md:text-3xl font-bold text-blue-600">
//                         ZAMart
//                     </Link>

//                     {/* Desktop Menu */}
//                     <div className="hidden lg:flex items-center gap-8">

//                         <Link href="/" className="text-lg font-medium hover:text-blue-600">
//                             Home
//                         </Link>

//                         {/* Products */}
//                         <div
//                             className="relative"
//                             onMouseEnter={() => setProductOpen(true)}
//                             onMouseLeave={() => setProductOpen(false)}
//                         >
//                             <button className="flex items-center gap-1 text-lg hover:text-blue-600 font-medium py-2">
//                                 Products
//                                 <span className="text-sm">▼</span>
//                             </button>

//                             {productOpen && (
//                                 <div className="absolute left-0 top-full w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">

//                                     <Link href="/products" className="block px-4 py-3 hover:bg-gray-100 text-gray-700">
//                                         All Products
//                                     </Link>

//                                     <Link href="/products?category=Men's" className="block px-4 py-3 hover:bg-gray-100 text-gray-700">
//                                         Men's
//                                     </Link>

//                                     <Link href="/products?category=Women's" className="block px-4 py-3 hover:bg-gray-100 text-gray-700">
//                                         Women's
//                                     </Link>

//                                     <Link href="/products?category=Electronics" className="block px-4 py-3 hover:bg-gray-100 text-gray-700">
//                                         Electronics
//                                     </Link>

//                                     <Link href="/products?category=Footwear" className="block px-4 py-3 hover:bg-gray-100 text-gray-700">
//                                         Footwear
//                                     </Link>

//                                     <Link href="/products?category=Home%20%26%20Kitchen" className="block px-4 py-3 hover:bg-gray-100 text-gray-700">
//                                         Home & Kitchen
//                                     </Link>

//                                     <Link href="/products?category=Beauty" className="block px-4 py-3 hover:bg-gray-100 text-gray-700">
//                                         Beauty
//                                     </Link>

//                                 </div>
//                             )}
//                         </div>

//                         <Link href="/about" className="text-lg font-medium hover:text-blue-600">
//                             About
//                         </Link>

//                         <Link href="/contact" className="text-lg font-medium hover:text-blue-600">
//                             Contact
//                         </Link>
//                     </div>

//                     {/* Right Side */}
//                     <div className="flex items-center gap-4">

//                         {/* Search */}
//                         <div className="flex items-center flex-1">
//                             <div className="relative w-full  md:w-[300px] lg:w-[400px]">
//                                 <input
//                                     type="text"
//                                     placeholder="Search products..."
//                                     className="w-full border-2 border-blue-500 rounded-lg p-1  ml-4 md:ml-0  md:py-2 outline-none focus:border-blue-700"
//                                 />

//                                 <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
//                                     <FaMagnifyingGlass />
//                                 </button>
//                             </div>
//                         </div>
//                         {/* User */}
//                         <div className="hidden lg:flex gap-4 items-center">

//                             {isLoggedIn && (
//                                 <Link href="/profile" className="flex items-center cursor-pointer">
//                                     <CgProfile className="text-xl text-gray-700" title="user profile" />
//                                 </Link>
//                             )}

//                             {!isLoggedIn && (
//                                 <>
//                                     <Link href="/login" className="text-lg font-medium hover:text-blue-600">
//                                         Login
//                                     </Link>

//                                     <Link href="/registrationui" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//                                         Signup
//                                     </Link>
//                                 </>
//                             )}

//                             {isLoggedIn && (
//                                 <button
//                                     onClick={handleLogout}
//                                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                                 >
//                                     Logout
//                                 </button>
//                             )}
//                         </div>

//                         {/* Cart */}
//                         <Link href="/cart" className="text-gray-700 hover:text-blue-600">
//                             <IoCartOutline className="text-2xl m-2 md:text-3xl" />
//                         </Link>


//                     </div>

//                     {/* Mobile Button */}
//                     <button
//                         onClick={() => setMenuOpen(!menuOpen)}
//                         className="lg:hidden text-2xl"
//                     >
//                         {menuOpen ? "✕" : "☰"}
//                     </button>
//                 </div>

//                 {/* Mobile Menu */}
//                 {menuOpen && (
//                     <div className="lg:hidden border-t py-4">
//                         <div className="flex flex-col gap-4">

//                             <Link
//                                 href="/"
//                                 onClick={() => setMenuOpen(false)}
//                                 className="text-gray-700"
//                             >
//                                 Home
//                             </Link>

//                             {/* Mobile Products */}
//                             <div className="relative">
//                                 <button
//                                     onClick={() => setProductOpen(!productOpen)}
//                                     className="flex items-center gap-1 text-lg hover:text-blue-600 font-medium py-2"
//                                 >
//                                     Products
//                                     <span className="text-sm">▼</span>
//                                 </button>

//                                 {productOpen && (
//                                     <div className="ml-4 flex flex-col gap-2">

//                                         <Link href="/products" onClick={() => setMenuOpen(false)} className="text-gray-700">
//                                             All Products
//                                         </Link>

//                                         <Link href="/products?category=Men's" onClick={() => setMenuOpen(false)} className="text-gray-700">
//                                             Men's
//                                         </Link>

//                                         <Link href="/products?category=Women's" onClick={() => setMenuOpen(false)} className="text-gray-700">
//                                             Women's
//                                         </Link>

//                                         <Link href="/products?category=Electronics" onClick={() => setMenuOpen(false)} className="text-gray-700">
//                                             Electronics
//                                         </Link>

//                                         <Link href="/products?category=Footwear" onClick={() => setMenuOpen(false)} className="text-gray-700">
//                                             Footwear
//                                         </Link>

//                                         <Link href="/products?category=Home%20%26%20Kitchen" onClick={() => setMenuOpen(false)} className="text-gray-700">
//                                             Home & Kitchen
//                                         </Link>

//                                         <Link href="/products?category=Beauty" onClick={() => setMenuOpen(false)} className="text-gray-700">
//                                             Beauty
//                                         </Link>

//                                     </div>
//                                 )}
//                             </div>

//                             <Link href="/about" onClick={() => setMenuOpen(false)} className="text-gray-700">
//                                 About
//                             </Link>

//                             <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-gray-700">
//                                 Contact
//                             </Link>

//                             <hr />

//                             {isLoggedIn && (
//                                 <Link
//                                     href="/profile"
//                                     onClick={() => setMenuOpen(false)}
//                                     className="flex items-center gap-2 text-gray-700"
//                                 >
//                                     <CgProfile className="text-xl" />
//                                     Profile
//                                 </Link>
//                             )}

//                             {!isLoggedIn && (
//                                 <>
//                                     <Link
//                                         href="/login"
//                                         onClick={() => setMenuOpen(false)}
//                                         className="text-gray-700"
//                                     >
//                                         Login
//                                     </Link>

//                                     <Link
//                                         href="/registrationui"
//                                         onClick={() => setMenuOpen(false)}
//                                         className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
//                                     >
//                                         Signup
//                                     </Link>
//                                 </>
//                             )}

//                             {isLoggedIn && (
//                                 <button
//                                     onClick={() => {
//                                         handleLogout();
//                                         setMenuOpen(false);
//                                     }}
//                                     className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                                 >
//                                     Logout
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;




"use client";

import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import axios from "axios";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [productOpen, setProductOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    // =========================================
    // GET CART COUNT
    // =========================================
    const getCartCount = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setCartCount(0);
                return;
            }

            const response = await axios.get(
                "http://localhost:3003/api/cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("FULL CART RESPONSE:", response.data);

            const cartItems = response.data.data || response.data.cart || [];

            console.log("CART ITEMS:", cartItems);

            const totalCount = cartItems.reduce(
                (total, item) => total + Number(item.quantity || 0),
                0
            );

            console.log("TOTAL CART COUNT:", totalCount);

            setCartCount(totalCount);

        } catch (error) {
            console.log(
                "GET CART COUNT ERROR:",
                error.response?.data || error.message
            );

            setCartCount(0);
        }
    };
    // =========================================
    // LOGIN + CART UPDATE
    // =========================================
    useEffect(() => {

    const checkLogin = () => {
        const token = localStorage.getItem("token");

        setIsLoggedIn(Boolean(token));

        if (token) {
            getCartCount();
        } else {
            setCartCount(0);
        }
    };

    // Page/Home load hote hi
    checkLogin();

    // Login / Logout
    window.addEventListener("authChange", checkLogin);

    // Add / Delete / Order ke baad
    window.addEventListener("cartUpdated", getCartCount);

    return () => {
        window.removeEventListener("authChange", checkLogin);
        window.removeEventListener("cartUpdated", getCartCount);
    };

}, []);
    // =========================================
    // LOGOUT
    // =========================================
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false);
        setCartCount(0);

        window.dispatchEvent(
            new Event("authChange")
        );
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16">

                    {/* ================= LOGO ================= */}

                    <Link
                        href="/"
                        className="text-xl md:text-3xl font-bold text-blue-600"
                    >
                        
                    </Link>

                    {/* ================= DESKTOP MENU ================= */}

                    <div className="hidden lg:flex items-center gap-8">

                        <Link
                            href="/"
                            className="text-lg font-medium hover:text-blue-600"
                        >
                            Home
                        </Link>

                        {/* Products */}

                        <div
                            className="relative"
                            onMouseEnter={() =>
                                setProductOpen(true)
                            }
                            onMouseLeave={() =>
                                setProductOpen(false)
                            }
                        >

                            <button
                                className="flex items-center gap-1 text-lg hover:text-blue-600 font-medium py-2"
                            >
                                Products

                                <span className="text-sm">
                                    ▼
                                </span>
                            </button>

                            {productOpen && (

                                <div className="absolute left-0 top-full w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">

                                    <Link
                                        href="/products"
                                        className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                                    >
                                        All Products
                                    </Link>

                                    <Link
                                        href="/products?category=Men's"
                                        className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                                    >
                                        Men's
                                    </Link>

                                    <Link
                                        href="/products?category=Women's"
                                        className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                                    >
                                        Women's
                                    </Link>

                                    <Link
                                        href="/products?category=Electronics"
                                        className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                                    >
                                        Electronics
                                    </Link>

                                    <Link
                                        href="/products?category=Footwear"
                                        className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                                    >
                                        Footwear
                                    </Link>

                                    <Link
                                        href="/products?category=Home%20%26%20Kitchen"
                                        className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                                    >
                                        Home & Kitchen
                                    </Link>

                                    <Link
                                        href="/products?category=Beauty"
                                        className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                                    >
                                        Beauty
                                    </Link>

                                </div>

                            )}

                        </div>

                        <Link
                            href="/about"
                            className="text-lg font-medium hover:text-blue-600"
                        >
                            About
                        </Link>

                        <Link
                            href="/contact"
                            className="text-lg font-medium hover:text-blue-600"
                        >
                            Contact
                        </Link>

                    </div>

                    {/* ================= RIGHT SIDE ================= */}

                    <div className="flex items-center gap-4">

                        {/* Search */}

                        <div className="flex items-center flex-1">

                            <div className="relative w-full md:w-[300px] lg:w-[400px]">

                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full border-2 border-blue-500 rounded-lg p-1  md:py-2 outline-none focus:border-blue-700"
                                />

                                <button
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                >
                                    <FaMagnifyingGlass />
                                </button>

                            </div>

                        </div>

                        {/* ================= USER ================= */}

                        <div className="hidden lg:flex gap-4 items-center">

                            {/* Profile */}

                            {isLoggedIn && (

                                <Link
                                    href="/profile"
                                    className="flex items-center cursor-pointer"
                                >

                                    <CgProfile
                                        className="text-xl text-gray-700"
                                        title="user profile"
                                    />

                                </Link>

                            )}

                            {/* Login Signup */}

                            {!isLoggedIn && (

                                <>

                                    <Link
                                        href="/login"
                                        className="text-lg font-medium hover:text-blue-600"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/registrationui"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Signup
                                    </Link>

                                </>

                            )}

                            {/* Logout */}

                            {isLoggedIn && (

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Logout
                                </button>

                            )}

                        </div>

                        {/* ================= CART ================= */}

                        <Link
                            href="/cart"
                            className="relative inline-flex items-center justify-center text-gray-700 hover:text-blue-600"
                        >
                            <IoCartOutline className="text-2xl md:text-3xl" />

                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* ================= MOBILE BUTTON ================= */}

                    <button
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        className="lg:hidden text-2xl"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>

                </div>

                {/* ================= MOBILE MENU ================= */}

                {menuOpen && (

                    <div className="lg:hidden border-t py-4">

                        <div className="flex flex-col gap-4">

                            <Link
                                href="/"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className="text-gray-700"
                            >
                                Home
                            </Link>

                            {/* Mobile Products */}

                            <div className="relative">

                                <button
                                    onClick={() =>
                                        setProductOpen(!productOpen)
                                    }
                                    className="flex items-center gap-1 text-lg hover:text-blue-600 font-medium py-2"
                                >
                                    Products

                                    <span className="text-sm">
                                        ▼
                                    </span>
                                </button>

                                {productOpen && (

                                    <div className="ml-4 flex flex-col gap-2">

                                        <Link
                                            href="/products"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="text-gray-700"
                                        >
                                            All Products
                                        </Link>

                                        <Link
                                            href="/products?category=Men's"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="text-gray-700"
                                        >
                                            Men's
                                        </Link>

                                        <Link
                                            href="/products?category=Women's"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="text-gray-700"
                                        >
                                            Women's
                                        </Link>

                                        <Link
                                            href="/products?category=Electronics"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="text-gray-700"
                                        >
                                            Electronics
                                        </Link>

                                        <Link
                                            href="/products?category=Footwear"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="text-gray-700"
                                        >
                                            Footwear
                                        </Link>

                                        <Link
                                            href="/products?category=Home%20%26%20Kitchen"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="text-gray-700"
                                        >
                                            Home & Kitchen
                                        </Link>

                                        <Link
                                            href="/products?category=Beauty"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="text-gray-700"
                                        >
                                            Beauty
                                        </Link>

                                    </div>

                                )}

                            </div>

                            <Link
                                href="/about"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className="text-gray-700"
                            >
                                About
                            </Link>

                            <Link
                                href="/contact"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className="text-gray-700"
                            >
                                Contact
                            </Link>

                            <hr />

                            {/* Mobile Profile */}

                            {isLoggedIn && (

                                <Link
                                    href="/profile"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                    className="flex items-center gap-2 text-gray-700"
                                >

                                    <CgProfile className="text-xl" />

                                    Profile

                                </Link>

                            )}

                            {/* Mobile Login */}

                            {!isLoggedIn && (

                                <>

                                    <Link
                                        href="/login"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                        className="text-gray-700"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/registrationui"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                                    >
                                        Signup
                                    </Link>

                                </>

                            )}

                            {/* Mobile Logout */}

                            {isLoggedIn && (

                                <button
                                    onClick={() => {

                                        handleLogout();

                                        setMenuOpen(false);

                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Logout
                                </button>

                            )}

                        </div>

                    </div>

                )}

            </div>

        </nav>
    );
};

export default Navbar;