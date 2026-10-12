import { useState } from 'react';
import { getSessions } from '../services/api.js';

export default function Sessions() {
  const [studentId, setStudentId] = useState('');
  const [computerId, setComputerId] = useState('');
  const [status, setStatus] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  async function search(e) {
    e.preventDefault();
    setError('');
    const params = new URLSearchParams();
    if (studentId) params.set('student_id', studentId);
    if (computerId) params.set('computer_id', computerId);
    if (status) params.set('status', status);
    try {
      const response = await getSessions(`?${params.toString()}`);
      setRows(response.data?.items ?? response.items ?? []);
    } catch {
      setError('Backend unavailable. Start FastAPI to search session history.');
    }
  }

  return (
    <>
      <h1 className="h2 page-title">Session history</h1>
      <p className="text-secondary">Search recorded logon and logoff sessions.</p>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <form className="row g-2 mb-3" onSubmit={search}>
            <div className="col-md-4"><input className="form-control" placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} /></div>
            <div className="col-md-4"><input className="form-control" placeholder="Computer ID" value={computerId} onChange={e => setComputerId(e.target.value)} /></div>
            <div className="col-md-2">
              <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="">All statuses</option><option value="active">Active</option><option value="ended">Ended</option><option value="interrupted">Interrupted</option>
              </select>
            </div>
            <div className="col-md-2"><button className="btn btn-primary w-100">Search</button></div>
          </form>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead><tr><th>Student ID</th><th>Computer</th><th>Login</th><th>Logout</th><th>Status</th></tr></thead>
              <tbody>
                {rows.length ? rows.map((s, i) => (
                  <tr key={s.id || s.session_id || i}>
                    <td>{s.student_id || '—'}</td><td>{s.computer_code || s.computer_id || '—'}</td>
                    <td>{s.login_at ? new Date(s.login_at).toLocaleString() : '—'}</td>
                    <td>{s.logout_at ? new Date(s.logout_at).toLocaleString() : '—'}</td>
                    <td><span className={`badge ${s.status === 'active' ? 'text-bg-success' : s.status === 'interrupted' ? 'text-bg-warning' : 'text-bg-secondary'}`}>{s.status || '—'}</span></td>
                  </tr>
                )) : <tr><td colSpan="5" className="text-secondary py-4 text-center">Search to load session history.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
