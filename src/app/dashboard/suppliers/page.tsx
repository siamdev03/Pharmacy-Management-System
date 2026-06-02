"use client";

import Link from "next/link";
import Swal from "sweetalert2";

import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getSuppliers,
  deleteSupplier,
} from "@/services/supplier.service";

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });

  const suppliers =
    data?.data || [];

  const filteredSuppliers =
    suppliers.filter(
      (supplier: any) =>
        supplier.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        supplier.contactPerson
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        supplier.phone?.includes(
          searchTerm
        )
    );

  const stats = useMemo(() => {
    return {
      totalSuppliers:
        filteredSuppliers.length,

      totalContacts:
        filteredSuppliers.filter(
          (s: any) =>
            s.contactPerson
        ).length,

      totalEmails:
        filteredSuppliers.filter(
          (s: any) => s.email
        ).length,
    };
  }, [filteredSuppliers]);

  const handleDelete = async (
    id: string
  ) => {
    const result =
      await Swal.fire({
        title:
          "Delete Supplier?",
        text:
          "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:
          "#dc2626",
      });

    if (!result.isConfirmed)
      return;

    await deleteSupplier(id);

    await Swal.fire({
      icon: "success",
      title:
        "Supplier Deleted",
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

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Suppliers
          </h1>

          <p className="text-gray-500 mt-1">
            Manage pharmaceutical suppliers
          </p>
        </div>

        <Link
          href="/dashboard/suppliers/create"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium"
        >
          + Create Supplier
        </Link>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Total Suppliers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              stats.totalSuppliers
            }
          </h2>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Contact Persons
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {
              stats.totalContacts
            }
          </h2>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Active Emails
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {
              stats.totalEmails
            }
          </h2>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search Supplier, Contact Person or Phone..."
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
            Supplier Directory
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">
                  Company
                </th>

                <th className="px-6 py-4 text-left">
                  Contact Person
                </th>

                <th className="px-6 py-4 text-left">
                  Phone
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSuppliers.map(
                (
                  supplier: any
                ) => (
                  <tr
                    key={
                      supplier._id
                    }
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold">
                      {
                        supplier.name
                      }
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {
                          supplier.contactPerson
                        }
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {
                        supplier.phone
                      }
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {
                        supplier.email
                      }
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/dashboard/suppliers/edit/${supplier._id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              supplier._id
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

              {filteredSuppliers.length ===
                0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-gray-500"
                  >
                    No Suppliers Found
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