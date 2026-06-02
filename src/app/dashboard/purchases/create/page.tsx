"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";

import { getMedicines } from "@/services/medicine.service";
import { getSuppliers } from "@/services/supplier.service";
import { createPurchase } from "@/services/purchase.service";

export default function CreatePurchasePage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      supplier: "",
      medicine: "",
      quantity: "",
      purchasePrice: "",
    });

  const { data: medicineData } =
    useQuery({
      queryKey: ["purchase-medicines"],
      queryFn: () =>
        getMedicines({
          page: 1,
          limit: 1000,
        }),
    });

  const { data: supplierData } =
    useQuery({
      queryKey: ["purchase-suppliers"],
      queryFn: getSuppliers,
    });

  const medicines =
    medicineData?.data?.result ||
    [];

  const suppliers =
    supplierData?.data || [];

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const totalAmount =
    Number(
      formData.quantity || 0
    ) *
    Number(
      formData.purchasePrice || 0
    );

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await createPurchase({
        supplier:
          formData.supplier,
        medicine:
          formData.medicine,
        quantity: Number(
          formData.quantity
        ),
        purchasePrice:
          Number(
            formData.purchasePrice
          ),
        totalAmount,
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text:
          "Purchase Created Successfully",
      });

      router.push(
        "/dashboard/purchases"
      );
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          "Failed To Create Purchase",
      });
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Purchase
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <select
          name="supplier"
          value={
            formData.supplier
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded"
        >
          <option value="">
            Select Supplier
          </option>

          {suppliers.map(
            (supplier: any) => (
              <option
                key={
                  supplier._id
                }
                value={
                  supplier._id
                }
              >
                {supplier.name}
              </option>
            )
          )}
        </select>

        <select
          name="medicine"
          value={
            formData.medicine
          }
          onChange={
            handleChange
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

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={
            formData.quantity
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="purchasePrice"
          placeholder="Purchase Price"
          value={
            formData.purchasePrice
          }
          onChange={
            handleChange
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
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          Save Purchase
        </button>
      </form>
    </div>
  );
}