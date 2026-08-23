'use client';

import { Order } from '@/types';
import { FiExternalLink } from 'react-icons/fi';
import { sendOrderToWhatsApp } from '@/lib/whatsapp';

interface OrderListProps {
  orders: Order[];
  onRefresh: () => void;
}

export default function OrderList({ orders, onRefresh }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No orders yet.</p>
      </div>
    );
  }

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedOrders.map((order) => (
        <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">Order #{order.id}</h3>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : order.status === 'confirmed'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Customer Details</p>
              <p className="font-medium">{order.customerName}</p>
              <p className="text-sm text-gray-600">{order.customerPhone}</p>
              <p className="text-sm text-gray-600">{order.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Address</p>
              <p className="text-sm text-gray-600">{order.customerAddress}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Order Items</p>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <span className="font-bold text-lg">Total: ₹{order.total.toLocaleString()}</span>
            <a
              href={sendOrderToWhatsApp(order)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <span>Contact on WhatsApp</span>
              <FiExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
