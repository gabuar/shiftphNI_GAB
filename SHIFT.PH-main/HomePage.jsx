

import { useState, useEffect, useRef } from "react";

const ORIGINS     = ["Quezon City", "Cavite, Bacoor City"];
const DESTINATION = "National University Sampaloc";


const CROWD_COLOR = {
  "Empty":        "#22c55e",
  "Light":        "#84cc16",
  "Moderate":     "#f59e0b",
  "Crowded":      "#ef4444",
  "Very Crowded": "#991b1b",
  "No Data":      "#94a3b8",
};
const CROWD_BG = {
  "Empty":        "#052e16",
  "Light":        "#1a2e05",
  "Moderate":     "#2d1f00",
  "Crowded":      "#2d0707",
  "Very Crowded": "#1a0000",
  "No Data":      "#1e1e1e",
};


function fmtTime(m) {
  if (m < 60) return `${m} MIN`;
  return `${Math.floor(m / 60)}H ${m % 60}M`;
}


function timeToMins(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}


function minsToTimeStr(totalMins) {
  const clamped = ((totalMins % 1440) + 1440) % 1440;
  const h24 = Math.floor(clamped / 60);
  const m   = clamped % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12  = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}


const MODE_ICON = {
  "Tricycle":  "🛺",
  "PITX Bus":  "🚌",
  "Cubao Bus": "🚌",
  "Bus":       "🚌",
  "LRT-1":     "🚇",
  "LRT-2":     "🚇",
  "MRT-3":     "🚇",
  "Jeepney":   "🚐",
  "Walk":      "🚶",
};



function RouteMap({ route }) {
  const mapRef    = useRef(null);
  const mapObjRef = useRef(null);

  useEffect(() => {
    if (!route || !mapRef.current) return;


    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id   = "leaflet-css";
      link.rel  = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = () => {
      const L = window.L;
      if (!L) return;


      if (mapObjRef.current) {
        mapObjRef.current.remove();
        mapObjRef.current = null;
      }

      const map = L.map(mapRef.current, {
        center: route.mapCenter || [14.5995, 120.9842],
        zoom:   route.mapZoom   || 13,
        zoomControl: true,
        attributionControl: false,
      });

  
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 }
      ).addTo(map);


      route.segments.forEach((seg, idx) => {
        if (!seg.coords || seg.coords.length < 2) return;

   
        L.polyline(seg.coords, {
          color:   seg.lineColor,
          weight:  5,
          opacity: 0.9,
        }).addTo(map);

  
        const startIcon = L.divIcon({
          html: `<div style="width:12px;height:12px;background:${seg.lineColor};border:2px solid #fff;image-rendering:pixelated;"></div>`,
          className: "",
          iconSize:   [12, 12],
          iconAnchor: [6, 6],
        });
        L.marker(seg.coords[0], { icon: startIcon })
          .addTo(map)
          .bindPopup(
            `<b style="font-family:monospace;font-size:11px">
              ${MODE_ICON[seg.transportName] || "🚏"} ${seg.boardingPoint}
            </b><br/>
            <span style="font-size:10px;color:${seg.lineColor}">${seg.transportName}</span>`
          );


        if (idx === route.segments.length - 1) {
          const endIcon = L.divIcon({
            html: `<div style="width:14px;height:14px;background:#f4c430;border:2px solid #000;image-rendering:pixelated;"></div>`,
            className: "",
            iconSize:   [14, 14],
            iconAnchor: [7, 7],
          });
          L.marker(seg.coords[seg.coords.length - 1], { icon: endIcon })
            .addTo(map)
            .bindPopup(`<b style="font-family:monospace;font-size:11px">📍 NU Manila Campus</b>`);
        }
      });

      mapObjRef.current = map;
    };

    if (window.L) {
      initMap();
    } else {
      const script   = document.createElement("script");
      script.src     = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload  = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapObjRef.current) {
        mapObjRef.current.remove();
        mapObjRef.current = null;
      }
    };
  }, [route]);

  return (
    <div className="map-wrapper">
      <div className="map-pixel-border">
        <div ref={mapRef} className="leaflet-map" />
      </div>


      <div className="map-legend">
        {route.segments.map((seg, i) => (
          <div key={i} className="legend-row">
            <div className="legend-dot" style={{ background: seg.lineColor }} />
            <span className="legend-mode" style={{ color: seg.lineColor }}>
              {MODE_ICON[seg.transportName] || ""} {seg.transportName}
            </span>
            <span className="legend-stops">
              {seg.boardingPoint} → {seg.alightingPoint}
            </span>
          </div>
        ))}
        <div className="legend-row">
          <div className="legend-dot" style={{ background: "#f4c430" }} />
          <span className="legend-mode" style={{ color: "#f4c430" }}>🏫 DESTINATION</span>
          <span className="legend-stops">NU Manila, Sampaloc</span>
        </div>
      </div>
    </div>
  );
}

function SearchForm({ onSearch, loading }) {
  const [from,        setFrom]        = useState("");
  const [arrivalTime, setArrivalTime] = useState("07:00");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from) { alert("Please select your origin city!"); return; }
    onSearch(from, DESTINATION, arrivalTime);
  };

  return (
    <div className="panel">
      <div className="panel-title">⚔ ROUTE FINDER</div>

      <form onSubmit={handleSubmit}>

        <div className="search-row">
          <div className="field">
            <label className="field-label">▸ WHERE ARE YOU FROM?</label>
            <select
              className="pixel-select"
              value={from}
              onChange={e => setFrom(e.target.value)}
              required
            >
              <option value="">-- SELECT CITY --</option>
              {ORIGINS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="arrow-col">
            <span className="dest-arrow">▶</span>
          </div>

          <div className="field">
            <label className="field-label">▸ DESTINATION</label>
            <input
              type="text"
              className="pixel-select"
              value={DESTINATION}
              disabled
            />
          </div>
        </div>

        <div className="time-row">
          <div className="time-label-group">
            <span className="field-label">⏰ WHAT TIME IS YOUR CLASS?</span>
            <span className="time-hint">
              WE'LL TELL YOU EXACTLY WHEN TO LEAVE
            </span>
          </div>
          <input
            type="time"
            className="pixel-select time-input"
            value={arrivalTime}
            onChange={e => setArrivalTime(e.target.value)}
            required
          />
        </div>

        <button className="find-btn" type="submit" disabled={loading}>
          {loading ? "[ CALCULATING... ]" : "[ FIND BEST ROUTES ]"}
        </button>
      </form>
    </div>
  );
}


function RouteCard({ route, rank, arrivalTime, onViewMap }) {
  const [showSteps, setShowSteps] = useState(false);

  const cc            = CROWD_COLOR[route.crowdLabel] || "#94a3b8";
  const arrivalMins   = timeToMins(arrivalTime || "07:00");
  const departureMins = arrivalMins - route.estimatedMinutes;

  return (
    <div className={`route-card ${rank === 0 ? "best" : ""}`}>


      {rank === 0 && (
        <div className="fastest-tag">⚡ FASTEST ROUTE</div>
      )}
      {route.note && (
        <div className="route-note">ℹ {route.note}</div>
      )}

      <div className="rc-name">{route.routeName}</div>
      <div className="rc-modes">
        {route.segments.map((s, i) => (
          <span key={i}>
            {MODE_ICON[s.transportName] || ""} {s.transportName}
            {i < route.segments.length - 1 ? " → " : ""}
          </span>
        ))}
      </div>


      <div className="time-banner">
        <div className="time-block">
          <span className="time-block-label">⏱ LEAVE BY</span>
          <span className="time-block-val depart">
            {minsToTimeStr(departureMins)}
          </span>
        </div>
        <div className="time-arrow">━━▶</div>
        <div className="time-block">
          <span className="time-block-label">🏫 CLASS AT</span>
          <span className="time-block-val arrive">
            {minsToTimeStr(arrivalMins)}
          </span>
        </div>
      </div>


      <div className="stat-bar">
        <div className="stat-box">
          <span className="stat-lbl">TRAVEL</span>
          <span className="stat-val">{fmtTime(route.estimatedMinutes)}</span>
        </div>
        <div className="stat-box">
          <span className="stat-lbl">FARE</span>
          <span className="stat-val">₱{route.totalFare}</span>
        </div>
        <div className="stat-box">
          <span className="stat-lbl">TRANSFERS</span>
          <span className="stat-val">{route.transferCount}x</span>
        </div>
        <div className="stat-box">
          <span className="stat-lbl">CROWD</span>
          <span className="stat-val" style={{ color: cc, fontSize: "7px" }}>
            {(route.crowdLabel || "N/A").toUpperCase()}
          </span>
        </div>
      </div>


      <button
        className="steps-toggle"
        onClick={() => setShowSteps(!showSteps)}
      >
        {showSteps ? "▲ HIDE STEPS" : "▼ SHOW STEP-BY-STEP"}
      </button>

      {showSteps && (
        <div className="steps-list">
          {route.segments.map((seg, i) => (
            <div key={i} className="step-row">
        
              <div className="step-bar" style={{ background: seg.lineColor }} />
              <div className="step-body">
                <div className="step-mode" style={{ color: seg.lineColor }}>
                  {MODE_ICON[seg.transportName] || ""} {seg.transportName}
                </div>
                <div className="step-points">
                  <span className="step-board">Board at {seg.boardingPoint}</span>
                  <span className="step-arrow"> → </span>
                  <span className="step-alight">Get off at {seg.alightingPoint}</span>
                </div>
                <div className="step-meta">
                  {fmtTime(seg.durationMinutes)}
                  {seg.fare > 0 ? ` · ₱${seg.fare}` : " · Free"}
                </div>
                {seg.note && (
                  <div className="step-note">ℹ {seg.note}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="map-btn" onClick={() => onViewMap(route)}>
        🗺 VIEW ON MAP
      </button>
    </div>
  );
}


function CrowdPanel({ crowdData }) {
  const list = Array.isArray(crowdData) ? crowdData : [];

  return (
    <div className="panel">
      <div className="section-bar">
        <div className="panel-title" style={{ border: "none", margin: 0, padding: 0 }}>
          📡 LIVE CROWD STATUS
        </div>
        <span className="live-pill">■ LIVE</span>
      </div>

      {list.length === 0 ? (
        <div className="empty-state">
          NO LIVE CROWD DATA AVAILABLE.
          <p className="empty-hint">CHECK YOUR SERVER OR DATABASE CONNECTION.</p>
        </div>
      ) : list.map(d => {
        const cc  = CROWD_COLOR[d.crowd_label || d.crowdLabel] || "#94a3b8";
        const cbg = CROWD_BG[d.crowd_label || d.crowdLabel]    || "#1e1e1e";
        return (
          <div key={d.route_id || d.routeId} className="crowd-row">
            <div className="crowd-dot" style={{ background: cc }} />
            <span className="crowd-name">{d.route_name || d.routeName}</span>
            <span
              className="crowd-badge"
              style={{ color: cc, background: cbg, borderColor: cc }}
            >
              {(d.crowd_label || d.crowdLabel || "No Data").toUpperCase()}
            </span>
          </div>
        );
      })}
    </div>
  );
}


export default function HomePage({
  onSearch, loading, results,
  searched, onReset, arrivalTime,
  crowdData
}) {
  const [mapRoute, setMapRoute] = useState(null);

  return (
    <>
      <SearchForm onSearch={onSearch} loading={loading} />


      {loading && (
        <div className="loading-state">
          <div className="spinner" />
          CALCULATING BEST ROUTES...
        </div>
      )}


      {!loading && searched && results.length === 0 && (
        <div className="panel">
          <div className="empty-state">
            NO ROUTES FOUND.
            <p className="empty-hint">TRY A DIFFERENT ORIGIN CITY.</p>
          </div>
        </div>
      )}


      {!loading && searched && results.length > 0 && (
        <div className="panel">
          <div className="results-header">
            <div className="results-title">
              ⚔ {results.length} ROUTE{results.length !== 1 ? "S" : ""} FOUND
            </div>
            <button
              className="back-btn"
              onClick={() => { onReset(); setMapRoute(null); }}
            >
              ← NEW SEARCH
            </button>
          </div>

          {results.map((r, i) => (
            <RouteCard
              key={r.routeId}
              route={r}
              rank={i}
              arrivalTime={arrivalTime}
              onViewMap={setMapRoute}
            />
          ))}
        </div>
      )}


      {mapRoute && (
        <div className="panel">
          <div className="section-bar">
            <div
              className="panel-title"
              style={{ border: "none", margin: 0, padding: 0 }}
            >
              🗺 {mapRoute.routeName}
            </div>
            <button className="back-btn" onClick={() => setMapRoute(null)}>
              ✕ CLOSE MAP
            </button>
          </div>
          <RouteMap route={mapRoute} />
        </div>
      )}


      {!searched && <CrowdPanel crowdData={crowdData} />}
    </>
  );
}