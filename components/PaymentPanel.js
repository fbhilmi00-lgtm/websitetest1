'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPanel({ user }) {
  const [proof, setProof] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function startSubscription() {
    setLoading(true);
    const res = await fetch('/api/subscription/subscribe', { method: 'POST' });
    const data = await res.json();
    setLoading(false);
    setMessage(data.message || data.error);
    router.refresh();
  }

  async function submitProof(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/subscription/submit-proof', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ proof })
    });
    const data = await res.json();
    setLoading(false);
    setMessage(data.message || data.error);
    if (res.ok) {
      setProof('');
      router.refresh();
    }
  }

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <h3>Aktifkan Langganan RM15/Bulan</h3>
      <p className="small">
        1) Klik butang <strong>Mula Langganan</strong>. 2) Buat bank transfer ke akaun demo:
        <br />
        <strong>Bank:</strong> Maybank | <strong>No Akaun:</strong> 123456789012 | <strong>Nama:</strong> BelajarPro PLT
        <br />
        Atau WhatsApp bukti bayaran ke: <strong>+60 12-888 9999</strong>
      </p>

      <button type="button" className="btn btn-primary" onClick={startSubscription} disabled={loading}>
        Mula Langganan
      </button>

      {(user.subscription_status === 'pending' || user.payment_status !== 'paid') && (
        <form className="form" onSubmit={submitProof} style={{ marginTop: '1rem' }}>
          <label>
            Bukti Bayaran (placeholder)
            <textarea
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              placeholder="Contoh: Resit transfer pada 25/04/2026, rujukan TXN12345"
              required
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            Hantar Bukti Bayaran
          </button>
        </form>
      )}

      {message && <p className="small" style={{ marginTop: '0.8rem' }}>{message}</p>}
    </div>
  );
}
