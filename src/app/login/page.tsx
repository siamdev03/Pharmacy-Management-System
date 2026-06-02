"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Mail,
  Lock,
  Pill,
} from "lucide-react";

import Swal from "sweetalert2";

import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser({
        email,
        password,
      });

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/dashboard");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error?.response?.data
            ?.message ||
          "Invalid Credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <Pill size={34} />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                Pharmacy ERP
              </h1>

              <p className="text-blue-200 mt-1">
                Management System
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold leading-tight">
            Smart Pharmacy
            <br />
            Management Solution
          </h2>

          <p className="text-slate-300 mt-5 leading-7">
            Manage medicines,
            suppliers, purchases,
            sales and customers
            from one centralized
            dashboard.
          </p>

          <div className="mt-10 space-y-4 text-sm text-slate-300">
            <div>
              ✓ Inventory Tracking
            </div>

            <div>
              ✓ Purchase Management
            </div>

            <div>
              ✓ Sales Analytics
            </div>

            <div>
              ✓ Customer Management
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-slate-900">
                Welcome Back
              </h2>

              <p className="text-slate-500 mt-2">
                Login to continue
                managing your
                pharmacy.
              </p>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Email Address
                </label>

                <div className="mt-2 relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target
                          .value
                      )
                    }
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Password
                </label>

                <div className="mt-2 relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target
                          .value
                      )
                    }
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  loading
                }
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.01] transition-all duration-300"
              >
                {loading
                  ? "Signing In..."
                  : "Login"}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
              Pharmacy ERP © 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}