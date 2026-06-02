"use client";

import Link from "next/link";

import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { getSales } from "@/services/sales.service";

export default function SalesPage() {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["sales"],
    queryFn: getSales,
  });

  const sales =
    data?.data || [];

  const stats = useMemo(() => {
    return sales.reduce(
      (
        acc: any,
        sale: any
      ) => {
        acc.totalSales +=
          sale.totalAmount || 0;

        acc.totalProfit +=
          sale.profit || 0;

        acc.totalQty +=
          sale.quantity || 0;

        return acc;
      },
      {
        totalSales: 0,
        totalProfit: 0,
        totalQty: 0,
      }
    );
  }, [sales]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Sales
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all pharmacy sales
          </p>
        </div>

        <Link
          href="/dashboard/sales/create"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          + New Sale
        </Link>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Total Sales
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ৳
            {stats.totalSales.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Total Profit
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            ৳
            {stats.totalProfit.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Sold Quantity
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {stats.totalQty}
          </h2>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">
            Sales History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-4">
                  Medicine
                </th>

                <th className="text-center px-6 py-4">
                  Quantity
                </th>

                <th className="text-center px-6 py-4">
                  Unit Price
                </th>

                <th className="text-center px-6 py-4">
                  Total
                </th>

                <th className="text-center px-6 py-4">
                  Profit
                </th>

                <th className="text-center px-6 py-4">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {sales.map(
                (sale: any) => (
                  <tr
                    key={
                      sale._id
                    }
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {
                        sale
                          .medicine
                          ?.name
                      }
                    </td>

                    <td className="px-6 py-4 text-center">
                      {
                        sale.quantity
                      }
                    </td>

                    <td className="px-6 py-4 text-center">
                      ৳
                      {
                        sale.sellingPrice
                      }
                    </td>

                    <td className="px-6 py-4 text-center font-medium">
                      ৳
                      {
                        sale.totalAmount
                      }
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        ৳
                        {
                          sale.profit
                        }
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center text-gray-600">
                      {new Date(
                        sale.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                )
              )}

              {sales.length ===
                0 && (
                <tr>
                  <td
                    colSpan={
                      6
                    }
                    className="text-center py-10 text-gray-500"
                  >
                    No Sales Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}