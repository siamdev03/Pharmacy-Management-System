"use client";

import { useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";

import {
  getSinglePurchase,
  updatePurchase,
} from "@/services/purchase.service";

export default function EditPurchasePage() {
  const params = useParams();

  const router = useRouter();

  const [quantity, setQuantity] =
    useState("");

  const [
    purchasePrice,
    setPurchasePrice,
  ] = useState("");

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [
      "purchase",
      params.id,
    ],
    queryFn: () =>
      getSinglePurchase(
        params.id as string
      ),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const purchase =
    data?.data;

  if (!purchase) {
    return (
      <h1>
        Purchase Not Found
      </h1>
    );
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await updatePurchase(
      params.id as string,
      {
        supplier:
          purchase.supplier?._id,
        medicine:
          purchase.medicine?._id,

        quantity: Number(
          quantity ||
            purchase.quantity
        ),

        purchasePrice:
          Number(
            purchasePrice ||
              purchase.purchasePrice
          ),

        totalAmount:
          Number(
            quantity ||
              purchase.quantity
          ) *
          Number(
            purchasePrice ||
              purchase.purchasePrice
          ),
      }
    );

    await Swal.fire({
      icon: "success",
      title: "Updated",
      text:
        "Purchase Updated Successfully",
    });

    router.push(
      "/dashboard/purchases"
    );
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Purchase
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <input
          type="text"
          value={
            purchase.medicine
              ?.name || ""
          }
          disabled
          className="border p-3 rounded bg-gray-100"
        />

        <input
          type="number"
          defaultValue={
            purchase.quantity
          }
          onChange={(e) =>
            setQuantity(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

        <input
          type="number"
          defaultValue={
            purchase.purchasePrice
          }
          onChange={(e) =>
            setPurchasePrice(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded"
        >
          Update Purchase
        </button>
      </form>
    </div>
  );
}