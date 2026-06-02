"use client";

import { useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";

import {
  getSingleCustomer,
  updateCustomer,
} from "@/services/customer.service";

export default function EditCustomerPage() {
  const params = useParams();

  const router = useRouter();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [
      "customer",
      params.id,
    ],
    queryFn: () =>
      getSingleCustomer(
        params.id as string
      ),
  });

  const customer =
    data?.data;

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await updateCustomer(
      params.id as string,
      {
        name:
          name ||
          customer.name,

        phone:
          phone ||
          customer.phone,

        address:
          address ||
          customer.address,
      }
    );

    await Swal.fire({
      icon: "success",
      title:
        "Customer Updated",
    });

    router.push(
      "/dashboard/customers"
    );
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-5">
        Edit Customer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <input
          defaultValue={
            customer.name
          }
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

        <input
          defaultValue={
            customer.phone
          }
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

        <textarea
          defaultValue={
            customer.address
          }
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded"
        >
          Update Customer
        </button>
      </form>
    </div>
  );
}