"use client";

import {
  useParams,
} from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { getSingleMedicine } from "@/services/medicine.service";

export default function MedicineDetailsPage() {
  const params = useParams();

  const { data, isLoading } =
    useQuery({
      queryKey: [
        "medicine",
        params.id,
      ],
      queryFn: () =>
        getSingleMedicine(
          params.id as string
        ),
    });

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    );
  }

  const medicine =
    data?.data;

  return (
    <div className="max-w-3xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">
        Medicine Details
      </h1>

      <div className="grid gap-4">
        <p>
          <strong>
            Name:
          </strong>{" "}
          {medicine.name}
        </p>

        <p>
          <strong>
            Generic:
          </strong>{" "}
          {
            medicine.genericName
          }
        </p>

        <p>
          <strong>
            Category:
          </strong>{" "}
          {
            medicine.category
              ?.name
          }
        </p>

        <p>
          <strong>
            Supplier:
          </strong>{" "}
          {
            medicine.supplier
              ?.name
          }
        </p>

        <p>
          <strong>
            Batch:
          </strong>{" "}
          {
            medicine.batchNumber
          }
        </p>

        <p>
          <strong>
            Purchase Price:
          </strong>{" "}
          ৳
          {
            medicine.purchasePrice
          }
        </p>

        <p>
          <strong>
            Selling Price:
          </strong>{" "}
          ৳
          {
            medicine.sellingPrice
          }
        </p>

        <p>
          <strong>
            Stock:
          </strong>{" "}
          {
            medicine.quantity
          }
        </p>

        <p>
          <strong>
            Expiry:
          </strong>{" "}
          {new Date(
            medicine.expiryDate
          ).toLocaleDateString()}
        </p>

        <p>
          <strong>
            Manufacturer:
          </strong>{" "}
          {
            medicine.manufacturer
          }
        </p>
      </div>
    </div>
  );
}