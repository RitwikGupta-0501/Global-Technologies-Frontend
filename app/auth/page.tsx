"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Check, ArrowLeft, Mail } from "lucide-react";
import axios from "axios";

import { useAuth } from "~/context/AuthContext";
import { DefaultService } from "@/api/services/DefaultService";
import { OpenAPI } from "@/api/core/OpenAPI";
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

type AuthMode = "login" | "register" | "forgot" | "reset";

function AuthContent() {
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect");
  const redirectUrl =
    rawRedirect && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/";

  const initialTab = searchParams.get("tab");
  const initialMode: AuthMode =
    initialTab === "reset"
      ? "reset"
      : initialTab === "forgot"
      ? "forgot"
      : initialTab === "register"
      ? "register"
      : "login";

  const { login } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const [forgotSent, setForgotSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetUid = searchParams.get("uid") || "";
  const resetToken = searchParams.get("token") || "";

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

  // Toggle Mode
  const handleToggle = (mode: AuthMode) => {
    setAuthMode(mode);
    setShowPasswordRules(false);
    setForgotSent(false);
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

    // Email Validation (needed for login, register, forgot)
    if (authMode !== "reset") {
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    // Password Validation
    if (authMode === "login") {
      if (!formData.password) {
        newErrors.password = "Please enter your password";
        isValid = false;
      }
    } else if (authMode === "register" || authMode === "reset") {
      if (!formData.password) {
        newErrors.password = "Password is required";
        isValid = false;
      } else {
        const meetsAllRules = PASSWORD_RULES.every((rule) =>
          rule.isValid(formData.password)
        );
        if (!meetsAllRules) {
          newErrors.password = "Password does not meet complexity requirements";
          isValid = false;
          setShowPasswordRules(true);
        }
      }

      if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    if (authMode === "register") {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (authMode === "login") {
        // --- LOGIN LOGIC (HttpOnly Cookie-based auth) ---
        const response = await DefaultService.userApiLogin({
          email: formData.email,
          password: formData.password,
        });
        login(undefined, undefined, response.user, redirectUrl);
      } else if (authMode === "register") {
        // --- REGISTER LOGIC ---
        const nameParts = formData.fullName.trim().split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ") || "";

        const response = await DefaultService.userApiRegisterUser({
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          first_name: firstName,
          last_name: lastName,
          company_name: formData.companyName || undefined,
        });

        if (response.user) {
          login(undefined, undefined, response.user, redirectUrl);
        } else {
          toast.success("Account created! Please log in.");
          handleToggle("login");
        }
      } else if (authMode === "forgot") {
        // --- FORGOT PASSWORD LOGIC ---
        await axios.post(
          `${OpenAPI.BASE}/api/auth/forgot-password`,
          { email: formData.email },
          { headers: { "X-Requested-With": "XMLHttpRequest" } }
        );
        setForgotSent(true);
        toast.success("Password reset link dispatched!");
      } else if (authMode === "reset") {
        // --- RESET PASSWORD LOGIC ---
        if (!resetUid || !resetToken) {
          toast.error("Invalid password reset link. Please request a new one.");
          return;
        }

        const res = await axios.post(
          `${OpenAPI.BASE}/api/auth/reset-password`,
          {
            uid: resetUid,
            token: resetToken,
            password: formData.password,
            confirm_password: formData.confirmPassword,
          },
          {
            withCredentials: true,
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        );

        toast.success("Password updated successfully!");
        if (res.data?.user) {
          login(undefined, undefined, res.data.user, redirectUrl);
        } else {
          handleToggle("login");
        }
      }
    } catch (error: unknown) {
      console.error("API Error:", error);

      let generalErrorMessage = "Something went wrong. Please try again.";

      if (error instanceof ApiError) {
        const body = error.body;

        // Validation Errors (422)
        if (error.status === 422 && Array.isArray(body?.detail)) {
          const newServerErrors: typeof errors = { ...errors };
          let hasFieldMapping = false;

          body.detail.forEach(
            (err: { loc: (string | number)[]; msg: string }) => {
              const fieldName = err.loc[err.loc.length - 1];
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
                newServerErrors.fullName = err.msg;
                hasFieldMapping = true;
              }
            }
          );

          if (hasFieldMapping) {
            setErrors(newServerErrors);
            return;
          }
        }

        if (body?.detail && typeof body.detail === "string") {
          generalErrorMessage = body.detail;
        }
      } else if (axios.isAxiosError(error) && error.response?.data?.detail) {
        generalErrorMessage = String(error.response.data.detail);
      }

      if (authMode === "login") {
        setErrors((prev) => ({ ...prev, password: generalErrorMessage }));
      } else {
        toast.error(generalErrorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-start pt-24 min-h-screen px-4 sm:px-6 lg:px-8 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
            {/* Header */}
            <div className="p-8 pb-0 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {authMode === "login" && "Welcome Back"}
                {authMode === "register" && "Join Global Technologies"}
                {authMode === "forgot" && "Reset Password"}
                {authMode === "reset" && "Set New Password"}
              </h2>
              <p className="text-slate-500 mb-8 text-sm">
                {authMode === "login" && "Enter your credentials to access your account."}
                {authMode === "register" && "Create an account to start your journey."}
                {authMode === "forgot" && "Enter your registered email to receive a secure recovery link."}
                {authMode === "reset" && "Choose a strong new password for your account."}
              </p>

              {/* Login / Register Toggle (Only shown on standard auth tabs) */}
              {(authMode === "login" || authMode === "register") && (
                <div className="bg-gray-100 p-1 rounded-xl flex items-center justify-between mb-8 cursor-pointer">
                  <button
                    onClick={() => handleToggle("login")}
                    type="button"
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                      authMode === "login"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleToggle("register")}
                    type="button"
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                      authMode === "register"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
              {/* FORGOT PASSWORD CONFIRMATION STATE */}
              {authMode === "forgot" && forgotSent ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-slate-600">
                    If an account is associated with <span className="font-semibold text-slate-800">{formData.email}</span>, you will receive an email shortly with reset instructions.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleToggle("login")}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <>
                  {/* Register Name & Company fields */}
                  {authMode === "register" && (
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
                          placeholder="e.g. Rahul Sharma"
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
                          placeholder="e.g. Apex Tech Solutions"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </>
                  )}

                  {/* Email field (for login, register, forgot) */}
                  {authMode !== "reset" && (
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
                  )}

                  {/* Password field (for login, register, reset) */}
                  {authMode !== "forgot" && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                        {authMode === "reset" ? "New Password" : "Password"}
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onFocus={() => authMode !== "login" && setShowPasswordRules(true)}
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
                      {authMode !== "login" && showPasswordRules && (
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
                  )}

                  {/* Confirm Password (register & reset) */}
                  {(authMode === "register" || authMode === "reset") && (
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

                  {/* Forgot Password link (on login tab) */}
                  {authMode === "login" && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleToggle("forgot")}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Back to Login link (on forgot or reset tab) */}
                  {(authMode === "forgot" || authMode === "reset") && (
                    <div className="flex justify-start">
                      <button
                        type="button"
                        onClick={() => handleToggle("login")}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Sign In
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 transform hover:-translate-y-0.5 transition-all duration-200 mt-4 cursor-pointer"
                  >
                    {isSubmitting
                      ? "Processing..."
                      : authMode === "login"
                      ? "Sign In"
                      : authMode === "register"
                      ? "Create Account"
                      : authMode === "forgot"
                      ? "Send Reset Link"
                      : "Reset Password & Sign In"}
                  </button>
                </>
              )}
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

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
          Loading...
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
