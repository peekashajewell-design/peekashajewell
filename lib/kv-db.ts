import { kv } from '@vercel/kv';
import { Product, Order } from '@/types';

// Vercel KV Database operations
// This will work on Vercel with KV store configured
// For local development, it will gracefully fall back to in-memory storage

const PRODUCTS_KEY = 'peekasha:products';
const ORDERS_KEY = 'peekasha:orders';
const PRODUCT_ID_COUNTER = 'peekasha:product_id_counter';
const ORDER_ID_COUNTER = 'peekasha:order_id_counter';

// Check if we're running on Vercel with KV configured
const isKVAvailable = () => {
  return process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
};

// Sample products for initialization
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Engagement Ring',
    description: 'Stunning diamond ring perfect for engagements',
    price: 45000,
    category: 'rings',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070'],
    stock: 5,
    featured: true,
  },
  {
    id: '2',
    name: 'Gold Chain Necklace',
    description: 'Elegant gold chain necklace for special occasions',
    price: 32000,
    category: 'necklaces',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2187'],
    stock: 8,
    featured: true,
  },
  {
    id: '3',
    name: 'Pearl Drop Earrings',
    description: 'Beautiful pearl earrings with gold plating',
    price: 8500,
    category: 'earrings',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2187'],
    stock: 12,
    featured: false,
  },
  {
    id: '4',
    name: 'Silver Charm Bracelet',
    description: 'Delicate silver bracelet with heart charm',
    price: 6500,
    category: 'bracelets',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070'],
    stock: 15,
    featured: true,
  },
];

export const kvDB = {
  // Initialize database with sample products if empty
  initialize: async () => {
    if (!isKVAvailable()) return;

    try {
      const existingProducts = await kv.get<Product[]>(PRODUCTS_KEY);
      if (!existingProducts || existingProducts.length === 0) {
        await kv.set(PRODUCTS_KEY, sampleProducts);
        await kv.set(PRODUCT_ID_COUNTER, 5);
        await kv.set(ORDER_ID_COUNTER, 1);
        await kv.set(ORDERS_KEY, []);
      }
    } catch (error) {
      console.error('KV initialization error:', error);
    }
  },

  // Products operations
  products: {
    getAll: async (): Promise<Product[]> => {
      if (!isKVAvailable()) {
        return sampleProducts;
      }
      try {
        const products = await kv.get<Product[]>(PRODUCTS_KEY);
        return products || [];
      } catch (error) {
        console.error('KV get products error:', error);
        return sampleProducts;
      }
    },

    getById: async (id: string): Promise<Product | null> => {
      if (!isKVAvailable()) {
        return sampleProducts.find(p => p.id === id) || null;
      }
      try {
        const products = await kv.get<Product[]>(PRODUCTS_KEY);
        return products?.find(p => p.id === id) || null;
      } catch (error) {
        console.error('KV get product error:', error);
        return null;
      }
    },

    getByCategory: async (category: string): Promise<Product[]> => {
      const products = await kvDB.products.getAll();
      return products.filter(p => p.category === category);
    },

    getFeatured: async (limit?: number): Promise<Product[]> => {
      const products = await kvDB.products.getAll();
      const featured = products.filter(p => p.featured);
      return limit ? featured.slice(0, limit) : featured;
    },

    create: async (productData: Omit<Product, 'id'>): Promise<Product> => {
      if (!isKVAvailable()) {
        throw new Error('KV not available in local development');
      }
      try {
        const products = await kv.get<Product[]>(PRODUCTS_KEY) || [];
        const counter = await kv.get<number>(PRODUCT_ID_COUNTER) || 1;

        const newProduct: Product = {
          ...productData,
          id: String(counter),
        };

        products.push(newProduct);
        await kv.set(PRODUCTS_KEY, products);
        await kv.set(PRODUCT_ID_COUNTER, counter + 1);

        return newProduct;
      } catch (error) {
        console.error('KV create product error:', error);
        throw error;
      }
    },

    update: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
      if (!isKVAvailable()) {
        throw new Error('KV not available in local development');
      }
      try {
        const products = await kv.get<Product[]>(PRODUCTS_KEY) || [];
        const index = products.findIndex(p => p.id === id);

        if (index === -1) return null;

        products[index] = { ...products[index], ...updates };
        await kv.set(PRODUCTS_KEY, products);

        return products[index];
      } catch (error) {
        console.error('KV update product error:', error);
        throw error;
      }
    },

    delete: async (id: string): Promise<boolean> => {
      if (!isKVAvailable()) {
        throw new Error('KV not available in local development');
      }
      try {
        const products = await kv.get<Product[]>(PRODUCTS_KEY) || [];
        const filtered = products.filter(p => p.id !== id);

        if (filtered.length === products.length) return false;

        await kv.set(PRODUCTS_KEY, filtered);
        return true;
      } catch (error) {
        console.error('KV delete product error:', error);
        throw error;
      }
    },
  },

  // Orders operations
  orders: {
    getAll: async (): Promise<Order[]> => {
      if (!isKVAvailable()) {
        return [];
      }
      try {
        const orders = await kv.get<Order[]>(ORDERS_KEY);
        return orders || [];
      } catch (error) {
        console.error('KV get orders error:', error);
        return [];
      }
    },

    getById: async (id: string): Promise<Order | null> => {
      if (!isKVAvailable()) {
        return null;
      }
      try {
        const orders = await kv.get<Order[]>(ORDERS_KEY);
        return orders?.find(o => o.id === id) || null;
      } catch (error) {
        console.error('KV get order error:', error);
        return null;
      }
    },

    create: async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
      if (!isKVAvailable()) {
        throw new Error('KV not available in local development');
      }
      try {
        const orders = await kv.get<Order[]>(ORDERS_KEY) || [];
        const counter = await kv.get<number>(ORDER_ID_COUNTER) || 1;

        const newOrder: Order = {
          ...orderData,
          id: String(counter),
          createdAt: new Date().toISOString(),
        };

        orders.push(newOrder);
        await kv.set(ORDERS_KEY, orders);
        await kv.set(ORDER_ID_COUNTER, counter + 1);

        return newOrder;
      } catch (error) {
        console.error('KV create order error:', error);
        throw error;
      }
    },
  },
};

// Initialize on module load (only in production with KV)
if (isKVAvailable()) {
  kvDB.initialize().catch(console.error);
}
