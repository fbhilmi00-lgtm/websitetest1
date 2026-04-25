import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import PaymentPanel from '@/components/PaymentPanel';
import { getCurrentUser } from '@/lib/auth';

const learningModules = [
  { title: 'Modul 1: Asas Pembelajaran Efektif', duration: '35 minit' },
  { title: 'Modul 2: Teknik Ulangkaji Pintar', duration: '50 minit' },
  { title: 'Modul 3: Projek Praktikal Mini', duration: '60 minit' }
];

function getStatusClass(status) {
  if (status === 'active') return 'status status-active';
  if (status === 'pending') return 'status status-pending';
  return 'status status-inactive';
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth');
  }

  const isActive = user.subscription_status === 'active' && new Date(user.subscription_expiry) > new Date();

  return (
    <main>
      <Header user={user} />
      <section className="container" style={{ paddingBottom: '2rem' }}>
        <h1>Dashboard Pembelajaran</h1>
        <div className="card" style={{ marginBottom: '1rem' }}>
          <h3>Maklumat Akaun</h3>
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID Pengguna:</strong> {user.user_id || 'Akan dijana selepas bayaran disahkan'}</p>
          <p>
            <strong>Status Langganan:</strong>{' '}
            <span className={getStatusClass(user.subscription_status)}>
              {isActive ? 'Aktif' : user.subscription_status === 'pending' ? 'Menunggu Pengesahan' : 'Tidak Aktif'}
            </span>
          </p>
          <p>
            <strong>Status Bayaran:</strong>{' '}
            {user.payment_status === 'paid' ? 'Dibayar' : user.payment_status === 'pending_review' ? 'Sedang disemak admin' : 'Belum dibayar'}
          </p>
          <p><strong>Tarikh Tamat:</strong> {user.subscription_expiry ? new Date(user.subscription_expiry).toLocaleDateString('ms-MY') : '-'}</p>
        </div>

        {!isActive && <PaymentPanel user={user} />}

        <div className="card">
          <h3>Modul Pembelajaran</h3>
          {learningModules.map((module) => (
            <div key={module.title} className={!isActive ? 'module-lock' : ''} style={{ marginBottom: '0.8rem' }}>
              <strong>{module.title}</strong>
              <p className="small" style={{ margin: '0.2rem 0 0' }}>
                Tempoh: {module.duration} {!isActive ? '• Terkunci (aktifkan langganan untuk akses)' : '• Akses dibuka'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
