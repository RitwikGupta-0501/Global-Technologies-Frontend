"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Check, X } from "lucide-react"; // Import Icons for the validator

import { useAuth } from "~/context/AuthContext";
import { TokenService } from "@/api/services/TokenService";
import { DefaultService } from "@/api/services/DefaultService";
import { ApiError } from "@/api";
import { toast } from "sonner";

// --- PASSWORD RULES CONFIGURATION ---
const PASSWORD_RULES = [
  {
    id: "length",
    label: "At least 8 characters",
    isValid: (pwd: string) => pwd.length >= 8,
  },
  {
    id: "upper",
    label: "One uppercase letter",
    isValid: (pwd: string) => /[A-Z]/.test(pwd),
  },
  {
    id: "lower",
    label: "One lowercase letter",
    isValid: (pwd: string) => /[a-z]/.test(pwd),
  },
  {
    id: "number",
    label: "One number",
    isValid: (pwd: string) => /[0-9]/.test(pwd),
  },
  {
    id: "special",
    label: "One special character (!@#...)",
    isValid: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
  },
];

export default function AuthPage() {
  const { login } = useAuth();
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

  // Track if user has touched the password field (to show validator)
  const [showPasswordRules, setShowPasswordRules] = useState(false);

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
    setShowPasswordRules(false); // Hide rules when switching
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
    } else {
      if (isLogin) {
        // Simple check for Login
        if (formData.password.length < 1) {
          newErrors.password = "Please enter your password";
          isValid = false;
        }
      } else {
        // Strict check for Register
        const meetsAllRules = PASSWORD_RULES.every((rule) =>
          rule.isValid(formData.password),
        );
        if (!meetsAllRules) {
          newErrors.password = "Password does not meet complexity requirements";
          isValid = false;
          setShowPasswordRules(true); // Force show rules on error
        }
      }
    }

    if (!isLogin) {
      // Full Name Validation
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
        isValid = false;
      }

      // Confirm Password Validation
      if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation first
    if (validateForm()) {
      try {
        if (isLogin) {
          // --- LOGIN LOGIC ---
          const response = await TokenService.tokenObtainPair({
            username: formData.email,
            password: formData.password,
          });
          login(response.access, response.refresh);
        } else {
          // --- REGISTER LOGIC ---
          const nameParts = formData.fullName.trim().split(" ");
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(" ") || ".";

          const response = await DefaultService.userApiRegisterUser({
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword,
            first_name: firstName,
            last_name: lastName,
            company_name: formData.companyName || undefined,
          });

          if (response.tokens) {
            login(
              response.tokens.access,
              response.tokens.refresh,
              response.user,
            );
          } else {
            toast.success("Account created! Please log in.");
            handleToggle(true);
          }
        }
      } catch (error: unknown) {
        console.error("API Error:", error);

        let generalErrorMessage = "Something went wrong. Please try again.";

        // --- ENHANCED ERROR HANDLING ---
        if (error instanceof ApiError) {
          const body = error.body;

          // CASE 1: Validation Errors (422) - Django Ninja specific
          if (error.status === 422 && Array.isArray(body?.detail)) {
            const newServerErrors: typeof errors = { ...errors }; // Copy current errors
            let hasFieldMapping = false;

            body.detail.forEach(
              (err: { loc: (string | number)[]; msg: string }) => {
                // 'loc' is typically ["body", "payload", "email"] -> we want the last part
                const fieldName = err.loc[err.loc.length - 1];

                // Map Backend Fields to Frontend Form State names
                if (fieldName === "email") {
                  newServerErrors.email = err.msg;
                  hasFieldMapping = true;
                } else if (fieldName === "password") {
                  newServerErrors.password = err.msg;
                  hasFieldMapping = true;
                } else if (fieldName === "confirm_password") {
                  newServerErrors.confirmPassword = err.msg;
                  hasFieldMapping = true;
                } else if (
                  fieldName === "first_name" ||
                  fieldName === "last_name"
                ) {
                  newServerErrors.fullName = err.msg; // Map both to 'Full Name'
                  hasFieldMapping = true;
                }
              },
            );

            if (hasFieldMapping) {
              setErrors(newServerErrors);
              // Stop here so we don't show a generic toast if we mapped it to a field
              return;
            }
          }

          // CASE 2: Generic Message (400, 401, 403, etc.)
          // Usually looks like { "detail": "User with this email already exists." }
          if (body?.detail && typeof body.detail === "string") {
            generalErrorMessage = body.detail;
          }
        }

        // --- FALLBACK DISPLAY ---
        // If we couldn't map it to a specific field, show a Toast or general error
        if (isLogin) {
          // For Login, usually just show "Invalid credentials" under password or via toast
          setErrors((prev) => ({ ...prev, password: generalErrorMessage }));
        } else {
          // For Register, if it's not a field error, show a toast
          toast.error(generalErrorMessage);
        }
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      <Navbar />

      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-200 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start pt-24 min-h-screen px-4 sm:px-6 lg:px-8 pb-12">
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

              {/* PASSWORD FIELD WITH VALIDATOR */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onFocus={() => !isLogin && setShowPasswordRules(true)} // Show on focus (Register only)
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

                {/* --- PASSWORD STRENGTH VALIDATOR UI --- */}
                {!isLogin && showPasswordRules && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">
                      Requirements
                    </p>
                    <ul className="space-y-1.5">
                      {PASSWORD_RULES.map((rule) => {
                        const isValid = rule.isValid(formData.password);
                        return (
                          <li
                            key={rule.id}
                            className={`text-xs flex items-center gap-2 transition-colors duration-200 ${
                              isValid
                                ? "text-emerald-600 font-medium"
                                : "text-slate-400"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                isValid
                                  ? "bg-emerald-100 border-emerald-200"
                                  : "bg-white border-slate-300"
                              }`}
                            >
                              {isValid && <Check className="w-2.5 h-2.5" />}
                            </div>
                            {rule.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
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
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
