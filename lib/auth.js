import { cookies } from 'next/headers';
import { readDb } from '@/lib/db';

const COOKIE_NAME = 'belajar_session';

export function setSessionCookie(response, email) {
  response.cookies.set(COOKIE_NAME, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  });
}

export function clearSessionCookie(response) {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/'
  });
}

export async function getCurrentUser() {
  const email = cookies().get(COOKIE_NAME)?.value;

  if (!email) return null;

  const db = await readDb();
  return db.users.find((user) => user.email === email) || null;
}
