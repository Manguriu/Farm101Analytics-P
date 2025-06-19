"use client";

import React, { useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, LogIn, UserPlus, LogOut } from "lucide-react";
import axios from "../../lib/axios";

interface FormData {
  email: string;
  password: string;
  name?: string;
}

const isAuthenticated = () => !!localStorage.getItem("token");

const LoginRegister = memo(() => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState<FormData>({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Partial<FormData> = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (activeTab === "register" && !formData.name) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, activeTab]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        if (activeTab === "register") {
          await axios.post("/user/create/", {
            email: formData.email,
            password: formData.password,
            name: formData.name,
          });
          setFormData({ email: "", password: "", name: "" });
          setActiveTab("login");
          alert("Registration successful. Please login.");
        } else {
          const formPayload = new FormData();
          formPayload.append("email", formData.email);
          formPayload.append("password", formData.password);

          const { data } = await axios.post("/user/token/", formPayload, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          const token = data?.token;
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("lastActivity", Date.now().toString());

            const meRes = await axios.get("/user/me/");
            const user = meRes.data;

            localStorage.setItem("user", JSON.stringify(user));
            router.push("/pages/Dashboard");
          } else {
            setErrors({ password: "Login failed. Invalid credentials." });
          }
        }
      } catch (err: any) {
        const detail =
          err.response?.data?.detail ||
          err.response?.data?.non_field_errors?.[0] ||
          err.message;

        setErrors({
          password: detail || "Something went wrong. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, activeTab, validateForm, router]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image src="/Chick1.png" alt="SmartPoultry Logo" width={48} height={48} className="object-cover" />
        </div>

        <div className="flex mb-6 border-b border-gray-200">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-sm font-semibold text-center transition-colors ${
                activeTab === tab
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab as "login" | "register")}
              disabled={isSubmitting}
            >
              {tab === "login" ? (
                <>
                  <LogIn className="w-4 h-4 inline mr-2" />
                  Login
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 inline mr-2" />
                  Register
                </>
              )}
            </button>
          ))}
        </div>

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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-white ${
              isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {activeTab === "login" ? "Logging in..." : "Registering..."}
              </>
            ) : activeTab === "login" ? (
              "Login"
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {activeTab === "login" ? "Don't have an account?" : "Already have an account?"}
            <button
              className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
              disabled={isSubmitting}
            >
              {activeTab === "login" ? "Register" : "Login"}
            </button>
          </p>
          {activeTab === "login" && (
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          )}
        </div>
      </div>
    </div>
  );
});

export default LoginRegister;