"use client";

import React from "react";

export function Header() {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";

  return (
    <div className="glass rounded-2xl mb-8 p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white [.light_&]:text-black mb-2">
            {greeting}, Manager
          </h1>
          <p className="text-muted-foreground">
            Welcome to TrustDrop Dispatch Center
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">System Status</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-3 bg-green-500 rounded-full pulse-glow" />
            <span className="font-semibold text-foreground">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
