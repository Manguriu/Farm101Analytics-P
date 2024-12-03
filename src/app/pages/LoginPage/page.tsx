"use client"

import React, { useState } from "react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dummyToken, setDummyToken] = useState("123456"); // Dummy token for demonstration
  const [emailVerified, setEmailVerified] = useState(false);

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setEmailVerified(false); // Reset verification when switching tabs
  };

  const handleTokenVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const enteredToken = (form.token as HTMLInputElement).value;

    if (enteredToken === dummyToken) {
      alert("Email verified successfully!");
      setEmailVerified(true);
    } else {
      alert("Invalid token. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-lg font-semibold text-center ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-lg font-semibold text-center ${
              activeTab === "signup"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => handleTabChange("signup")}
          >
            Create Account
          </button>
        </div>
        {activeTab === "login" && (
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </form>
        )}
        {activeTab === "signup" && (
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />
            </div>
            {!emailVerified ? (
              <div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Token
                  </label>
                  <form onSubmit={handleTokenVerification}>
                    <input
                      type="text"
                      name="token"
                      className="w-full px-4 py-2 mb-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter the token sent to your email"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Verify Token
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
              >
                Create Account
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
