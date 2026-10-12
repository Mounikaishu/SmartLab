export default function StatCard({ label, value, note, icon }) {
  return (
    <div className="card stat-card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="muted-small">{label}</div>
            <div className="display-6 fw-semibold mt-2">{value ?? '—'}</div>
            {note && <div className="muted-small mt-2">{note}</div>}
          </div>
          <span className="fs-4" aria-hidden="true">{icon}</span>
        </div>
      </div>
    </div>
  );
}
