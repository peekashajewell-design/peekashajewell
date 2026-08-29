import { NextRequest, NextResponse } from 'next/server';
import { kvDB } from '@/lib/kv-db';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await kvDB.products.getById(params.id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.APP_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const product = await kvDB.products.update(params.id, body);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('=== API DELETE ROUTE CALLED ===');
    console.log('Params received:', JSON.stringify(params));
    console.log('Product ID to delete:', params.id);
    console.log('ID type:', typeof params.id);

    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.APP_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

    console.log('Auth check - Has header:', !!authHeader, 'Has password:', !!adminPassword);
    console.log('Auth header value:', authHeader);
    console.log('Expected password prefix:', adminPassword?.substring(0, 10) + '...');

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      console.log('❌ Auth failed');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('✅ Auth passed - calling kvDB.products.delete');
    console.log('About to delete product ID:', params.id);

    const success = await kvDB.products.delete(params.id);

    console.log('Delete operation completed. Success:', success);
    console.log('=== API DELETE ROUTE ENDING ===');

    if (!success) {
      console.log('⚠️ Product not found, returning 404');
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    console.log('✅ Returning success response');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Delete error (exception):', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
