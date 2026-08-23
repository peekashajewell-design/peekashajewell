// Browser-side persistent storage using localStorage
import { Product, Order } from '@/types';

const STORAGE_KEYS = {
  PRODUCTS: 'peekasha_products',
  ORDERS: 'peekasha_orders',
};

// Sample products for initial setup
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Elegant Diamond Ring',
    description: 'A stunning diamond ring perfect for special occasions. Features a brilliant cut diamond set in 18K gold.',
    price: 45000,
    category: 'rings',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070'],
    stock: 5,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Pearl Necklace Set',
    description: 'Exquisite pearl necklace with matching earrings. Perfect for weddings and formal events.',
    price: 32000,
    category: 'necklaces',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2187'],
    stock: 3,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Gold Drop Earrings',
    description: 'Beautiful 22K gold drop earrings with intricate design. Lightweight and comfortable.',
    price: 18000,
    category: 'earrings',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2187'],
    stock: 8,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Silver Bracelet',
    description: 'Elegant sterling silver bracelet with delicate chain design.',
    price: 12000,
    category: 'bracelets',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070'],
    stock: 10,
    featured: false,
    createdAt: new Date().toISOString(),
  },
];

export const browserStorage = {
  // Initialize storage with sample data if empty
  initialize: () => {
    if (typeof window === 'undefined') return;

    const existingProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!existingProducts) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SAMPLE_PRODUCTS));
    }

    const existingOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!existingOrders) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
    }
  },

  // Products
  getProducts: (): Product[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  saveProducts: (products: Product[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  // Orders
  getOrders: (): Order[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  saveOrders: (orders: Order[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },
};

// Initialize on import
if (typeof window !== 'undefined') {
  browserStorage.initialize();
}
