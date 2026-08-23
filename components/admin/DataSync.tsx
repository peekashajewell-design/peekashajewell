'use client';

import { useEffect } from 'react';
import { browserStorage } from '@/lib/storage';

// Component to sync localStorage data with API calls
export default function DataSync() {
  useEffect(() => {
    // Initialize storage on mount
    browserStorage.initialize();

    // Intercept fetch calls to use localStorage
    const originalFetch = window.fetch;

    window.fetch = async function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      const url = input.toString();

      // Products API
      if (url.includes('/api/products') && !url.includes('/api/products/')) {
        const method = init?.method || 'GET';

        if (method === 'GET') {
          const products = browserStorage.getProducts();

          // Handle query params
          const urlObj = new URL(url, window.location.origin);
          const category = urlObj.searchParams.get('category');
          const featured = urlObj.searchParams.get('featured');
          const limit = urlObj.searchParams.get('limit');

          let filtered = products;

          if (category) {
            filtered = filtered.filter(p => p.category === category);
          }

          if (featured === 'true') {
            filtered = filtered.filter(p => p.featured);
          }

          if (limit) {
            filtered = filtered.slice(0, parseInt(limit));
          }

          return new Response(JSON.stringify(filtered), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (method === 'POST') {
          const body = await new Response(init?.body).json();
          const products = browserStorage.getProducts();

          const newProduct = {
            ...body,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          };

          products.push(newProduct);
          browserStorage.saveProducts(products);

          return new Response(JSON.stringify(newProduct), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // Single product API
      if (url.match(/\/api\/products\/\d+$/)) {
        const method = init?.method || 'GET';
        const id = url.split('/').pop();
        const products = browserStorage.getProducts();

        if (method === 'GET') {
          const product = products.find(p => p.id === id);
          if (!product) {
            return new Response(JSON.stringify({ error: 'Not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          return new Response(JSON.stringify(product), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (method === 'PUT') {
          const body = await new Response(init?.body).json();
          const index = products.findIndex(p => p.id === id);

          if (index === -1) {
            return new Response(JSON.stringify({ error: 'Not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          products[index] = { ...products[index], ...body };
          browserStorage.saveProducts(products);

          return new Response(JSON.stringify(products[index]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (method === 'DELETE') {
          const filtered = products.filter(p => p.id !== id);
          browserStorage.saveProducts(filtered);

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // Orders API
      if (url.includes('/api/orders')) {
        const method = init?.method || 'GET';

        if (method === 'GET') {
          const orders = browserStorage.getOrders();
          return new Response(JSON.stringify(orders), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (method === 'POST') {
          const body = await new Response(init?.body).json();
          const orders = browserStorage.getOrders();

          const newOrder = {
            ...body,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: 'pending',
          };

          orders.push(newOrder);
          browserStorage.saveOrders(orders);

          // Generate WhatsApp URL
          const whatsappNumber = '918115331054';
          const itemsList = newOrder.items
            .map((item: any, idx: number) => `${idx + 1}. ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`)
            .join('%0A');

          const message = `*New Order Received!*%0A%0A` +
            `*Order ID:* ${newOrder.id}%0A` +
            `*Customer:* ${newOrder.customerName}%0A` +
            `*Phone:* ${newOrder.customerPhone}%0A` +
            `*Email:* ${newOrder.customerEmail}%0A` +
            `*Address:* ${newOrder.customerAddress}%0A%0A` +
            `*Items:*%0A${itemsList}%0A%0A` +
            `*Total Amount:* ₹${newOrder.total.toLocaleString()}%0A%0A` +
            `Please confirm this order.`;

          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

          return new Response(JSON.stringify({ order: newOrder, whatsappUrl }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // Default: call original fetch
      return originalFetch(input, init);
    };

    return () => {
      // Cleanup on unmount
      window.fetch = originalFetch;
    };
  }, []);

  return null; // This component doesn't render anything
}
