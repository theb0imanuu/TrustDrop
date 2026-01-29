"use client";

import { OrderRow } from "@/components/dashboard/order-row";
import { useState } from "react";

const mockOrders = [
  {
    id: "1",
    recipient: "Kofi Mensah",
    location: "Accra Central, Ghana",
    status: "in_transit" as const,
    amount: "Ksh 250.00",
    time: "2 mins ago",
  },
  {
    id: "2",
    recipient: "Ama Osei",
    location: "Kumasi, Ashanti",
    status: "dispatched" as const,
    amount: "Ksh 180.50",
    time: "15 mins ago",
  },
  {
    id: "3",
    recipient: "Kwame Asare",
    location: "Tema, Greater Accra",
    status: "pending" as const,
    amount: "Ksh 425.00",
    time: "32 mins ago",
  },
  {
    id: "4",
    recipient: "Abena Boateng",
    location: "Cape Coast, Central",
    status: "delivered" as const,
    amount: "Ksh 195.75",
    time: "1 hour ago",
  },
  {
    id: "5",
    recipient: "Yaw Amoah",
    location: "Sekondi-Takoradi",
    status: "in_transit" as const,
    amount: "Ksh 340.00",
    time: "45 mins ago",
  },
  {
    id: "6",
    recipient: "Esi Addo",
    location: "Tamale, Northern",
    status: "pending" as const,
    amount: "Ksh 210.00",
    time: "55 mins ago",
  },
  {
    id: "7",
    recipient: "Kojo Baah",
    location: "Koforidua, Eastern",
    status: "delivered" as const,
    amount: "Ksh 150.25",
    time: "2 hours ago",
  },
  {
    id: "8",
    recipient: "Akua Danso",
    location: "Sunyani, Brong-Ahafo",
    status: "dispatched" as const,
    amount: "Ksh 275.50",
    time: "3 hours ago",
  },
  {
    id: "9",
    recipient: "Fiifi Sowah",
    location: "Ho, Volta",
    status: "in_transit" as const,
    amount: "Ksh 320.00",
    time: "4 hours ago",
  },
  {
    id: "10",
    recipient: "Adjoa Mansa",
    location: "Wa, Upper West",
    status: "pending" as const,
    amount: "Ksh 180.00",
    time: "5 hours ago",
  },
];

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredOrders = selectedStatus
    ? mockOrders.filter((order) => order.status === selectedStatus)
    : mockOrders;

  const statuses = [
    { key: "all", label: "All Orders", count: mockOrders.length },
    {
      key: "pending",
      label: "Pending",
      count: mockOrders.filter((o) => o.status === "pending").length,
    },
    {
      key: "dispatched",
      label: "Dispatched",
      count: mockOrders.filter((o) => o.status === "dispatched").length,
    },
    {
      key: "in_transit",
      label: "In Transit",
      count: mockOrders.filter((o) => o.status === "in_transit").length,
    },
    {
      key: "delivered",
      label: "Delivered",
      count: mockOrders.filter((o) => o.status === "delivered").length,
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

            {filteredOrders.length > 0 ? (
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
