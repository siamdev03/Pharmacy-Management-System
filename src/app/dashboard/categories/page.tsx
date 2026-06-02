"use client";

import Link from "next/link";
import Swal from "sweetalert2";

import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getCategories,
  deleteCategory,
} from "@/services/category.service";

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories =
    data?.data || [];

  const filteredCategories =
    categories.filter(
      (category: any) =>
        category.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  const stats = useMemo(() => {
    return {
      total:
        filteredCategories.length,
    };
  }, [filteredCategories]);

  const handleDelete = async (
    id: string
  ) => {
    const result =
      await Swal.fire({
        title:
          "Delete Category?",
        text:
          "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:
          "#dc2626",
      });

    if (!result.isConfirmed)
      return;

    await deleteCategory(id);

    await Swal.fire({
      icon: "success",
      title:
        "Category Deleted",
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
            Categories
          </h1>

          <p className="text-gray-500 mt-1">
            Manage medicine categories
          </p>
        </div>

        <Link
          href="/dashboard/categories/create"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium"
        >
          + Create Category
        </Link>
      </div>

      {/* Summary Card */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Total Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.total}
          </h2>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Active Categories
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {stats.total}
          </h2>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">
            Search Results
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {
              filteredCategories.length
            }
          </h2>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search Category..."
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
            Category Directory
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">
                  Category Name
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map(
                (
                  category: any
                ) => (
                  <tr
                    key={
                      category._id
                    }
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {
                        category.name
                      }
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/dashboard/categories/edit/${category._id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              category._id
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

              {filteredCategories.length ===
                0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-10 text-gray-500"
                  >
                    No Categories Found
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