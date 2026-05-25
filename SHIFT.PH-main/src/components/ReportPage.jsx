// src/components/ReportPage.jsx
import { useState } from "react";

const CROWD_LEVELS = [
  { val: "1", label: "EMPTY",      desc: "No one around",          color: "#15803d" },
  { val: "2", label: "LIGHT",      desc: "Plenty of seats",        color: "#4d7c0f" },
  { val: "3", label: "MODERATE",   desc: "Getting there",          color: "#d97706" },
  { val: "4", label: "CROWDED",    desc: "Tight squeeze",          color: "#b91c1c" },
  { val: "5", label: "PACKED",     desc: "Can't board!",           color: "#7f1d1d" },
];

const REPORT_TYPES = ["CROWD LEVEL", "DELAY", "ROUTE CHANGE", "SAFETY CONCERN"];

export default function ReportPage({ routes }) {
  const [selectedRoute,  setSelectedRoute]  = useState("");
  const [selectedLevel,  setSelectedLevel]  = useState("3");
  const [reportType,     setReportType]     = useState("CROWD LEVEL");
  const [comment,        setComment]        = useState("");
  const [submitted,      setSubmitted]      = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRoute) { alert("SELECT A ROUTE FIRST!"); return; }

    try {
      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          routeId: selectedRoute,
          reportType,
          crowdLevel: selectedLevel,
          comment,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Unable to submit report");
      }

      setSubmitted(true);
      setComment("");
      setSelectedRoute("");
      setSelectedLevel("3");
      setTimeout(() => setSubmitted(false), 3500);
    } catch (error) {
      alert("Report failed: " + error.message);
    }
  };

  return (
    <>
      {/* ── Report Form ── */}
      <div className="panel">
        <div className="panel-title">📢 SUBMIT A CROWD REPORT</div>
        <p className="report-subtext">
          HELP FELLOW STUDENTS BY SHARING REAL-TIME CONDITIONS ON YOUR ROUTE.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Step 1 — Route */}
          <div className="report-step">
            <div className="step-label">STEP 1 — SELECT ROUTE</div>
            <select
              className="pixel-select"
              style={{ width: "100%" }}
              value={selectedRoute}
              onChange={e => setSelectedRoute(e.target.value)}
              required
            >
              <option value="">-- CHOOSE A ROUTE --</option>
              {routes.map(r => (
                <option key={r.routeId} value={r.routeId}>{r.routeName}</option>
              ))}
            </select>
          </div>

          {/* Step 2 — Report Type */}
          <div className="report-step">
            <div className="step-label">STEP 2 — REPORT TYPE</div>
            <div className="type-grid">
              {REPORT_TYPES.map(t => (
                <button
                  key={t}
                  type="button"
                  className={`type-btn ${reportType === t ? "type-active" : ""}`}
                  onClick={() => setReportType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 — Crowd Level (only show for crowd type) */}
          {reportType === "CROWD LEVEL" && (
            <div className="report-step">
              <div className="step-label">STEP 3 — CROWD LEVEL</div>
              <div className="level-grid">
                {CROWD_LEVELS.map(l => (
                  <button
                    key={l.val}
                    type="button"
                    className={`level-btn ${selectedLevel === l.val ? "active" : ""}`}
                    style={selectedLevel === l.val ? {
                      borderColor:  l.color,
                      color:        l.color,
                      background:   l.color + "18",
                      borderTop:    `3px solid #000`,
                      borderLeft:   `3px solid #000`,
                      borderBottom: `2px solid ${l.color}`,
                      borderRight:  `2px solid ${l.color}`,
                    } : { color: l.color }}
                    onClick={() => setSelectedLevel(l.val)}
                  >
                    <span className="level-num">{l.val}</span>
                    <span className="level-name">{l.label}</span>
                    <span className="level-desc">{l.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 — Notes */}
          <div className="report-step">
            <div className="step-label">
              {reportType === "CROWD LEVEL" ? "STEP 4" : "STEP 3"} — ADDITIONAL NOTES
              <span className="optional-tag">(OPTIONAL)</span>
            </div>
            <textarea
              className="pixel-textarea"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="e.g. MRT doors stuck at North Ave, very slow boarding today..."
              rows={4}
            />
          </div>

          <button className="find-btn" type="submit">
            [ SUBMIT REPORT ]
          </button>
        </form>

        {submitted && (
          <div className="success-box">
            ✓ REPORT SUBMITTED! THANKS FOR HELPING YOUR FELLOW COMMUTERS!
          </div>
        )}
      </div>

      {/* ── Route Stats Panel ── */}
      <div className="panel">
        <div className="panel-title">📊 ROUTE STATISTICS</div>
        <div className="route-stats-list">
          {routes.map((r, i) => (
            <div key={r.routeId} className="route-stat-row">
              <div className="rs-rank">#{i + 1}</div>
              <div className="rs-info">
                <div className="rs-name">{r.routeName}</div>
                <div className="rs-meta">
                  {r.originCity} → {r.destinationCity}
                </div>
              </div>
              <div className="rs-pills">
                <span className="rs-pill">⏱ {r.estimatedMinutes}MIN</span>
                <span className="rs-pill">₱{r.totalFare}</span>
                <span className="rs-pill">{r.segments.length} LEG{r.segments.length !== 1 ? "S" : ""}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
