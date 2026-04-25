import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request) {
  const body = await request.json();
  const { name, email, phone, password } = body;

  if (!name || !email || !phone || !password) {
    return NextResponse.json({ error: 'Semua medan wajib diisi.' }, { status: 400 });
  }

  const db = await readDb();

  if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return NextResponse.json({ error: 'Emel sudah digunakan.' }, { status: 409 });
  }

  const newUser = {
    user_id: '',
    name,
    email,
    phone,
    password,
    subscription_status: 'inactive',
    subscription_expiry: '',
    payment_status: 'unpaid',
    is_admin: false,
    proof_of_payment: ''
  };

  db.users.push(newUser);
  await writeDb(db);

  const res = NextResponse.json({ message: 'Pendaftaran berjaya.' });
  setSessionCookie(res, email);
  return res;
}
