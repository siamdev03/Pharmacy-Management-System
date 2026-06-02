"use client";

import Link from "next/link";
import Swal from "sweetalert2";

import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getPurchases,
  deletePurchase,
} from "@/services/purchase.service";

export default function PurchasesPage() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["purchases"],
    queryFn: getPurchases,
  });

  const purchases =
    data?.data || [];

  const filteredPurchases =
    purchases.filter(
      (purchase: any) =>
        purchase.medicine?.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        purchase.supplier?.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  const stats = useMemo(() => {
    return filteredPurchases.reduce(
      (
        acc: any,
        purchase: any
      ) => {
        acc.totalAmount +=
          purchase.totalAmount || 0;

        acc.totalQuantity +=
          purchase.quantity || 0;

        return acc;
      },
      {
        totalAmount: 0,
        totalQuantity: 0,
      }
    );
  }, [filteredPurchases]);

  const handleDelete = async (
    id: string
  ) => {
    const result =
      await Swal.fire({
        title:
          "Delete Purchase?",
        text:
          "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:
          "#dc2626",
        confirmButtonText:
          "Delete",
      });

    if (!result.isConfirmed)
      return;

    await deletePurchase(id);

    await Swal.fire({
      icon: "success",
      title:
        "Purchase Deleted",
      timer: 1500,
      showConfirmButton: false,
    });

    refetch();
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Purchases
          </h1>

          <p className="text-gray-500 mt-1">
            Manage medicine purchases
          </p>
        </div>

        <Link
          href="/dashboard/purchases/create"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          + New Purchase
        </Link>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Total Purchases
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              filteredPurchases.length
            }
          </h2>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Purchased Quantity
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {
              stats.totalQuantity
            }
          </h2>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Total Amount
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            ৳
            {stats.totalAmount.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search Medicine or Supplier..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">
            Purchase History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">
                  Medicine
                </th>

                <th className="px-6 py-4 text-left">
                  Supplier
                </th>

                <th className="px-6 py-4 text-center">
                  Quantity
                </th>

                <th className="px-6 py-4 text-center">
                  Unit Price
                </th>

                <th className="px-6 py-4 text-center">
                  Total
                </th>

                <th className="px-6 py-4 text-center">
                  Date
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPurchases.map(
                (
                  purchase: any
                ) => (
                  <tr
                    key={
                      purchase._id
                    }
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {
                        purchase
                          .medicine
                          ?.name
                      }
                    </td>

                    <td className="px-6 py-4">
                      {
                        purchase
                          .supplier
                          ?.name
                      }
                    </td>

                    <td className="px-6 py-4 text-center">
                      {
                        purchase.quantity
                      }
                    </td>

                    <td className="px-6 py-4 text-center">
                      ৳
                      {
                        purchase.purchasePrice
                      }
                    </td>

                    <td className="px-6 py-4 text-center font-semibold">
                      ৳
                      {purchase.totalAmount?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-center text-gray-600">
                      {new Date(
                        purchase.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/dashboard/purchases/edit/${purchase._id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              purchase._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}

              {filteredPurchases.length ===
                0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-10 text-gray-500"
                  >
                    No Purchases Found
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