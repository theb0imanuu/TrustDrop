"use client";

import { OrderRow } from "@/components/dashboard/order-row";
import { getOrders } from "@/lib/api";
import { Order } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { data: orders = [], isLoading, error } = useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const filteredOrders = selectedStatus
    ? orders.filter((order) => order.status === selectedStatus)
    : orders;

  const statuses = [
    { key: "all", label: "All Orders", count: orders.length },
    {
      key: "dispatched",
      label: "Dispatched",
      count: orders.filter((o) => o.status === "dispatched").length,
    },
    {
      key: "delivered",
      label: "Delivered",
      count: orders.filter((o) => o.status === "delivered").length,
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-900/20 rounded-full blur-3xl light:bg-purple-300/20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-800/20 rounded-full blur-3xl light:bg-purple-200/20" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Orders</h1>
            <p className="text-muted-foreground">
              Manage and track all your shipments
            </p>
          </div>

          {/* Status Filter */}
          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {statuses.map((status) => (
              <button
                key={status.key}
                onClick={() =>
                  setSelectedStatus(status.key === "all" ? null : status.key)
                }
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  (status.key === "all" && !selectedStatus) ||
                  selectedStatus === status.key
                    ? "gradient-trust text-white shadow-lg"
                    : "glass text-foreground hover:bg-white/20"
                }`}
              >
                {status.label}{" "}
                <span className="text-xs opacity-75">({status.count})</span>
              </button>
            ))}
          </div>

          {/* Orders Grid */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {selectedStatus
                ? `${selectedStatus.replace("_", " ")} Orders`
                : "All Orders"}
            </h2>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load orders.</p>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOrders.map((order) => (
                  <OrderRow key={order.id} {...order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No orders found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
