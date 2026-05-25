// src/components/Header.jsx
export default function Header({ page, onNav }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-row">
          <div className="logo-icon">🚌</div>
          <div>
            <span className="logo-name">SHIFT<em>PH</em></span>
            <span className="logo-sub">METRO MANILA COMMUTER TRACKER</span>
          </div>
        </div>
        <nav className="nav">
          {["home", "report", "about"].map(p => (
            <button
              key={p}
              className={`nav-btn ${page === p ? "active" : ""}`}
              onClick={() => onNav(p)}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
