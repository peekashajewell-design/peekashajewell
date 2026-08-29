import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

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

    // Check environment variables
    const envCheck = {
      KV_REST_API_URL: !!process.env.KV_REST_API_URL,
      KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
      UPSTASH_REDIS_REST_KV_REST_API_URL: !!process.env.UPSTASH_REDIS_REST_KV_REST_API_URL,
      UPSTASH_REDIS_REST_KV_REST_API_TOKEN: !!process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
      UPSTASH_REDIS_REST_KV_URL: !!process.env.UPSTASH_REDIS_REST_KV_URL,
    };

    // Try to read from KV
    let kvTest = { success: false, error: null as any, data: null as any };
    try {
      const testData = await kv.get('peekasha:products');
      kvTest = { success: true, error: null, data: testData };
    } catch (error: any) {
      kvTest = { success: false, error: error.message, data: null };
    }

    return NextResponse.json({
      envCheck,
      kvTest,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
