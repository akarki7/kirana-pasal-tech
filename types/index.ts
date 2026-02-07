// Product Types
export interface Product {
  id: string;
  name: string;
  nameNepali: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  barcode?: string;
  minStock: number;
  maxStock: number;
  supplier?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Order Types
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'esewa' | 'khalti' | 'fonepay' | 'connectips' | 'credit';
  paymentStatus: 'pending' | 'completed' | 'failed';
  customerName?: string;
  customerPhone?: string;
  createdAt: string;
  completedAt?: string;
}

// Inventory Alert Types
export interface InventoryAlert {
  id: string;
  productId: string;
  productName: string;
  currentStock: number;
  minStock: number;
  severity: 'low' | 'critical' | 'out';
  createdAt: string;
}

// AI Prediction Types
export interface SalesPrediction {
  productId: string;
  productName: string;
  predictedDemand: number;
  currentStock: number;
  recommendedOrder: number;
  confidence: number;
  reasoning: string[];
}

// Analytics Types
export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: Array<{
    productId: string;
    productName: string;
    quantity: number;
    revenue: number;
  }>;
  revenueByPaymentMethod: Record<string, number>;
  dailySales: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

// WhatsApp Message Types
export interface WhatsAppMessage {
  to: string;
  message: string;
  type: 'order_confirmation' | 'payment_reminder' | 'stock_alert' | 'reorder_suggestion';
  sentAt: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  phone: string;
  credit: number;
  totalPurchases: number;
  lastPurchase?: string;
  createdAt: string;
}
