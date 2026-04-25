import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { readDb, writeDb } from '@/lib/db';

export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Sila log masuk dahulu.' }, { status: 401 });

  const { proof } = await request.json();
  if (!proof) return NextResponse.json({ error: 'Sila isi bukti bayaran.' }, { status: 400 });

  const db = await readDb();
  const target = db.users.find((u) => u.email === user.email);
  if (!target) return NextResponse.json({ error: 'Pengguna tidak ditemui.' }, { status: 404 });

  target.proof_of_payment = proof;
  target.subscription_status = 'pending';
  target.payment_status = 'pending_review';

  await writeDb(db);
  return NextResponse.json({ message: 'Bukti bayaran dihantar. Menunggu pengesahan admin.' });
}
