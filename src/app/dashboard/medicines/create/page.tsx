"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/services/category.service";
import { getSuppliers } from "@/services/supplier.service";
import { createMedicine } from "@/services/medicine.service";

export default function CreateMedicinePage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      name: "",
      genericName: "",
      category: "",
      supplier: "",
      batchNumber: "",
      purchasePrice: "",
      sellingPrice: "",
      quantity: "",
      expiryDate: "",
      manufacturer: "",
    });

  const { data: categoryData } =
    useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    });

  const { data: supplierData } =
    useQuery({
      queryKey: ["suppliers"],
      queryFn: getSuppliers,
    });

  const categories =
    categoryData?.data || [];

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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await createMedicine({
        ...formData,
        purchasePrice: Number(
          formData.purchasePrice
        ),
        sellingPrice: Number(
          formData.sellingPrice
        ),
        quantity: Number(
          formData.quantity
        ),
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Medicine Created Successfully",
      });

      router.push(
        "/dashboard/medicines"
      );
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed To Create Medicine",
      });
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Medicine
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <input
          name="name"
          placeholder="Medicine Name"
          className="border p-3"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="genericName"
          placeholder="Generic Name"
          className="border p-3"
          value={
            formData.genericName
          }
          onChange={handleChange}
        />

        <select
          name="category"
          className="border p-3"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">
            Select Category
          </option>

          {categories.map(
            (category: any) => (
              <option
                key={category._id}
                value={
                  category._id
                }
              >
                {category.name}
              </option>
            )
          )}
        </select>

        <select
          name="supplier"
          className="border p-3"
          value={formData.supplier}
          onChange={handleChange}
        >
          <option value="">
            Select Supplier
          </option>

          {suppliers.map(
            (supplier: any) => (
              <option
                key={supplier._id}
                value={
                  supplier._id
                }
              >
                {supplier.name}
              </option>
            )
          )}
        </select>

        <input
          name="batchNumber"
          placeholder="Batch Number"
          className="border p-3"
          value={
            formData.batchNumber
          }
          onChange={handleChange}
        />

        <input
          name="purchasePrice"
          type="number"
          placeholder="Purchase Price"
          className="border p-3"
          value={
            formData.purchasePrice
          }
          onChange={handleChange}
        />

        <input
          name="sellingPrice"
          type="number"
          placeholder="Selling Price"
          className="border p-3"
          value={
            formData.sellingPrice
          }
          onChange={handleChange}
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          className="border p-3"
          value={
            formData.quantity
          }
          onChange={handleChange}
        />

        <input
          name="expiryDate"
          type="date"
          className="border p-3"
          value={
            formData.expiryDate
          }
          onChange={handleChange}
        />

        <input
          name="manufacturer"
          placeholder="Manufacturer"
          className="border p-3"
          value={
            formData.manufacturer
          }
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-3 rounded"
        >
          Save Medicine
        </button>
      </form>
    </div>
  );
}