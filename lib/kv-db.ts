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
  const hasKV = (
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
    (process.env.UPSTASH_REDIS_REST_KV_REST_API_URL && process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN) ||
    (process.env.UPSTASH_REDIS_REST_KV_URL && process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN)
  );
  console.log('[KV] isKVAvailable check:', hasKV);
  console.log('[KV] Env vars present:', {
    KV_REST_API_URL: !!process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
    UPSTASH_REDIS_REST_KV_REST_API_URL: !!process.env.UPSTASH_REDIS_REST_KV_REST_API_URL,
    UPSTASH_REDIS_REST_KV_REST_API_TOKEN: !!process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
  });
  return hasKV;
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
  },
];

export const kvDB = {
  // Initialize database with sample products ONLY if database has never been set up
  initialize: async () => {
    if (!isKVAvailable()) return;

    try {
      // Check if database has been initialized (look for counter, not products array)
      const counter = await kv.get<number>(PRODUCT_ID_COUNTER);

      // Only initialize if counter doesn't exist (first time setup)
      if (counter === null || counter === undefined) {
        await kv.set(PRODUCTS_KEY, sampleProducts);
        await kv.set(PRODUCT_ID_COUNTER, 5);
        await kv.set(ORDER_ID_COUNTER, 1);
        await kv.set(ORDERS_KEY, []);
        console.log('Database initialized with sample data');
      }
    } catch (error) {
      console.error('KV initialization error:', error);
    }
  },

  // Products operations
  products: {
    getAll: async (): Promise<Product[]> => {
      if (!isKVAvailable()) {
        console.log('[KV] NOT AVAILABLE - returning sample products');
        return sampleProducts;
      }
      try {
        console.log('[KV] Fetching all products from key:', PRODUCTS_KEY);
        const products = await kv.get<Product[]>(PRODUCTS_KEY);
        console.log('[KV] Products fetched:', products ? products.length : 0, 'items');
        return products || [];
      } catch (error) {
        console.error('[KV] Get products error:', error);
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

    create: async (productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
      if (!isKVAvailable()) {
        throw new Error('KV not available in local development');
      }
      try {
        console.log('[KV] CREATE - Fetching current products');
        const products = await kv.get<Product[]>(PRODUCTS_KEY) || [];
        console.log('[KV] CREATE - Current products count:', products.length);

        const counter = await kv.get<number>(PRODUCT_ID_COUNTER) || 1;
        console.log('[KV] CREATE - Next ID counter:', counter);

        const newProduct: Product = {
          ...productData,
          id: String(counter),
          createdAt: new Date().toISOString(),
        };
        console.log('[KV] CREATE - New product:', newProduct.id, newProduct.name);

        products.push(newProduct);
        console.log('[KV] CREATE - Setting products array with', products.length, 'items');
        await kv.set(PRODUCTS_KEY, products);

        console.log('[KV] CREATE - Incrementing counter to', counter + 1);
        await kv.set(PRODUCT_ID_COUNTER, counter + 1);

        console.log('[KV] CREATE - Successfully created product:', newProduct.id);
        return newProduct;
      } catch (error) {
        console.error('[KV] CREATE error:', error);
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
        console.log('[KV] DELETE - Fetching products to delete ID:', id);
        const products = await kv.get<Product[]>(PRODUCTS_KEY) || [];
        console.log('[KV] DELETE - Current products count:', products.length);
        console.log('[KV] DELETE - Current product IDs:', products.map(p => p.id));

        const filtered = products.filter(p => p.id !== id);
        console.log('[KV] DELETE - After filter count:', filtered.length);

        if (filtered.length === products.length) {
          console.log('[KV] DELETE - Product not found, returning false');
          return false;
        }

        console.log('[KV] DELETE - Setting filtered products back to KV');
        await kv.set(PRODUCTS_KEY, filtered);
        console.log('[KV] DELETE - Successfully deleted product:', id);
        return true;
      } catch (error) {
        console.error('[KV] DELETE error:', error);
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
