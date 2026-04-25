import { NextResponse } from 'next/server';
import { readDb } from '@/lib/db';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan kata laluan diperlukan.' }, { status: 400 });
  }

  const db = await readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    return NextResponse.json({ error: 'Maklumat log masuk tidak sah.' }, { status: 401 });
  }

  const res = NextResponse.json({ message: 'Log masuk berjaya.' });
  setSessionCookie(res, user.email);
  return res;
}
