import { useEffect, useState } from 'react';
import { getComputers } from '../services/api.js';

export default function Computers() {
  const [computers, setComputers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getComputers()
      .then(r => setComputers(r.data?.items ?? r.items ?? []))
      .catch(() => setError('Backend unavailable. Start FastAPI to load computer inventory.'));
  }, []);

  const filtered = computers.filter(c =>
    `${c.computer_code || ''} ${c.hostname || ''} ${c.lab_location || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="h2 page-title">Computer inventory</h1>
      <p className="text-secondary">Registered lab computers and last reported status.</p>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <div className="mb-3">
            <input className="form-control" placeholder="Search computer ID, hostname, or lab..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead><tr><th>Computer ID</th><th>Hostname</th><th>Lab</th><th>Status</th><th>Last seen</th></tr></thead>
              <tbody>
                {filtered.length ? filtered.map((c, i) => (
                  <tr key={c.id || c.computer_code || i}>
                    <td className="fw-semibold">{c.computer_code || '—'}</td>
                    <td>{c.hostname || '—'}</td>
                    <td>{c.lab_location || '—'}</td>
                    <td><span className={`badge ${c.status === 'online' ? 'text-bg-success' : 'text-bg-secondary'}`}>{c.status || 'unknown'}</span></td>
                    <td>{c.last_seen_at ? new Date(c.last_seen_at).toLocaleString() : '—'}</td>
                  </tr>
                )) : <tr><td colSpan="5" className="text-secondary py-4 text-center">No computer records returned yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
