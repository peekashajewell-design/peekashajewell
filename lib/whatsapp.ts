import { Order } from '@/types';

export function sendOrderToWhatsApp(order: Order) {
  const whatsappNumber = process.env.WHATSAPP_NUMBER || '918115331054';

  // Format order details
  const itemsList = order.items
    .map((item, idx) => `${idx + 1}. ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`)
    .join('%0A');

  const message = `*New Order Received!*%0A%0A` +
    `*Order ID:* ${order.id}%0A` +
    `*Customer:* ${order.customerName}%0A` +
    `*Phone:* ${order.customerPhone}%0A` +
    `*Email:* ${order.customerEmail}%0A` +
    `*Address:* ${order.customerAddress}%0A%0A` +
    `*Items:*%0A${itemsList}%0A%0A` +
    `*Total Amount:* ₹${order.total.toLocaleString()}%0A%0A` +
    `Please confirm this order.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return whatsappUrl;
}

export function generateCustomerWhatsAppLink(order: Order) {
  const whatsappNumber = process.env.WHATSAPP_NUMBER || '918115331054';

  const message = `Hi, I would like to place this order:%0A%0A` +
    `*Order ID:* ${order.id}%0A` +
    `*Total Amount:* ₹${order.total.toLocaleString()}`;

  return `https://wa.me/${whatsappNumber}?text=${message}`;
}
