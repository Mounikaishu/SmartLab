import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="container-fluid app-shell">
      <div className="row">
        <aside className="col-md-3 col-lg-2 sidebar p-3">
          <div className="d-flex align-items-center gap-2 mb-4 mt-2">
            <span className="brand-mark">S</span>
            <div>
              <div className="fw-bold">SmartLab</div>
              <div className="small text-white-50">Admin console</div>
            </div>
          </div>
          <div className="text-uppercase small text-white-50 px-2 mb-2">Workspace</div>
          <nav className="d-grid gap-1">
            <NavLink to="/" end>▦ &nbsp; Overview</NavLink>
            <NavLink to="/computers">▣ &nbsp; Computers</NavLink>
            <NavLink to="/sessions">◷ &nbsp; Session history</NavLink>
          </nav>
          <div className="small text-white-50 mt-5 px-2">Prototype UI · connect authorized admin authentication before deployment</div>
        </aside>
        <main className="col-md-9 col-lg-10 p-4 p-lg-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
