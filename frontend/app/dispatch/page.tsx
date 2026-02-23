"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

async function createOrder(newOrder: {
  customer_name: string;
  customer_phone: string;
}) {
  const response = await fetch("http://localhost:8000/api/dispatch/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
}

export default function DispatchPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      router.push("/orders");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      customer_name: customerName,
      customer_phone: customerPhone,
    });
  };

  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-900/20 rounded-full blur-3xl light:bg-purple-300/20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-800/20 rounded-full blur-3xl light:bg-purple-200/20" />
      </div>

      <div className="relative z-10">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Dispatch New Order
            </h1>
            <p className="text-muted-foreground">
              Enter customer details to create a new order.
            </p>
          </div>

          <div className="glass rounded-2xl p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-medium text-foreground"
                  >
                    Customer Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="customerName"
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="customerPhone"
                    className="block text-sm font-medium text-foreground"
                  >
                    Customer Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="customerPhone"
                      id="customerPhone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="px-6 py-3 gradient-trust text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? "Creating Order..." : "Create Order"}
                </button>
              </div>
              {mutation.isError && (
                <p className="mt-4 text-sm text-red-500">
                  {mutation.error.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
