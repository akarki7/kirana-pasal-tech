import { Product, Order, Customer, InventoryAlert } from '@/types';

// Storage keys
const STORAGE_KEYS = {
  PRODUCTS: 'kirana_products',
  ORDERS: 'kirana_orders',
  CUSTOMERS: 'kirana_customers',
  ALERTS: 'kirana_alerts',
};

// Initialize with sample data
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Rice (Basmati)',
    nameNepali: 'चामल (बासमती)',
    category: 'Grains',
    price: 150,
    stock: 50,
    unit: 'kg',
    barcode: '8901234567890',
    minStock: 20,
    maxStock: 100,
    supplier: 'ABC Suppliers',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Lentils (Dal)',
    nameNepali: 'दाल',
    category: 'Grains',
    price: 120,
    stock: 15,
    unit: 'kg',
    minStock: 20,
    maxStock: 80,
    supplier: 'XYZ Trading',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Cooking Oil',
    nameNepali: 'खाना पकाउने तेल',
    category: 'Oils',
    price: 250,
    stock: 30,
    unit: 'liter',
    barcode: '8901234567891',
    minStock: 15,
    maxStock: 60,
    supplier: 'ABC Suppliers',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Sugar',
    nameNepali: 'चिनी',
    category: 'Groceries',
    price: 80,
    stock: 45,
    unit: 'kg',
    minStock: 25,
    maxStock: 100,
    supplier: 'Sugar Mills Ltd',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Tea Leaves',
    nameNepali: 'चिया पत्ती',
    category: 'Beverages',
    price: 200,
    stock: 8,
    unit: 'kg',
    minStock: 10,
    maxStock: 40,
    supplier: 'Tea Estate',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Salt',
    nameNepali: 'नुन',
    category: 'Groceries',
    price: 30,
    stock: 60,
    unit: 'kg',
    minStock: 20,
    maxStock: 100,
    supplier: 'ABC Suppliers',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Wheat Flour',
    nameNepali: 'गहुँको पिठो',
    category: 'Grains',
    price: 60,
    stock: 35,
    unit: 'kg',
    minStock: 30,
    maxStock: 120,
    supplier: 'Flour Mills',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Milk (Packet)',
    nameNepali: 'दूध (प्याकेट)',
    category: 'Dairy',
    price: 70,
    stock: 20,
    unit: 'liter',
    minStock: 15,
    maxStock: 50,
    supplier: 'Dairy Co-op',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper functions
export const storage = {
  // Products
  getProducts: (): Product[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!data) {
      storage.setProducts(SAMPLE_PRODUCTS);
      return SAMPLE_PRODUCTS;
    }
    return JSON.parse(data);
  },

  setProducts: (products: Product[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  addProduct: (product: Product): void => {
    const products = storage.getProducts();
    products.push(product);
    storage.setProducts(products);
  },

  updateProduct: (id: string, updates: Partial<Product>): void => {
    const products = storage.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
      storage.setProducts(products);
    }
  },

  deleteProduct: (id: string): void => {
    const products = storage.getProducts();
    storage.setProducts(products.filter(p => p.id !== id));
  },

  // Orders
  getOrders: (): Order[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  setOrders: (orders: Order[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  addOrder: (order: Order): void => {
    const orders = storage.getOrders();
    orders.unshift(order); // Add to beginning
    storage.setOrders(orders);
  },

  // Customers
  getCustomers: (): Customer[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return data ? JSON.parse(data) : [];
  },

  setCustomers: (customers: Customer[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  },

  addCustomer: (customer: Customer): void => {
    const customers = storage.getCustomers();
    customers.push(customer);
    storage.setCustomers(customers);
  },

  updateCustomer: (id: string, updates: Partial<Customer>): void => {
    const customers = storage.getCustomers();
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
      customers[index] = { ...customers[index], ...updates };
      storage.setCustomers(customers);
    }
  },

  // Inventory Alerts
  getAlerts: (): InventoryAlert[] => {
    if (typeof window === 'undefined') return [];
    const products = storage.getProducts();
    const alerts: InventoryAlert[] = [];

    products.forEach(product => {
      if (product.stock === 0) {
        alerts.push({
          id: `alert-${product.id}`,
          productId: product.id,
          productName: product.name,
          currentStock: product.stock,
          minStock: product.minStock,
          severity: 'out',
          createdAt: new Date().toISOString(),
        });
      } else if (product.stock <= product.minStock * 0.5) {
        alerts.push({
          id: `alert-${product.id}`,
          productId: product.id,
          productName: product.name,
          currentStock: product.stock,
          minStock: product.minStock,
          severity: 'critical',
          createdAt: new Date().toISOString(),
        });
      } else if (product.stock <= product.minStock) {
        alerts.push({
          id: `alert-${product.id}`,
          productId: product.id,
          productName: product.name,
          currentStock: product.stock,
          minStock: product.minStock,
          severity: 'low',
          createdAt: new Date().toISOString(),
        });
      }
    });

    return alerts;
  },

  // Clear all data
  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};
