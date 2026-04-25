import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { readDb, writeDb } from '@/lib/db';

export async function POST(request) {
  const admin = await getCurrentUser();
  if (!admin || !admin.is_admin) return NextResponse.json({ error: 'Tidak dibenarkan.' }, { status: 403 });

  const { email } = await request.json();
  const db = await readDb();
  const target = db.users.find((u) => u.email === email);

  if (!target) return NextResponse.json({ error: 'Pengguna tidak ditemui.' }, { status: 404 });

  target.payment_status = 'paid';
  await writeDb(db);

  return NextResponse.json({ message: `Bayaran untuk ${target.email} ditanda sebagai paid.` });
}
