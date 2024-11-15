export interface Student {
  id: string;
  name: string;
  course: string;
  totalFees: number;
  paidAmount: number;
  lastPaymentDate: string;
  status: 'fully_paid' | 'partially_paid' | 'unpaid';
  email: string;
  phone: string;
}

export type PaymentStatus = 'all' | 'fully_paid' | 'partially_paid' | 'unpaid';