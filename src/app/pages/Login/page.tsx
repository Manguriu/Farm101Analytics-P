"use client";

import React, { useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import debounce from "lodash/debounce";

interface FormData {
  email: string;
  password: string;
  name?: string; 
}

function LoginRegister() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState<FormData>({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors: Partial<FormData> = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (activeTab === "register" && !formData.name) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, activeTab]);

  const handleSubmit = useCallback(
    debounce(async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;
      setIsSubmitting(true);
      try {
        // Simulate API call (replace with actual auth logic)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/pages/Dashboard");
      } finally {
        setIsSubmitting(false);
      }
    }, 300),
    [validateForm, router]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on input
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image
            src="/Chick1.png"
            alt="SmartPoultry Logo"
            width={48}
            height={48}
            priority
            className="object-cover"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-sm font-semibold text-center transition-colors duration-200
              ${activeTab === "login" ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-500 hover:text-blue-600"}`}
            onClick={() => setActiveTab("login")}
            disabled={isSubmitting}
          >
            <LogIn className="w-4 h-4 inline mr-2" />
            Login
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold text-center transition-colors duration-200
              ${activeTab === "register" ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-500 hover:text-blue-600"}`}
            onClick={() => setActiveTab("register")}
            disabled={isSubmitting}
          >
            <UserPlus className="w-4 h-4 inline mr-2" />
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === "register" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white
              ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} transition-colors duration-200`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {activeTab === "login" ? "Logging in..." : "Registering..."}
              </>
            ) : (
              activeTab === "login" ? "Login" : "Register"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {activeTab === "login" ? "Don't have an account?" : "Already have an account?"}
            <button
              className="ml-1 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
              disabled={isSubmitting}
            >
              {activeTab === "login" ? "Register" : "Login"}
            </button>
          </p>
          {activeTab === "login" && (
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Forgot password?
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(LoginRegister);