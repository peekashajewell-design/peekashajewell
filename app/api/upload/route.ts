import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

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

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check if Blob token is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN not configured');
      return NextResponse.json(
        { error: 'Image storage not configured. Please use image URL option instead.' },
        { status: 503 }
      );
    }

    console.log('Uploading file:', file.name, 'Size:', file.size);

    // Upload to Vercel Blob
    // Note: Store access level is configured in Vercel dashboard
    const blob = await put(file.name, file, {
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log('Upload successful:', blob.url);
    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error('Upload error:', error);
    console.error('Error details:', error.message, error.stack);
    return NextResponse.json(
      { error: `Failed to upload file: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}
