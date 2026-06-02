"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  getSingleCategory,
  updateCategory,
} from "@/services/category.service";

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const loadCategory =
      async () => {
        try {
          const res =
            await getSingleCategory(
              params.id as string
            );

          setName(
            res.data.name
          );
        } catch (error) {
          console.error(error);
        }
      };

    loadCategory();
  }, [params.id]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateCategory(
        params.id as string,
        { name }
      );

      router.push(
        "/dashboard/categories"
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Category
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 bg-green-600 text-white rounded-lg"
        >
          {loading
            ? "Updating..."
            : "Update Category"}
        </button>
      </form>
    </div>
  );
}