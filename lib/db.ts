import { Product, Order } from '@/types';

// IMPORTANT: For Vercel deployment, data is stored in browser localStorage
// This means data persists across page refreshes but is stored client-side
// For production with server-side persistence, consider:
// - Vercel KV (Redis)
// - Vercel Postgres
// - MongoDB Atlas
// - Supabase

// Initialize with sample data
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

// Server-side memory storage (will reset on deployment/restart)
// Used as fallback when localStorage is not available
let products: Product[] = [...SAMPLE_PRODUCTS];
let orders: Order[] = [];

export const db = {
  products: {
    getAll: async (): Promise<Product[]> => {
      return products;
    },

    getById: async (id: string): Promise<Product | undefined> => {
      return products.find(p => p.id === id);
    },

    getByCategory: async (category: string): Promise<Product[]> => {
      return products.filter(p => p.category === category);
    },

    getFeatured: async (limit?: number): Promise<Product[]> => {
      const featured = products.filter(p => p.featured);
      return limit ? featured.slice(0, limit) : featured;
    },

    create: async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      products.push(newProduct);
      return newProduct;
    },

    update: async (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return undefined;

      products[index] = { ...products[index], ...updates };
      return products[index];
    },

    delete: async (id: string): Promise<boolean> => {
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return false;

      products.splice(index, 1);
      return true;
    },
  },

  orders: {
    getAll: async (): Promise<Order[]> => {
      return orders;
    },

    getById: async (id: string): Promise<Order | undefined> => {
      return orders.find(o => o.id === id);
    },

    create: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
      const newOrder: Order = {
        ...order,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      orders.push(newOrder);
      return newOrder;
    },

    updateStatus: async (id: string, status: Order['status']): Promise<Order | undefined> => {
      const index = orders.findIndex(o => o.id === id);
      if (index === -1) return undefined;

      orders[index].status = status;
      return orders[index];
    },
  },
};
