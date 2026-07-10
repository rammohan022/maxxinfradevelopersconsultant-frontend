"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/services/auth";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/utils/TokenHelper";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    // If the user lands on the login page but already has a token, send them to the dashboard
    const token = getAuthToken();
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await login(form).unwrap();

      console.log("Login success:", res);

      // redirect after login
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, rgb(13 33 55), rgb(20 55 90))",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/img/logo.png"
            alt="Equity & Legal Solutions"
            width={180}
            height={60}
            priority
            className="h-16 w-auto"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-[rgb(13_33_55)] mb-2">
          Sign in to your account
        </h2>

        <p className="text-sm text-center text-slate-500 mb-6">
          Use your corporate email to continue
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="name@company.com"
              className="mt-1 w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[rgb(13_33_55)] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[rgb(13_33_55)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input
                name="rememberMe"
                type="checkbox"
                checked={form.rememberMe}
                onChange={handleChange}
                className="rounded border-slate-300"
              />
              Remember me
            </label>

            <a
              href="#"
              className="font-medium text-[rgb(13_33_55)] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg text-white font-semibold transition"
            style={{ backgroundColor: "rgb(13 33 55)" }}
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-center text-slate-400 mt-6">
          © 2026 · Secure Authentication System
        </p>
      </div>
    </div>
  );
};

export default Login;
