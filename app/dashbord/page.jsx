// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:3003";

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [viewMode, setViewMode] = useState("grid");

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/getproduct`)
//       .then((res) => {
//         setProducts(res.data.data || []);
//       })
//       .catch((err) => {
//         console.log("PRODUCT ERROR:", err);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#f1f3f8]">

//       {/* ================= SIDEBAR ================= */}
//       <aside className="fixed left-0 top-0 hidden h-screen w-[250px] bg-[#191f2d] text-white lg:block">

//         {/* Logo */}
//         <div className="flex h-[75px] items-center border-b border-gray-700 px-7">
//           <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-400">
//             ◉
//           </div>

//           <h1 className="text-lg font-bold">
//             DashboardKit
//           </h1>
//         </div>

//         <div className="px-5 py-7">

//           <p className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
//             Navigation
//           </p>

//           <SidebarItem icon="⌂" title="Dashboard" />
//           <SidebarItem icon="◇" title="Layouts" />
//           <SidebarItem icon="▦" title="Widget" />
//           <SidebarItem icon="♙" title="User" />

//           <p className="mb-5 mt-8 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
//             Elements
//           </p>

//           <SidebarItem icon="▣" title="Basic" />
//           <SidebarItem icon="◈" title="Advance" />
//           <SidebarItem icon="◎" title="Icons" />

//           <p className="mb-5 mt-8 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
//             Forms
//           </p>

//           <SidebarItem icon="▤" title="Forms Elements" />
//           <SidebarItem icon="✎" title="Forms Plugins" />
//           <SidebarItem icon="☷" title="Text Editors" />
//           <SidebarItem icon="▥" title="Form Layouts" />
//           <SidebarItem icon="▱" title="File upload" />
//           <SidebarItem icon="✓" title="Form Validation" />

//         </div>
//       </aside>


//       {/* ================= MAIN ================= */}
//       <main className="lg:ml-[250px]">

//         {/* ================= TOP NAVBAR ================= */}
//         <header className="flex h-[75px] items-center justify-between border-b bg-white px-5 shadow-sm md:px-8">

//           <div className="flex items-center gap-4">

//             <button className="rounded-md bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
//               Level
//             </button>

//             <span className="text-sm text-gray-500">
//               Mega
//             </span>

//           </div>


//           <div className="flex items-center gap-5">

//             <span className="cursor-pointer text-xl text-gray-500">
//               🔍
//             </span>

//             <span className="relative cursor-pointer text-xl">
//               🛒
//               <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] text-white">
//                 3
//               </span>
//             </span>

//             <span className="relative cursor-pointer text-xl">
//               🔔
//               <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
//             </span>

//             <div className="hidden items-center gap-3 md:flex">

//               <img
//                 src="https://i.pravatar.cc/100?img=12"
//                 className="h-10 w-10 rounded-full"
//                 alt="admin"
//               />

//               <div>
//                 <p className="text-sm font-semibold text-gray-700">
//                   Joseph William
//                 </p>

//                 <p className="text-xs text-gray-400">
//                   Administrator
//                 </p>
//               </div>

//             </div>

//           </div>
//         </header>


//         {/* ================= CONTENT ================= */}
//         <section className="p-4 md:p-6">

//           {/* Breadcrumb */}
//           <div className="mb-5">

//             <h2 className="text-lg font-semibold text-gray-800">
//               Product
//             </h2>

//             <div className="mt-2 text-xs text-gray-400">
//               Home
//               <span className="mx-2">›</span>
//               E-Commerce
//               <span className="mx-2">›</span>
//               Product
//             </div>

//           </div>


//           <div className="flex gap-5">

//             {/* ================= FILTER ================= */}
//             <aside className="hidden w-[205px] shrink-0 rounded-md bg-white p-4 shadow-sm xl:block">

//               <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-600">
//                 <span>⚱</span>
//                 Filter
//               </div>


//               {/* Price */}
//               <FilterSection title="Price">

//                 <div className="flex">

//                   <select className="w-1/2 rounded-l border p-2 text-xs outline-none">
//                     <option>Min</option>
//                   </select>

//                   <div className="flex items-center border-y px-2 text-xs text-gray-400">
//                     To
//                   </div>

//                   <select className="w-1/2 rounded-r border p-2 text-xs outline-none">
//                     <option>Max</option>
//                   </select>

//                 </div>

//               </FilterSection>


//               {/* Size */}
//               <FilterSection title="Size - UK/India">

//                 {[4, 5, 6, 6.5, 7, 8].map((size) => (
//                   <Checkbox
//                     key={size}
//                     label={size}
//                   />
//                 ))}

//               </FilterSection>


//               {/* Rating */}
//               <FilterSection title="Customer Ratings">

//                 {[
//                   "4★ & above",
//                   "3★ & above",
//                   "2★ & above",
//                   "1★ & above",
//                 ].map((rating) => (
//                   <Checkbox
//                     key={rating}
//                     label={rating}
//                   />
//                 ))}

//               </FilterSection>


//               <FilterSection title="Discount" />

//               <FilterSection title="Type of Shoes" />

//               <FilterSection title="Color" />

//             </aside>


//             {/* ================= PRODUCTS ================= */}
//             <div className="min-w-0 flex-1">

//               {/* Toolbar */}
//               <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-md bg-white p-4 shadow-sm">

//                 <div className="flex gap-5 text-xs text-gray-500">

//                   <button className="flex items-center gap-1">
//                     📅 By Date
//                     <span>⌄</span>
//                   </button>

//                   <button className="flex items-center gap-1">
//                     ▤ By Price
//                     <span>⌄</span>
//                   </button>

//                 </div>


//                 <div className="flex items-center gap-2 text-xs text-gray-500">

//                   <span>View Mode:</span>

//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`rounded px-3 py-2 ${
//                       viewMode === "grid"
//                         ? "bg-indigo-500 text-white"
//                         : "bg-gray-100"
//                     }`}
//                   >
//                     ▦
//                   </button>

//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`rounded px-3 py-2 ${
//                       viewMode === "list"
//                         ? "bg-indigo-500 text-white"
//                         : "bg-gray-100"
//                     }`}
//                   >
//                     ☷
//                   </button>

//                 </div>

//               </div>


//               {/* Product Grid */}
//               <div
//                 className={
//                   viewMode === "grid"
//                     ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
//                     : "space-y-4"
//                 }
//               >

//                 {products.map((product) => (

//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                     listMode={viewMode === "list"}
//                   />

//                 ))}

//               </div>

//             </div>

//           </div>

//         </section>

//       </main>

//     </div>
//   );
// }


// /* ================= COMPONENTS ================= */

// function SidebarItem({ icon, title }) {
//   return (
//     <div className="mb-2 flex cursor-pointer items-center justify-between rounded-md px-3 py-3 text-sm text-gray-300 hover:bg-[#252d3d] hover:text-white">

//       <div className="flex items-center gap-3">
//         <span className="w-5 text-gray-400">
//           {icon}
//         </span>

//         <span>{title}</span>
//       </div>

//       <span className="text-gray-500">
//         ›
//       </span>

//     </div>
//   );
// }


// function FilterSection({ title, children }) {
//   return (
//     <div className="border-b py-4">

//       <div className="mb-3 flex items-center justify-between text-xs font-semibold text-gray-700">
//         {title}
//         <span>⌄</span>
//       </div>

//       {children}

//     </div>
//   );
// }


// function Checkbox({ label }) {
//   return (
//     <label className="mb-2 flex cursor-pointer items-center gap-2 text-xs text-gray-500">

//       <input
//         type="checkbox"
//         className="h-4 w-4 rounded border-gray-300"
//       />

//       {label}

//     </label>
//   );
// }


// function ProductCard({ product, listMode }) {

//   return (
//     <div
//       className={`relative overflow-hidden rounded-md bg-white shadow-sm transition hover:shadow-md ${
//         listMode ? "flex items-center gap-5 p-4" : ""
//       }`}
//     >

//       {/* Wishlist */}
//       <button className="absolute right-4 top-4 z-10 text-xl text-gray-400 hover:text-red-500">
//         ♡
//       </button>


//       {/* Image */}
//       <div
//         className={
//           listMode
//             ? "h-32 w-40 shrink-0"
//             : "flex h-[190px] items-center justify-center p-5"
//         }
//       >

//         <img
//           src={product.image}
//           alt={product.product_name || product.name}
//           className="h-full w-full object-contain"
//         />

//       </div>


//       {/* Details */}
//       <div className={listMode ? "flex-1" : "px-4 pb-5"}>

//         <p className="mb-1 text-[9px] font-semibold uppercase text-gray-400">
//           {product.brand || "ADIDAS"}
//         </p>

//         <h3 className="line-clamp-1 text-sm font-medium text-gray-700">
//           {product.product_name || product.name}
//         </h3>


//         <div className="mt-2 flex items-center gap-2">

//           <span className="text-base font-semibold text-indigo-600">
//             ₹{Number(product.price || 1499).toLocaleString("en-IN")}
//           </span>

//           <span className="text-xs text-red-400 line-through">
//             ₹4,999
//           </span>

//           <span className="text-[10px] font-semibold text-green-500">
//             70% off
//           </span>

//         </div>

//       </div>

//     </div>
//   );
// }