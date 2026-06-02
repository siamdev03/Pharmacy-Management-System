"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import Swal from "sweetalert2";

import {
  getSingleSupplier,
  updateSupplier,
} from "@/services/supplier.service";

export default function EditSupplierPage() {
  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
    });

  useEffect(() => {
    const loadSupplier =
      async () => {
        try {
          const res =
            await getSingleSupplier(
              params.id as string
            );

          const supplier =
            res?.data;

          setFormData({
            name:
              supplier?.name || "",
            contactPerson:
              supplier?.contactPerson ||
              "",
            phone:
              supplier?.phone || "",
            email:
              supplier?.email || "",
            address:
              supplier?.address ||
              "",
          });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    loadSupplier();
  }, [params.id]);

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
      await updateSupplier(
        params.id as string,
        formData
      );

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Supplier Updated Successfully",
      });

      router.push(
        "/dashboard/suppliers"
      );
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Update Failed",
      });
    }
  };

  if (loading) {
    return (
      <h1>Loading Supplier...</h1>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Supplier
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
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Update Supplier
        </button>
      </form>
    </div>
  );
}