import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    // Upload to Vercel Blob
    // We append the timestamp to ensure uniqueness, though Blob handles some of this
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    
    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
  }
}

