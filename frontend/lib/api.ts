import { Order } from "./types";

const API_BASE_URL = "http://localhost:8000/api";

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(`${API_BASE_URL}/dispatch/`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await response.json();
  return data.map((order: any) => ({
    id: order.id.toString(),
    recipient: order.customer_name,
    location: order.location,
    status: order.status,
    amount: order.amount.toString(),
    time: new Date(order.created_at).toLocaleTimeString(),
  }));
}
