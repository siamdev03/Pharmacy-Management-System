"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import { createCustomer } from "@/services/customer.service";

export default function CreateCustomerPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await createCustomer({
        name,
        phone,
        address,
      });

      await Swal.fire({
        icon: "success",
        title:
          "Customer Created Successfully",
      });

      router.push(
        "/dashboard/customers"
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data
            ?.message ||
          "Failed To Create Customer",
      });
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-5">
        Create Customer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          className="border p-3 rounded"
          required
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          className="border p-3 rounded"
          rows={4}
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Save Customer
        </button>
      </form>
    </div>
  );
}