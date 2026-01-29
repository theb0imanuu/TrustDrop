
export enum OrderStatus {
  PENDING = 'Pending',
  DISPATCHED = 'Dispatched',
  DELIVERED = 'Delivered',
}

export class Order {
  id: number;
  customerPhoneNumber: string;
  releaseCode: string;
  status: OrderStatus;
}
