"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import { createSupplier } from "@/services/supplier.service";

export default function CreateSupplierPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
      await createSupplier(
        formData
      );

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Supplier Created Successfully",
      });

      router.push(
        "/dashboard/suppliers"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Supplier
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="name"
          placeholder="Supplier Name"
          className="border p-3 w-full"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="contactPerson"
          placeholder="Contact Person"
          className="border p-3 w-full"
          value={
            formData.contactPerson
          }
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="border p-3 w-full"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-3 w-full"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          className="border p-3 w-full"
          value={formData.address}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-3 rounded"
        >
          Save Supplier
        </button>
      </form>
    </div>
  );
}