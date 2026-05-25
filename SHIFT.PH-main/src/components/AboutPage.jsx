const TEAM = [
  ["Gabrielle Masirag, Gian Cahila, Juhan Crisostomo","Backend & DB"],
  ["Kurt Flores,Jansen Tangzo","Frontend"],
  ["Kurt Flores","UI/UX"],
  ["Gian Cahila,Juhan Crisostomo","Data Analyst"],
];

export default function AboutPage() {
  return (
    <div className="panel">
      <div className="panel-title">[ ABOUT SHIFT PH ]</div>

      <div className="about-grid">
        <div className="about-block">
          <h3>THE PROBLEM</h3>
          <p>Metro Manila students spend 3-4 hours daily commuting with no reliable data on crowd levels, delays, or fastest routes.</p>
        </div>
        <div className="about-block">
          <h3>OUR SOLUTION</h3>
          <p>Real-time crowd reports from students + optimized routes by time and fare — so every commute is an informed one.</p>
        </div>
      </div>

      <p className="section-label">SDG ALIGNMENT</p>
      <div className="sdg-row">
        <div className="sdg-block" style={{ borderTop: "3px solid #c8960a" }}>
          <span className="sdg-num" style={{ color: "#c8960a" }}>SDG 11</span>
          <h4>SUSTAINABLE CITIES</h4>
          <p>Optimizing student navigation through Metro Manila's complex transit network for inclusive urban mobility.</p>
        </div>
        <div className="sdg-block" style={{ borderTop: "3px solid #4a7c2f" }}>
          <span className="sdg-num" style={{ color: "#4a7c2f" }}>SDG 12</span>
          <h4>RESPONSIBLE USE</h4>
          <p>Shared crowd-sourced data reduces unnecessary fuel waste and reliance on private vehicles.</p>
        </div>
      </div>

      <p className="section-label">TECH STACK</p>
      <div className="stack-tags">
        {["React.js", "Express.js", "Node.js", "MySQL"].map(t => (
          <span key={t} className="stack-tag">{t}</span>
        ))}
      </div>

      <p className="section-label">THE TEAM</p>
      <div className="team-grid">
        {TEAM.map(([name, role]) => (
          <div key={name} className="team-card">
            <div className="avatar">{name.split(" ").map(n => n[0]).join("")}</div>
            <p className="team-name">{name}</p>
            <p className="team-role">{role}</p>
          </div>
        ))}
      </div>

      <p className="school-note">NATIONAL UNIVERSITY MANILA · ADVANCED DATABASE SYSTEMS · 2025</p>
    </div>
  );
}
