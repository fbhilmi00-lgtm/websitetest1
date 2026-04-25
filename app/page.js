import Link from 'next/link';
import Header from '@/components/Header';
import { getCurrentUser } from '@/lib/auth';

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <main>
      <Header user={user} />
      <section className="container hero">
        <div>
          <h1>Belajar kemahiran baru dengan pelan langganan mampu milik.</h1>
          <p className="small">
            BelajarPro membantu anda belajar secara konsisten melalui modul video, nota ringkas,
            latihan praktikal, dan komuniti sokongan.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <Link className="btn btn-primary" href={user ? '/dashboard' : '/auth'}>
              Subscribe Now
            </Link>
            <Link className="btn btn-muted" href="/auth">
              Daftar Akaun
            </Link>
          </div>
        </div>
        <div className="card pricing">
          <h2>Pelan Bulanan</h2>
          <p style={{ fontSize: '2rem', fontWeight: 800, margin: '0.25rem 0' }}>RM15/bulan</p>
          <p className="small">Akses penuh modul pembelajaran selepas bayaran disahkan.</p>
          <ul>
            <li>Akses modul premium</li>
            <li>Kemaskini kandungan setiap minggu</li>
            <li>Sesuai untuk pelajar & pekerja</li>
          </ul>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: '2rem' }}>
        <h2>Kelebihan BelajarPro</h2>
        <div className="grid-3">
          <article className="card">
            <h3>Belajar ikut masa anda</h3>
            <p className="small">Boleh diakses melalui telefon, tablet, atau laptop pada bila-bila masa.</p>
          </article>
          <article className="card">
            <h3>Modul tersusun</h3>
            <p className="small">Topik bermula daripada asas sehingga tahap praktikal.</p>
          </article>
          <article className="card">
            <h3>Harga rendah</h3>
            <p className="small">Hanya RM15 sebulan untuk semua modul dalam satu platform.</p>
          </article>
        </div>
      </section>
      <p className="footer-note">© {new Date().getFullYear()} BelajarPro. Dibina untuk pembelajaran berterusan.</p>
    </main>
  );
}
