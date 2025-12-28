"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error State
  const [errors, setErrors] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Toggle Login/Signup Mode
  const handleToggle = (loginMode: boolean) => {
    setIsLogin(loginMode);
    // Clear errors when switching modes
    setErrors({
      fullName: "",
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Validation Logic
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!isLogin) {
      // Full Name Validation (Signup only)
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
        isValid = false;
      }

      // Company Name is now optional - Validation removed

      // Confirm Password Validation (Signup only)
      if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed with form submission
      console.log("Form submitted:", formData);
      // TODO: Add your API call here (e.g., Firebase, NextAuth)
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      {/* Reusing Navbar for consistency */}
      <Navbar cartCount={0} onOpenCart={() => {}} />

      {/* Background Decor (Matching Home Theme) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start pt-24 min-h-screen px-4 sm:px-6 lg:px-8 pb-12">
        {/* Auth Card */}
        <div className="w-full max-w-md">
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300">
            {/* Header / Toggle */}
            <div className="p-8 pb-0 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {isLogin ? "Welcome Back" : "Join NexGen"}
              </h2>
              <p className="text-slate-500 mb-8 text-sm">
                {isLogin
                  ? "Enter your credentials to access your account."
                  : "Create an account to start your journey."}
              </p>

              {/* Toggle Switch */}
              <div className="bg-slate-100/80 p-1 rounded-xl flex items-center justify-between mb-8 cursor-pointer">
                <button
                  onClick={() => handleToggle(true)}
                  type="button"
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                    isLogin
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleToggle(false)}
                  type="button"
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                    !isLogin
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
              {!isLogin && (
                <>
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-4 duration-300">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 ml-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Company Name Field - Optional */}
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-4 duration-300">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                      Company Name{" "}
                      <span className="text-slate-400 font-normal lowercase ml-1">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 ml-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 ml-1">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-4 duration-300">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 ml-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <Link
                    href="#"
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 transform hover:-translate-y-0.5 transition-all duration-200 mt-4 cursor-pointer"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Footer */}
            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                By continuing, you agree to our{" "}
                <Link href="#" className="underline hover:text-slate-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline hover:text-slate-700">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
