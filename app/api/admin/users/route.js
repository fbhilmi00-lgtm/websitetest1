import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { readDb } from '@/lib/db';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !user.is_admin) return NextResponse.json({ error: 'Tidak dibenarkan.' }, { status: 403 });

  const db = await readDb();
  return NextResponse.json({ users: db.users });
}
