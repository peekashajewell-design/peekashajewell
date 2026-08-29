import { NextRequest, NextResponse } from 'next/server';
import { kvDB } from '@/lib/kv-db';
import { sendOrderToWhatsApp } from '@/lib/whatsapp';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.APP_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orders = await kvDB.orders.getAll();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const order = await kvDB.orders.create({
      ...body,
      status: 'pending',
    });

    // Generate WhatsApp link for admin notification
    const whatsappUrl = sendOrderToWhatsApp(order);

    return NextResponse.json({
      order,
      whatsappUrl,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
