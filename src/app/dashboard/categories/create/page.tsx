"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createCategory } from "@/services/category.service";

export default function CreateCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category Name is required");
      return;
    }

    try {
      setLoading(true);

      await createCategory({
        name,
      });

      router.push(
        "/dashboard/categories"
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Category
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block mb-2 font-medium">
            Category Name
          </label>

          <input
            type="text"
            placeholder="Enter category name"
            className="w-full border rounded-lg p-3"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg"
        >
          {loading
            ? "Saving..."
            : "Save Category"}
        </button>
      </form>
    </div>
  );
}