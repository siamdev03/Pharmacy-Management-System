"use client";

import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import Papa from "papaparse";

import { useQuery } from "@tanstack/react-query";

import {
  deleteMedicine,
  getMedicines,
} from "@/services/medicine.service";

import { getCategories } from "@/services/category.service";
import { getSuppliers } from "@/services/supplier.service";

export default function MedicinesPage() {
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [supplier, setSupplier] =
    useState("");

  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "medicines",
      page,
      searchTerm,
      category,
      supplier,
    ],
    queryFn: () =>
      getMedicines({
        page,
        limit: 10,
        searchTerm,
        category,
        supplier,
      }),
  });

  const {
    data: categoryData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: supplierData,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });

  const medicines =
    data?.data?.result || [];

  const meta =
    data?.data?.meta;

  const totalPages = Math.ceil(
    (meta?.total || 0) /
      (meta?.limit || 10)
  );

  const handleDelete = async (
    id: string
  ) => {
    const result =
      await Swal.fire({
        title:
          "Delete Medicine?",
        text:
          "This action cannot be undone",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:
          "#dc2626",
      });

    if (!result.isConfirmed)
      return;

    await deleteMedicine(id);

    await Swal.fire({
      icon: "success",
      title: "Deleted",
      text:
        "Medicine deleted successfully",
    });

    refetch();
  };

  const exportCSV = () => {
    const csv = Papa.unparse(
      medicines.map(
        (medicine: any) => ({
          Name: medicine.name,
          Generic:
            medicine.genericName,
          Category:
            medicine.category
              ?.name,
          Supplier:
            medicine.supplier
              ?.name,
          Stock:
            medicine.quantity,
          Expiry:
            medicine.expiryDate,
        })
      )
    );

    const blob = new Blob(
      [csv],
      {
        type: "text/csv",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement(
        "a"
      );

    a.href = url;
    a.download =
      "medicines.csv";

    a.click();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-2xl font-semibold">
          Loading Medicines...
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Medicines
          </h1>

          <p className="text-gray-500 mt-2">
            Manage pharmacy inventory
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium shadow"
          >
            Export CSV
          </button>

          <Link
            href="/dashboard/medicines/create"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium shadow"
          >
            + Add Medicine
          </Link>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-gray-500">
            Total Medicines
          </p>

          <h2 className="text-3xl font-bold">
            {meta?.total || 0}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-gray-500">
            Current Page
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            {page}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-gray-500">
            Categories
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            {categoryData?.data?.length || 0}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-gray-500">
            Suppliers
          </p>

          <h2 className="text-3xl font-bold text-violet-600">
            {supplierData?.data?.length || 0}
          </h2>
        </div>
      </div>

      {/* Filters */}

      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search Medicine..."
            className="border rounded-lg px-4 py-3"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

          <select
            className="border rounded-lg px-4 py-3"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >
            <option value="">
              All Categories
            </option>

            {categoryData?.data?.map(
              (cat: any) => (
                <option
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.name}
                </option>
              )
            )}
          </select>

          <select
            className="border rounded-lg px-4 py-3"
            value={supplier}
            onChange={(e) =>
              setSupplier(
                e.target.value
              )
            }
          >
            <option value="">
              All Suppliers
            </option>

            {supplierData?.data?.map(
              (sup: any) => (
                <option
                  key={sup._id}
                  value={sup._id}
                >
                  {sup.name}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Generic
                </th>

                <th className="p-4">
                  Category
                </th>

                <th className="p-4">
                  Supplier
                </th>

                <th className="p-4">
                  Stock
                </th>

                <th className="p-4">
                  Expiry
                </th>

                <th className="p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {medicines.map(
                (medicine: any) => (
                  <tr
                    key={
                      medicine._id
                    }
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4 font-semibold">
                      {
                        medicine.name
                      }
                    </td>

                    <td className="p-4">
                      {
                        medicine.genericName
                      }
                    </td>

                    <td className="p-4">
                      {
                        medicine.category
                          ?.name
                      }
                    </td>

                    <td className="p-4">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {
                          medicine
                            .supplier
                            ?.name
                        }
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      {medicine.quantity <
                      20 ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                          Low (
                          {
                            medicine.quantity
                          }
                          )
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          {
                            medicine.quantity
                          }
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {new Date(
                        medicine.expiryDate
                      ) <
                      new Date(
                        Date.now() +
                          90 *
                            24 *
                            60 *
                            60 *
                            1000
                      ) ? (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                          Expiring Soon
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          Safe
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/dashboard/medicines/${medicine._id}`}
                          className="bg-slate-700 text-white px-3 py-2 rounded-lg"
                        >
                          View
                        </Link>

                        <Link
                          href={`/dashboard/medicines/edit/${medicine._id}`}
                          className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              medicine._id
                            )
                          }
                          className="bg-red-500 text-white px-3 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className="px-5 py-2 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <div className="bg-indigo-600 text-white px-5 py-2 rounded-lg">
          Page {page} of {totalPages}
        </div>

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(page + 1)
          }
          className="px-5 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}