"use client";

import { useState } from "react";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"tickets" | "faq">("tickets");

  const supportTickets = [
    {
      id: "TK-001",
      subject: "Delivery route optimization issue",
      status: "open",
      priority: "high",
      date: "2024-01-15",
    },
    {
      id: "TK-002",
      subject: "Payment gateway integration help",
      status: "in_progress",
      priority: "medium",
      date: "2024-01-14",
    },
    {
      id: "TK-003",
      subject: "Mobile app crash on Android",
      status: "resolved",
      priority: "high",
      date: "2024-01-12",
    },
    {
      id: "TK-004",
      subject: "Analytics dashboard not loading",
      status: "closed",
      priority: "medium",
      date: "2024-01-10",
    },
  ];

  const faqs = [
    {
      question: "How do I create a new delivery order?",
      answer:
        'Navigate to the Orders section and click "New Order". Fill in the recipient details, pickup location, and delivery address.',
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept mobile money (MTN, Vodafone, AirtelTigo), bank transfers, and credit/debit cards through our secure payment gateway.",
    },
    {
      question: "How long does a typical delivery take?",
      answer:
        "Standard deliveries within the same city take 24-48 hours. Express deliveries within Accra take 2-4 hours.",
    },
    {
      question: "Can I track my delivery in real-time?",
      answer:
        "Yes! All orders include real-time GPS tracking. You can follow your delivery on the Orders page.",
    },
    {
      question: "What if my delivery is delayed?",
      answer:
        "Contact our support team immediately. We offer compensation for significant delays and alternative solutions.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can open a support ticket here, call us at +233-XXX-XXX-XXXX, or email support@trustdrop.com",
    },
  ];

  const getStatusBadge = (status: string) => {
    const baseClass = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "open":
        return `${baseClass} bg-red-500/20 text-red-300`;
      case "in_progress":
        return `${baseClass} bg-orange-500/20 text-orange-300`;
      case "resolved":
        return `${baseClass} bg-blue-500/20 text-blue-300`;
      case "closed":
        return `${baseClass} bg-green-500/20 text-green-300`;
      default:
        return `${baseClass} bg-gray-500/20 text-gray-300`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClass = "text-xs font-semibold";
    switch (priority) {
      case "high":
        return `${baseClass} text-red-400`;
      case "medium":
        return `${baseClass} text-orange-400`;
      case "low":
        return `${baseClass} text-green-400`;
      default:
        return `${baseClass} text-gray-400`;
    }
  };

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
              Support Center
            </h1>
            <p className="text-muted-foreground">
              Get help with your orders and account
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex gap-4 border-b border-white/10">
              <button
                onClick={() => setActiveTab("tickets")}
                className={`pb-4 px-4 font-medium transition-colors ${
                  activeTab === "tickets"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Support Tickets
              </button>
              <button
                onClick={() => setActiveTab("faq")}
                className={`pb-4 px-4 font-medium transition-colors ${
                  activeTab === "faq"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FAQ
              </button>
            </div>

            {/* Support Tickets */}
            {activeTab === "tickets" && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-foreground">
                    Your Support Tickets
                  </h2>
                  <button className="px-4 py-2 gradient-trust text-white rounded-lg text-sm font-medium hover:shadow-lg transition">
                    Create Ticket
                  </button>
                </div>

                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-mono text-sm text-primary">
                              {ticket.id}
                            </p>
                            <span className={getPriorityBadge(ticket.priority)}>
                              {ticket.priority.charAt(0).toUpperCase() +
                                ticket.priority.slice(1)}
                            </span>
                          </div>
                          <p className="font-medium text-foreground mb-2">
                            {ticket.subject}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Created: {ticket.date}
                          </p>
                        </div>
                        <span className={getStatusBadge(ticket.status)}>
                          {ticket.status
                            .replace("_", " ")
                            .charAt(0)
                            .toUpperCase() +
                            ticket.status.replace("_", " ").slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {activeTab === "faq" && (
              <div className="mt-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="p-4 bg-white/5 border border-white/10 rounded-lg group"
                    >
                      <summary className="cursor-pointer font-medium text-foreground flex justify-between items-center">
                        {faq.question}
                        <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Contact Us Directly
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="text-3xl mb-3">📞</div>
                <p className="text-muted-foreground text-sm mb-2">
                  Phone Support
                </p>
                <p className="font-medium text-foreground">+233-XXX-XXX-XXXX</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Mon-Fri, 9AM-6PM
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="text-3xl mb-3">📧</div>
                <p className="text-muted-foreground text-sm mb-2">
                  Email Support
                </p>
                <p className="font-medium text-foreground">
                  support@trustdrop.com
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Response within 24hrs
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="text-3xl mb-3">💬</div>
                <p className="text-muted-foreground text-sm mb-2">Live Chat</p>
                <p className="font-medium text-foreground">Available Now</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Click to open chat window
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
