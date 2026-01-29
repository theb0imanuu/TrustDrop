"use client";

import React, { useState } from "react";

interface OrderRowProps {
  id: string;
  recipient: string;
  location: string;
  status: "pending" | "dispatched" | "in_transit" | "delivered";
  amount: string;
  time: string;
}

export function OrderRow({
  id,
  recipient,
  location,
  status,
  amount,
  time,
}: OrderRowProps) {
  const [isDispatching, setIsDispatching] = useState(false);

  const statusConfig = {
    pending: {
      color: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
      label: "Pending",
      icon: "⏳",
    },
    dispatched: {
      color: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
      label: "Dispatched",
      icon: "📤",
    },
    in_transit: {
      color:
        "bg-orange-500/20 text-orange-300 border border-orange-500/30 pulse-glow",
      label: "In Transit",
      icon: "🚚",
    },
    delivered: {
      color: "bg-green-500/20 text-green-300 border border-green-500/30",
      label: "Delivered",
      icon: "✓",
    },
  };

  const borderColorClasses = {
    pending: "border-l-yellow-500",
    dispatched: "border-l-blue-500",
    in_transit: "border-l-orange-500",
    delivered: "border-l-green-500",
  };

  const config = statusConfig[status];

  const handleDispatch = async () => {
    setIsDispatching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsDispatching(false);
  };

  return (
    <div
      className={`glass rounded-xl p-4 mb-3 border-l-4 ${borderColorClasses[status]} hover:bg-white/20 transition-all duration-300 group`}
    >
      <div className="flex flex-col gap-2">
        {/* Top Row: Recipient & Amount */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground truncate text-base">
            {recipient}
          </h4>
          <p className="font-semibold text-foreground text-base">{amount}</p>
        </div>

        {/* Bottom Row: Location & Status/Actions */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground truncate max-w-[50%]">
            {location}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {time}
            </span>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
            >
              {config.icon} {config.label}
            </span>

            {status === "pending" && (
              <button
                onClick={handleDispatch}
                disabled={isDispatching}
                className="px-3 py-1 gradient-trust text-white rounded-md font-medium text-xs hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDispatching ? "..." : "Dispatch"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
