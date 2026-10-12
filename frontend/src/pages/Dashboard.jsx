import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard.jsx';
import { getActiveSessions, getOverview } from '../services/api.js';

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getOverview(), getActiveSessions()])
      .then(([o, s]) => {
        setOverview(o.data ?? o);
        setSessions(s.data?.items ?? s.items ?? []);
      })
      .catch(() => setError('Backend unavailable. Start FastAPI to load live data.'));
  }, []);

  const stats = overview || {};
  return (
    <>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <div className="muted-small mb-1">LAB OPERATIONS</div>
          <h1 className="h2 page-title">Dashboard overview</h1>
          <p className="text-secondary mb-0">Computer availability and current student sessions.</p>
        </div>
        <span className="badge text-bg-light border p-2">SmartLab · Prototype</span>
      </div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-4"><StatCard label="Total computers" value={stats.total_computers ?? '—'} icon="▣" /></div>
        <div className="col-6 col-xl-4"><StatCard label="Online" value={stats.online_computers ?? '—'} icon="●" /></div>
        <div className="col-6 col-xl-4"><StatCard label="Offline" value={stats.offline_computers ?? '—'} icon="○" /></div>
        <div className="col-6 col-xl-4"><StatCard label="Occupied" value={stats.occupied_computers ?? '—'} icon="▤" /></div>
        <div className="col-6 col-xl-4"><StatCard label="Active sessions" value={stats.active_sessions ?? sessions.length} icon="◷" /></div>
        <div className="col-6 col-xl-4"><StatCard label="Interrupted" value={stats.interrupted_sessions ?? '—'} icon="!" /></div>
      </div>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Active sessions</h2>
            <span className="muted-small">Latest backend response</span>
          </div>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead><tr><th>Student</th><th>Computer</th><th>Login time</th><th>Status</th></tr></thead>
              <tbody>
                {sessions.length ? sessions.map((s, i) => (
                  <tr key={s.id || s.session_id || i}>
                    <td>{s.student_id || s.student || '—'}</td>
                    <td>{s.computer_code || s.computer_id || '—'}</td>
                    <td>{s.login_at ? new Date(s.login_at).toLocaleString() : '—'}</td>
                    <td><span className="badge text-bg-success">{s.status || 'active'}</span></td>
                  </tr>
                )) : <tr><td colSpan="4" className="text-secondary py-4 text-center">No active sessions returned yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
