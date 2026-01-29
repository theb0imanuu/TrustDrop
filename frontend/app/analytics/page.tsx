"use client";

import { StatsCard } from "@/components/dashboard/stats-card";

export default function AnalyticsPage() {
  const metrics = [
    {
      label: "Total Revenue",
      value: "Ksh 45,230.50",
      change: "+12.5%",
      icon: "💰",
    },
    {
      label: "Avg. Delivery Time",
      value: "24 mins",
      change: "-5.2%",
      icon: "⏱️",
    },
    {
      label: "Customer Satisfaction",
      value: "98.5%",
      change: "+2.1%",
      icon: "⭐",
    },
    {
      label: "Active Riders",
      value: "157",
      change: "+8.3%",
      icon: "🏍️",
    },
  ];

  const monthlyData = [
    { month: "Jan", orders: 340, revenue: 8500 },
    { month: "Feb", orders: 425, revenue: 10200 },
    { month: "Mar", orders: 512, revenue: 12300 },
    { month: "Apr", orders: 678, revenue: 15400 },
    { month: "May", orders: 834, revenue: 18900 },
    { month: "Jun", orders: 1024, revenue: 24300 },
  ];

  const topRoutes = [
    { route: "Accra → Tema", orders: 234, revenue: "Ksh 5,850" },
    { route: "Kumasi → Ashanti", orders: 187, revenue: "Ksh 4,675" },
    { route: "Accra → Cape Coast", orders: 156, revenue: "Ksh 3,900" },
    { route: "Tema → Takoradi", orders: 142, revenue: "Ksh 3,550" },
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
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Analytics
            </h1>
            <p className="text-muted-foreground">
              Performance metrics and insights
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <p className="text-muted-foreground text-sm mb-2">
                  {metric.label}
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  <span className="text-green-400 text-sm font-medium">
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Monthly Orders Chart */}
            <div className="lg:col-span-2 glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Monthly Orders & Revenue
              </h2>
              <div className="h-64 flex items-end justify-around gap-2 pb-4 border-b border-white/10">
                {monthlyData.map((data, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full bg-gradient-trust rounded-t opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${(data.orders / 1024) * 200}px` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Avg Orders/Month</p>
                  <p className="text-xl font-bold text-foreground">667</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Revenue/Month</p>
                  <p className="text-xl font-bold text-foreground">
                    Ksh 13,900
                  </p>
                </div>
              </div>
            </div>

            {/* Top Routes */}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Top Routes
              </h2>
              <div className="space-y-4">
                {topRoutes.map((route, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <p className="font-medium text-foreground">{route.route}</p>
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{route.orders} orders</span>
                      <span>{route.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Delivery Performance
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      On-time Delivery
                    </span>
                    <span className="text-green-400">96.2%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "96.2%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      Customer Rating
                    </span>
                    <span className="text-orange-400">4.8/5</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "96%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      Rider Efficiency
                    </span>
                    <span className="text-blue-400">89.5%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "89.5%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Growth Metrics
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Week over Week
                    </p>
                    <p className="text-2xl font-bold text-green-400">+18.5%</p>
                  </div>
                  <span className="text-3xl">📈</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Month over Month
                    </p>
                    <p className="text-2xl font-bold text-green-400">+32.1%</p>
                  </div>
                  <span className="text-3xl">📊</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Year over Year
                    </p>
                    <p className="text-2xl font-bold text-green-400">+145.3%</p>
                  </div>
                  <span className="text-3xl">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
