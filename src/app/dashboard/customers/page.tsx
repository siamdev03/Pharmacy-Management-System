"use client";

import Link from "next/link";
import Swal from "sweetalert2";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getCustomers,
  deleteCustomer,
} from "@/services/customer.service";

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const handleDelete = async (
    id: string
  ) => {
    const result =
      await Swal.fire({
        title:
          "Delete Customer?",
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

    await deleteCustomer(id);

    await Swal.fire({
      icon: "success",
      title:
        "Customer Deleted",
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

  const customers =
    data?.data || [];

  const filteredCustomers =
    customers.filter(
      (customer: any) =>
        customer.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        customer.phone?.includes(
          searchTerm
        )
    );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <p className="text-gray-500">
            Total Customers:{" "}
            {
              filteredCustomers.length
            }
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search Customer..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="border rounded-lg px-4 py-2 w-72"
          />

          <Link
            href="/dashboard/customers/create"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Add Customer
          </Link>
        </div>
      </div>

      {/* Stats Card */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h4 className="text-gray-500">
            Total Customers
          </h4>

          <h2 className="text-3xl font-bold mt-2">
            {
              filteredCustomers.length
            }
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h4 className="text-gray-500">
            Active Customers
          </h4>

          <h2 className="text-3xl font-bold mt-2">
            {
              filteredCustomers.length
            }
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h4 className="text-gray-500">
            Database Records
          </h4>

          <h2 className="text-3xl font-bold mt-2">
            {customers.length}
          </h2>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Phone
              </th>

              <th className="text-left p-4">
                Address
              </th>

              <th className="text-center p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map(
              (
                customer: any
              ) => (
                <tr
                  key={
                    customer._id
                  }
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">
                    {
                      customer.name
                    }
                  </td>

                  <td className="p-4">
                    {
                      customer.phone
                    }
                  </td>

                  <td className="p-4">
                    {customer.address ||
                      "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/customers/edit/${customer._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            customer._id
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

            {filteredCustomers.length ===
              0 && (
              <tr>
                <td
                  colSpan={
                    4
                  }
                  className="text-center py-10 text-gray-500"
                >
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}