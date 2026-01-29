"use client";

import { useEffect, useState } from "react";

type SettingsItem = {
  title: string;
  description: string;
  type: "toggle" | "info" | "button";
  value?: boolean;
  action?: () => void;
  buttonText?: string;
};

export default function SettingsPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme !== "light");
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.remove("light");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return null;

  const settings: { category: string; items: SettingsItem[] }[] = [
    {
      category: "Appearance",
      items: [
        {
          title: "Dark Mode",
          description: "Switch between dark and light theme",
          type: "toggle",
          value: isDark,
          action: toggleTheme,
        },
      ],
    },
    {
      category: "Notifications",
      items: [
        {
          title: "Order Updates",
          description: "Receive notifications for order status changes",
          type: "toggle",
          value: true,
        },
        {
          title: "Delivery Alerts",
          description: "Get alerts when deliveries are complete",
          type: "toggle",
          value: true,
        },
        {
          title: "System Messages",
          description: "Important system and security notifications",
          type: "toggle",
          value: true,
        },
      ],
    },
    {
      category: "Account",
      items: [
        {
          title: "Email Address",
          description: "admin@trustdrop.com",
          type: "info",
        },
        {
          title: "Account Type",
          description: "Business Account",
          type: "info",
        },
        {
          title: "Joined Date",
          description: "January 15, 2023",
          type: "info",
        },
      ],
    },
    {
      category: "Security",
      items: [
        {
          title: "Two-Factor Authentication",
          description: "Secure your account with 2FA",
          type: "button",
          buttonText: "Enable",
        },
        {
          title: "Change Password",
          description: "Update your account password",
          type: "button",
          buttonText: "Change",
        },
        {
          title: "Active Sessions",
          description: "Manage your login sessions",
          type: "button",
          buttonText: "View",
        },
      ],
    },
    {
      category: "Billing",
      items: [
        {
          title: "Subscription Plan",
          description: "Professional Plan - Ksh 500/month",
          type: "info",
        },
        {
          title: "Billing History",
          description: "View invoices and payment history",
          type: "button",
          buttonText: "View",
        },
        {
          title: "Payment Method",
          description: "Manage your payment methods",
          type: "button",
          buttonText: "Manage",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-900/20 rounded-full blur-3xl light:bg-purple-300/20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-800/20 rounded-full blur-3xl light:bg-purple-200/20" />
      </div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {settings.map((section, sectionIndex) => (
              <div key={sectionIndex} className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-4 border-b border-white/10">
                  {section.category}
                </h2>

                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>

                      {item.type === "toggle" && (
                        <button
                          onClick={item.action}
                          className={`ml-4 relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                            item.value ? "bg-primary" : "bg-white/20"
                          }`}
                          role="switch"
                          aria-checked={item.value}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                              item.value ? "translate-x-7" : "translate-x-1"
                            }`}
                          />
                        </button>
                      )}

                      {item.type === "button" && (
                        <button className="ml-4 px-4 py-2 gradient-trust text-white rounded-lg text-sm font-medium hover:shadow-lg transition whitespace-nowrap">
                          {item.buttonText}
                        </button>
                      )}

                      {item.type === "info" && (
                        <div className="ml-4 text-right">
                          <p className="text-sm font-medium text-foreground">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="glass rounded-2xl p-8 mt-6 border-red-500/30 bg-red-500/10">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Danger Zone
            </h2>
            <p className="text-muted-foreground mb-4">
              Irreversible actions that may affect your account
            </p>
            <button className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
