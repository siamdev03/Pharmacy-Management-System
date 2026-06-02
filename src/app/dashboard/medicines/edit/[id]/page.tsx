"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";

import {
  getSingleMedicine,
  updateMedicine,
} from "@/services/medicine.service";

import { getCategories } from "@/services/category.service";
import { getSuppliers } from "@/services/supplier.service";

export default function EditMedicinePage() {
  const params = useParams();

  const router = useRouter();

  const id = params.id as string;

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

  const { data: medicineData } =
    useQuery({
      queryKey: [
        "medicine",
        id,
      ],
      queryFn: () =>
        getSingleMedicine(id),
      enabled: !!id,
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

  useEffect(() => {
    const medicine =
      medicineData?.data;

    if (medicine) {
      setFormData({
        name:
          medicine.name || "",
        genericName:
          medicine.genericName ||
          "",
        category:
          medicine.category
            ?._id || "",
        supplier:
          medicine.supplier
            ?._id || "",
        batchNumber:
          medicine.batchNumber ||
          "",
        purchasePrice:
          String(
            medicine.purchasePrice
          ) || "",
        sellingPrice:
          String(
            medicine.sellingPrice
          ) || "",
        quantity:
          String(
            medicine.quantity
          ) || "",
        expiryDate:
          medicine.expiryDate
            ?.split("T")[0] ||
          "",
        manufacturer:
          medicine.manufacturer ||
          "",
      });
    }
  }, [medicineData]);

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
      await updateMedicine(
        id,
        {
          ...formData,
          purchasePrice:
            Number(
              formData.purchasePrice
            ),
          sellingPrice:
            Number(
              formData.sellingPrice
            ),
          quantity: Number(
            formData.quantity
          ),
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Medicine Updated Successfully",
      });

      router.push(
        "/dashboard/medicines"
      );
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed To Update Medicine",
      });
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Medicine
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <input
          name="name"
          value={formData.name}
          onChange={
            handleChange
          }
          placeholder="Medicine Name"
          className="border p-3 rounded"
        />

        <input
          name="genericName"
          value={
            formData.genericName
          }
          onChange={
            handleChange
          }
          placeholder="Generic Name"
          className="border p-3 rounded"
        />

        <select
          name="category"
          value={
            formData.category
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded"
        >
          <option value="">
            Select Category
          </option>

          {categories.map(
            (category: any) => (
              <option
                key={
                  category._id
                }
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

        <input
          name="batchNumber"
          value={
            formData.batchNumber
          }
          onChange={
            handleChange
          }
          placeholder="Batch Number"
          className="border p-3 rounded"
        />

        <input
          name="purchasePrice"
          type="number"
          value={
            formData.purchasePrice
          }
          onChange={
            handleChange
          }
          placeholder="Purchase Price"
          className="border p-3 rounded"
        />

        <input
          name="sellingPrice"
          type="number"
          value={
            formData.sellingPrice
          }
          onChange={
            handleChange
          }
          placeholder="Selling Price"
          className="border p-3 rounded"
        />

        <input
          name="quantity"
          type="number"
          value={
            formData.quantity
          }
          onChange={
            handleChange
          }
          placeholder="Quantity"
          className="border p-3 rounded"
        />

        <input
          name="expiryDate"
          type="date"
          value={
            formData.expiryDate
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded"
        />

        <input
          name="manufacturer"
          value={
            formData.manufacturer
          }
          onChange={
            handleChange
          }
          placeholder="Manufacturer"
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Update Medicine
        </button>
      </form>
    </div>
  );
}