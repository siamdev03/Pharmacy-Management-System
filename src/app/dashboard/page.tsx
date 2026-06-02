"use client";

import {
  Package,
  Layers3,
  Truck,
  Users,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Clock3,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "@/services/dashboard.service";

export default function DashboardPage() {
  const { data, isLoading } =
    useQuery({
      queryKey: ["dashboard"],
      queryFn:
        getDashboardStats,
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-semibold">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  const stats =
    data?.data || {};

  const cards = [
    {
      title: "Medicines",
      value:
        stats.totalMedicines || 0,
      icon: Package,
      color:
        "bg-blue-50 text-blue-600",
    },
    {
      title: "Categories",
      value:
        stats.totalCategories ||
        0,
      icon: Layers3,
      color:
        "bg-violet-50 text-violet-600",
    },
    {
      title: "Suppliers",
      value:
        stats.totalSuppliers || 0,
      icon: Truck,
      color:
        "bg-green-50 text-green-600",
    },
    {
      title: "Customers",
      value:
        stats.totalCustomers || 0,
      icon: Users,
      color:
        "bg-orange-50 text-orange-600",
    },
    {
      title: "Purchases",
      value:
        stats.totalPurchases ||
        0,
      icon: ShoppingCart,
      color:
        "bg-cyan-50 text-cyan-600",
    },
    {
      title: "Sales",
      value:
        stats.totalSales || 0,
      icon: DollarSign,
      color:
        "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Low Stock",
      value:
        stats.lowStockMedicines ||
        0,
      icon: AlertTriangle,
      color:
        "bg-red-50 text-red-600",
    },
    {
      title: "Expiring Soon",
      value:
        stats.expiringMedicines ||
        0,
      icon: Clock3,
      color:
        "bg-yellow-50 text-yellow-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome to Pharmacy ERP
          Management System
        </p>
      </div>

      {/* Statistics Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map(
          (card, index) => {
            const Icon =
              card.icon;

            return (
              <div
                key={index}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 text-sm">
                      {card.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {card.value}
                    </h2>
                  </div>

                  <div
                    className={`p-4 rounded-xl ${card.color}`}
                  >
                    <Icon size={30} />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Revenue Section */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <p className="text-slate-500">
            Purchase Amount
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            ৳
            {stats.totalPurchaseAmount?.toLocaleString() ||
              0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <p className="text-slate-500">
            Sales Amount
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">
            ৳
            {stats.totalSalesAmount?.toLocaleString() ||
              0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <p className="text-slate-500">
            Net Profit
          </p>

          <h2 className="text-4xl font-bold text-emerald-600 mt-3">
            ৳
            {stats.totalProfit?.toLocaleString() ||
              0}
          </h2>
        </div>
      </div>

      {/* Quick Summary */}

      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-3">
          Pharmacy Performance
        </h2>

        <p className="text-indigo-100">
          You currently manage{" "}
          <strong>
            {
              stats.totalMedicines
            }
          </strong>{" "}
          medicines,{" "}
          <strong>
            {
              stats.totalCustomers
            }
          </strong>{" "}
          customers and{" "}
          <strong>
            {stats.totalSales}
          </strong>{" "}
          completed sales.
        </p>

        <div className="mt-5 text-lg font-semibold">
          Total Profit: ৳
          {stats.totalProfit?.toLocaleString() ||
            0}
        </div>
      </div>
    </div>
  );
}