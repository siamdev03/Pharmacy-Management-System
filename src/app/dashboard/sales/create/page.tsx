"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";

import { getMedicines } from "@/services/medicine.service";

import { createSale } from "@/services/sales.service";

export default function CreateSalePage() {
  const router = useRouter();

  const [medicine, setMedicine] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const { data } = useQuery({
    queryKey: ["medicines"],
    queryFn: () =>
      getMedicines({
        page: 1,
        limit: 1000,
      }),
  });

  const medicines =
    data?.data?.result ||
    [];

  const selectedMedicine =
    medicines.find(
      (m: any) =>
        m._id === medicine
    );

  const sellingPrice =
    selectedMedicine
      ?.sellingPrice || 0;

  const totalAmount =
    Number(quantity || 0) *
    sellingPrice;

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      Number(quantity) >
      selectedMedicine?.quantity
    ) {
      return Swal.fire({
        icon: "error",
        title:
          "Insufficient Stock",
      });
    }

    try {
      await createSale({
        medicine,
        quantity:
          Number(quantity),
        sellingPrice,
        totalAmount,
      });

      await Swal.fire({
        icon: "success",
        title:
          "Sale Completed",
      });

      router.push(
        "/dashboard/sales"
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title:
          error?.response?.data
            ?.message ||
          "Something went wrong",
      });
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Sale
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <select
          value={medicine}
          onChange={(e) =>
            setMedicine(
              e.target.value
            )
          }
          className="border p-3 rounded"
        >
          <option value="">
            Select Medicine
          </option>

          {medicines.map(
            (medicine: any) => (
              <option
                key={
                  medicine._id
                }
                value={
                  medicine._id
                }
              >
                {medicine.name}
              </option>
            )
          )}
        </select>

        {selectedMedicine && (
          <>
            <div className="bg-blue-50 p-3 rounded">
              Stock:
              {" "}
              {
                selectedMedicine.quantity
              }
            </div>

            <div className="bg-green-50 p-3 rounded">
              Price:
              {" "}
              ৳
              {sellingPrice}
            </div>
          </>
        )}

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

        <input
          type="number"
          value={totalAmount}
          readOnly
          className="border p-3 rounded bg-gray-100"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded"
        >
          Complete Sale
        </button>
      </form>
    </div>
  );
}