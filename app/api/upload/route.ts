import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

    // If we have a Vercel Blob token, use cloud storage
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(filename, file, {
        access: 'public',
      });
      return NextResponse.json({ url: blob.url }, { status: 201 });
    }

    // Local Fallback (for development)
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    await fs.writeFile(path.join(uploadDir, filename), buffer);
    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
  }
}


