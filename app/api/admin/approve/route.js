import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { generateUserId, readDb, writeDb } from '@/lib/db';

export async function POST(request) {
  const admin = await getCurrentUser();
  if (!admin || !admin.is_admin) return NextResponse.json({ error: 'Tidak dibenarkan.' }, { status: 403 });

  const { email } = await request.json();
  const db = await readDb();
  const target = db.users.find((u) => u.email === email);

  if (!target) return NextResponse.json({ error: 'Pengguna tidak ditemui.' }, { status: 404 });

  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 30);

  target.subscription_status = 'active';
  target.payment_status = 'paid';
  target.subscription_expiry = expiry.toISOString();
  if (!target.user_id) target.user_id = generateUserId();

  await writeDb(db);
  return NextResponse.json({ message: `Langganan ${target.email} aktif sehingga ${expiry.toLocaleDateString('ms-MY')}.` });
}
