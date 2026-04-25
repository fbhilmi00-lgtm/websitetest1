import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import AdminPanel from '@/components/AdminPanel';
import { getCurrentUser } from '@/lib/auth';
import { readDb } from '@/lib/db';

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) redirect('/auth');
  if (!user.is_admin) redirect('/dashboard');

  const db = await readDb();

  return (
    <main>
      <Header user={user} />
      <section className="container" style={{ paddingBottom: '2rem' }}>
        <h1>Panel Admin</h1>
        <p className="small">Semak pengguna, sahkan bayaran, dan aktifkan langganan secara manual.</p>
        <AdminPanel users={db.users} />
      </section>
    </main>
  );
}
