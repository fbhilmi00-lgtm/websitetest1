import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import { getCurrentUser } from '@/lib/auth';

export default async function AuthPage() {
  const user = await getCurrentUser();

  return (
    <main>
      <Header user={user} />
      <section className="container" style={{ padding: '1rem 0 2rem' }}>
        <div className="card" style={{ maxWidth: 560, margin: '0 auto' }}>
          <h1>Daftar / Log Masuk</h1>
          <p className="small">Isi maklumat anda untuk mula melanggan BelajarPro.</p>
          <AuthForm />
        </div>
      </section>
    </main>
  );
}
