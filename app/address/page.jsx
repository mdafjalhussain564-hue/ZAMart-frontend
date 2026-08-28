"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const API_URL = "https://zamart-backend3.onrender.com";

export default function AddressPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    is_default: 0,
  });

  // ================= GET ADDRESSES =================

  const getAddresses = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/address`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAddresses(response.data.addresses || []);
    } catch (error) {
      console.error(
        "Get Address Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  // ================= ADD / UPDATE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      setSaving(true);

      if (editingId) {
        // UPDATE
        await axios.put(
          `${API_URL}/api/address/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Address updated successfully");
      } else {
        // ADD
        await axios.post(
          `${API_URL}/api/address`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Address added successfully");
      }

      // Reset form
      setForm({
        full_name: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        is_default: 0,
      });

      setEditingId(null);

      getAddresses();

    } catch (error) {
      console.error(
        "Save Address Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Address save failed"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= EDIT =================

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      full_name: item.full_name || "",
      mobile: item.mobile || "",
      address: item.address || "",
      city: item.city || "",
      state: item.state || "",
      pincode: item.pincode || "",
      is_default: Number(item.is_default) || 0,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Address deleted successfully");

      getAddresses();

    } catch (error) {
      console.error(
        "Delete Address Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Address delete failed"
      );
    }
  };

  // ================= CANCEL EDIT =================

  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      full_name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      is_default: 0,
    });
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading addresses...</p>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            My Addresses
          </h1>

          <button
            onClick={() => router.push("/checkout")}
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Back to Checkout
          </button>

        </div>

        {/* ================= FORM ================= */}

        <div className="bg-white rounded-lg shadow p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            {editingId
              ? "Update Address"
              : "Add New Address"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* Full Name */}

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Mobile */}

            <div>
              <label className="block mb-2 font-medium">
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Address */}

            <div className="md:col-span-2">

              <label className="block mb-2 font-medium">
                Address
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House No, Street, Area"
                required
                rows="3"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* City */}

            <div>
              <label className="block mb-2 font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* State */}

            <div>
              <label className="block mb-2 font-medium">
                State
              </label>

              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Pincode */}

            <div>
              <label className="block mb-2 font-medium">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Default */}

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="is_default"
                checked={Number(form.is_default) === 1}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <label className="font-medium">
                Make this my default address
              </label>

            </div>

            {/* BUTTONS */}

            <div className="md:col-span-2 flex gap-3">

              <button
                type="submit"
                disabled={saving}
                className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Address"
                  : "Add Address"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="border border-gray-400 px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* ================= ADDRESS LIST ================= */}

        <div>

          <h2 className="text-2xl font-bold mb-5">
            Saved Addresses
          </h2>

          {addresses.length === 0 ? (

            <div className="bg-white rounded-lg shadow p-8 text-center">

              <p className="text-gray-500">
                No addresses found
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {addresses.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-6"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="text-xl font-bold">
                          {item.full_name}
                        </h3>

                        {Number(item.is_default) === 1 && (

                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Default
                          </span>

                        )}

                      </div>

                      <p className="text-gray-600 mt-2">
                        {item.mobile}
                      </p>

                    </div>

                  </div>

                  <p className="text-gray-700 mt-4">
                    {item.address}
                  </p>

                  <p className="text-gray-700">
                    {item.city}, {item.state} -{" "}
                    {item.pincode}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => handleEdit(item)}
                      className="border border-black px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}


