import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { readDb, writeDb } from '@/lib/db';

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Sila log masuk dahulu.' }, { status: 401 });

  const db = await readDb();
  const target = db.users.find((u) => u.email === user.email);
  if (!target) return NextResponse.json({ error: 'Pengguna tidak ditemui.' }, { status: 404 });

  target.subscription_status = 'pending';
  if (target.payment_status === 'unpaid') {
    target.payment_status = 'pending_review';
  }

  await writeDb(db);
  return NextResponse.json({ message: 'Langganan dimulakan. Sila hantar bukti bayaran.' });
}
