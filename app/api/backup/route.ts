import { NextRequest, NextResponse } from 'next/server';
import { kvDB } from '@/lib/kv-db';

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

    // Get all products and orders
    const products = await kvDB.products.getAll();
    const orders = await kvDB.orders.getAll();

    // Create backup data
    const backup = {
      timestamp: new Date().toISOString(),
      products,
      orders,
      totalProducts: products.length,
      totalOrders: orders.length,
    };

    return NextResponse.json(backup);
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { error: 'Failed to create backup' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.APP_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const backup = await request.json();

    // Restore products
    if (backup.products && Array.isArray(backup.products)) {
      for (const product of backup.products) {
        // Remove id and createdAt as they will be regenerated
        const { id, createdAt, ...productData } = product;
        await kvDB.products.create(productData);
      }
    }

    return NextResponse.json({
      success: true,
      restoredProducts: backup.products?.length || 0,
    });
  } catch (error) {
    console.error('Restore error:', error);
    return NextResponse.json(
      { error: 'Failed to restore backup' },
      { status: 500 }
    );
  }
}
