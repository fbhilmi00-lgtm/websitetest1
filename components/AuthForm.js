'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const emptyState = { name: '', email: '', phone: '', password: '' };

export default function AuthForm() {
  const [mode, setMode] = useState('register');
  const [form, setForm] = useState(emptyState);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const endpoint = mode === 'register' ? '/api/register' : '/api/login';
    const body = mode === 'register' ? form : { email: form.email, password: form.password };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.error || 'Ralat berlaku.');
      return;
    }

    setMessage(data.message || 'Berjaya.');
    setForm(emptyState);
    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.9rem' }}>
        <button className={`btn ${mode === 'register' ? 'btn-primary' : 'btn-muted'}`} onClick={() => setMode('register')} type="button">
          Daftar
        </button>
        <button className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-muted'}`} onClick={() => setMode('login')} type="button">
          Log Masuk
        </button>
      </div>

      <form onSubmit={onSubmit} className="form">
        {mode === 'register' && (
          <>
            <label>
              Nama
              <input name="name" value={form.name} onChange={onChange} required />
            </label>
            <label>
              Nombor Telefon
              <input name="phone" value={form.phone} onChange={onChange} required />
            </label>
          </>
        )}

        <label>
          Emel
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </label>
        <label>
          Kata Laluan
          <input type="password" name="password" value={form.password} onChange={onChange} required />
        </label>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Sedang proses...' : mode === 'register' ? 'Daftar Akaun' : 'Masuk'}
        </button>
      </form>
      {message && <p className="small" style={{ marginTop: '0.75rem' }}>{message}</p>}
    </div>
  );
}
