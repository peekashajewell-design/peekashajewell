import { NextRequest, NextResponse } from 'next/server';

// Client-side sync endpoint for localStorage
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { products } = body;

    // In a real app, you'd save to a database here
    // For now, we just acknowledge the sync

    return NextResponse.json({
      success: true,
      message: 'Data synced to client storage',
      count: products?.length || 0
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Sync failed' },
      { status: 500 }
    );
  }
}

// Get all products from client
export async function GET(request: NextRequest) {
  try {
    // Return empty array - client will send their data
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch' },
      { status: 500 }
    );
  }
}
