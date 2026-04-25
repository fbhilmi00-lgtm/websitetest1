'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel({ users }) {
  const [message, setMessage] = useState('');
  const [loadingEmail, setLoadingEmail] = useState('');
  const router = useRouter();

  async function runAction(endpoint, email) {
    setLoadingEmail(email);
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setMessage(data.message || data.error);
    setLoadingEmail('');
    router.refresh();
  }

  return (
    <div className="card">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>ID</th>
              <th>Status Langganan</th>
              <th>Status Bayaran</th>
              <th>Bukti Bayaran</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.user_id || '-'}</td>
                <td>{user.subscription_status}</td>
                <td>{user.payment_status}</td>
                <td style={{ maxWidth: 260 }}>{user.proof_of_payment || '-'}</td>
                <td>
                  {!user.is_admin && (
                    <div style={{ display: 'grid', gap: '0.4rem' }}>
                      <button className="btn btn-muted" type="button" onClick={() => runAction('/api/admin/mark-paid', user.email)} disabled={loadingEmail === user.email}>
                        Tanda Paid
                      </button>
                      <button className="btn btn-muted" type="button" onClick={() => runAction('/api/admin/generate-id', user.email)} disabled={loadingEmail === user.email}>
                        Jana ID
                      </button>
                      <button className="btn btn-primary" type="button" onClick={() => runAction('/api/admin/approve', user.email)} disabled={loadingEmail === user.email}>
                        Aktif 30 Hari
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {message && <p className="small" style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
