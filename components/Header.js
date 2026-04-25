import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function Header({ user }) {
  return (
    <header className="container">
      <nav className="nav">
        <Link className="brand" href="/">
          BelajarPro
        </Link>
        <div className="nav-links">
          <Link href="/">Laman Utama</Link>
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              {user.is_admin && <Link href="/admin">Admin</Link>}
              <LogoutButton />
            </>
          ) : (
            <Link className="btn btn-primary" href="/auth">
              Daftar / Log Masuk
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
