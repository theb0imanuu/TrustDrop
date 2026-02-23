"use client";

import React, { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { OrderRow } from "@/components/dashboard/order-row";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/api";
import { Order } from "@/lib/types";

export default function Dashboard() {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const { data: orders = [], isLoading, error } = useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const filteredOrders =
    expandedFilter && expandedFilter !== "All"
      ? orders.filter(
          (order) =>
            order.status === expandedFilter.toLowerCase().replace(" ", "_"),
        )
      : orders;

  return (
    <main className="min-h-screen">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-900/20 rounded-full blur-3xl light:bg-purple-300/20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-800/20 rounded-full blur-3xl light:bg-purple-200/20" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-700/10 rounded-full blur-3xl light:bg-purple-300/10" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Header />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={<span className="text-2xl">📦</span>}
              title="Total Orders"
              value={orders.length}
              subtitle="This month"
              trend="up"
            />
            <StatsCard
              icon={<span className="text-2xl">🚚</span>}
              title="Active Dispatches"
              value={orders.filter((o) => o.status === "dispatched").length}
              subtitle="In progress"
              trend="up"
            />
            <StatsCard
              icon={<span className="text-2xl">✅</span>}
              title="Verified Deliveries"
              value={orders.filter((o) => o.status === "delivered").length}
              subtitle="Success rate: 98.2%"
              trend="up"
            />
						<StatsCard
              icon={<span className="text-2xl">⏳</span>}
              title="Pending Orders"
              value={orders.filter((o) => o.status === "pending").length}
              subtitle="Waiting for confirmation"
              trend="neutral"
            />
          </div>

          {/* Orders Section */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Live Orders
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Real-time dispatch management
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 glass rounded-lg text-sm font-medium text-foreground hover:bg-white/20 transition ${showFilters ? "bg-white/20 ring-2 ring-orange-500/50" : ""}`}
                >
                  Filter
                </button>
                <button className="px-4 py-2 gradient-trust text-white rounded-lg text-sm font-medium hover:shadow-lg transition">
                  New Order
                </button>
              </div>
            </div>

            {/* Quick Filter Chips */}
            {showFilters && (
              <div className="flex gap-2 mb-6 pb-6 border-b border-white/10 overflow-x-auto animate-in fade-in slide-in-from-top-2 duration-200">
                {["All", "Dispatched", "Delivered", "Pending"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() =>
                      setExpandedFilter(
                        expandedFilter === filter ? null : filter,
                      )
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      expandedFilter === filter
                        ? "gradient-trust text-white shadow-lg"
                        : "bg-white/10 text-foreground hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}

            {/* Orders List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isLoading ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  Loading orders...
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-12 text-red-500">
                  Failed to load orders.
                </div>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderRow key={order.id} {...order} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No orders found matching this filter.
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-muted-foreground text-sm">
            <p>Last updated: Just now • System healthy • All riders online</p>
          </div>
        </div>
      </div>
    </main>
  );
}
