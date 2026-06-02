"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Shapes,
  Truck,
  Pill,
  ShoppingCart,
  DollarSign,
  Users,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: Shapes,
  },
  {
    name: "Suppliers",
    path: "/dashboard/suppliers",
    icon: Truck,
  },
  {
    name: "Medicines",
    path: "/dashboard/medicines",
    icon: Pill,
  },
  {
    name: "Purchases",
    path: "/dashboard/purchases",
    icon: ShoppingCart,
  },
  {
    name: "Sales",
    path: "/dashboard/sales",
    icon: DollarSign,
  },
  {
    name: "Customers",
    path: "/dashboard/customers",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white border-r border-slate-800 shadow-2xl sticky top-0">
      {/* Logo */}
      <div className="px-8 py-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-xl font-bold">
            💊
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Pharmacy ERP
            </h1>

            <p className="text-sm text-slate-400">
              Management System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-5">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 px-4">
          Main Menu
        </p>

        <div className="space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              pathname === menu.path;

            return (
              <Link
                key={menu.path}
                href={menu.path}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon
                  size={22}
                  className={`transition-transform duration-300
                  ${
                    active
                      ? "scale-110"
                      : "group-hover:scale-110"
                  }`}
                />

                <span className="font-medium text-base">
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Card */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-5 shadow-xl">
          <h3 className="font-bold text-lg">
            Pharmacy ERP
          </h3>

          <p className="text-sm text-blue-100 mt-2">
            Manage medicines, suppliers,
            purchases and sales efficiently.
          </p>
        </div>
      </div>
    </aside>
  );
}