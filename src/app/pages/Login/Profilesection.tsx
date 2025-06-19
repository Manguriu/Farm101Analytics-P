"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Profilesection = () => {
  const [showModal, setShowModal] = useState(false);
  const [originalUser, setOriginalUser] = useState({ email: "", name: "" });
  const [formUser, setFormUser] = useState({
    email: "",
    name: "",
    password: "",
  });
  const router = useRouter();

  // check for token in localStorage
  const isAuthenticated = () => {
    return typeof window !== "undefined" && localStorage.getItem("token") !== null;
  };

  useEffect(() => {
    axios
      .get("/user/me/")
      .then((res) => {
        const { email, name } = res.data;
        setOriginalUser({ email, name });
        setFormUser({ email, name, password: "" });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("lastActivity");
          router.push("/login");
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error("Failed to load user data.");
        }
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    const updates: Record<string, string> = {};

    if (formUser.name && formUser.name !== originalUser.name) {
      updates.name = formUser.name;
    }

    if (formUser.email && formUser.email !== originalUser.email) {
      updates.email = formUser.email;
    }

    if (formUser.password.trim() !== "") {
      updates.password = formUser.password;
    }

    if (Object.keys(updates).length === 0) {
      toast.info("No changes to update.");
      return;
    }

    axios
      .patch("/user/me/", updates)
      .then((res) => {
        const { email, name } = res.data;
        setOriginalUser({ email, name });
        setFormUser({ email, name, password: "" });
        toast.success("Profile updated!");
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Update failed.");
      });
  };

  const handleLogout = async () => {
    try {
      await axios.post("/flock/logout/", {});
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("lastActivity");
      router.push("/pages/Login");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("lastActivity");
      router.push("/pages/Login");
      toast.info("Logged out.");
    }
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        <Image
          className="h-10 w-10 rounded-full border-2 border-blue-600 object-cover"
          src="/Chick1.png"
          alt="User Avatar"
          width={40}
          height={40}
          priority
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {originalUser.name || "Loading..."}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="text-xs font-medium text-blue-300 hover:text-yellow-400 transition-colors"
          >
            View profile
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-center">
              Edit Your Profile
            </h2>

            {/* Name Section */}
            <div className="mb-5 border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">Change Name</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formUser.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Email Section */}
            <div className="mb-5 border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">Change Email</h3>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formUser.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Password Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Change Password</h3>
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={formUser.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>

            {/* Close Modal Icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-xl"
            >
              ×
            </button>

            {isAuthenticated() && (
              <button
                onClick={handleLogout}
                className="mt-4 w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Profilesection;