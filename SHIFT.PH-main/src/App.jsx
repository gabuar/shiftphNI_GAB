import { useState, useEffect } from "react";
import Header     from "./components/Header";
import HomePage   from "./components/HomePage";
import ReportPage from "./components/ReportPage";
import AboutPage  from "./components/AboutPage";
import "./App.css";


export const MOCK_ROUTES = [

  // ── QUEZON CITY ROUTES ──────────────────────────────────────

  {
    routeId: "qc-route-a",
    routeName: "QC Option A — Tricycle + PITX Bus",
    originCity: "Quezon City",
    destinationCity: "National University Sampaloc",
    estimatedMinutes: 95,
    totalFare: 160,
    transferCount: 2,
    transportModes: "Tricycle → PITX Bus → Walk",
    crowdLabel: "Moderate",
    isRecommended: true,
    mapCenter: [14.5995, 120.9842],
    mapZoom: 12,
    segments: [
      {
        segmentOrder: 1,
        boardingPoint: "Sitio Veterans",
        alightingPoint: "Sandiganbayan",
        durationMinutes: 10,
        fare: 20,
        transportName: "Tricycle",
        lineColor: "#f59e0b",
        note: "Tricycle from Sitio Veterans to Sandiganbayan",
        coords: [
          [14.6650, 121.0680],
          [14.6580, 121.0590],
        ],
      },
      {
        segmentOrder: 2,
        boardingPoint: "Sandiganbayan Bus Stop",
        alightingPoint: "UST Bus Stop",
        durationMinutes: 75,
        fare: 140,
        transportName: "PITX Bus",
        lineColor: "#2563eb",
        note: "PITX Bus — travel time is 1-2 hrs depending on traffic",
        coords: [
          [14.6580, 121.0590],
          [14.6400, 121.0300],
          [14.6200, 121.0100],
          [14.6060, 120.9890],
          [14.6099, 120.9893],
        ],
      },
      {
        segmentOrder: 3,
        boardingPoint: "UST",
        alightingPoint: "NU Manila Campus",
        durationMinutes: 5,
        fare: 0,
        transportName: "Walk",
        lineColor: "#16a34a",
        note: "5-minute walk from UST to NU Manila",
        coords: [
          [14.6099, 120.9893],
          [14.6041, 120.9923],
        ],
      },
    ],
  },

  {
    routeId: "qc-route-b",
    routeName: "QC Option B — Tricycle + Cubao Bus + LRT-2",
    originCity: "Quezon City",
    destinationCity: "National University Sampaloc",
    estimatedMinutes: 67,
    totalFare: 75,
    transferCount: 3,
    transportModes: "Tricycle → Bus → LRT-2 → Walk",
    crowdLabel: "Light",
    isRecommended: false,
    note: "Use this if PITX bus is not available",
    mapCenter: [14.6300, 121.0200],
    mapZoom: 13,
    segments: [
      {
        segmentOrder: 1,
        boardingPoint: "Sitio Veterans",
        alightingPoint: "Sandiganbayan",
        durationMinutes: 10,
        fare: 20,
        transportName: "Tricycle",
        lineColor: "#f59e0b",
        note: "Tricycle from Sitio Veterans to Sandiganbayan",
        coords: [
          [14.6650, 121.0680],
          [14.6580, 121.0590],
        ],
      },
      {
        segmentOrder: 2,
        boardingPoint: "Sandiganbayan",
        alightingPoint: "Cubao Station",
        durationMinutes: 30,
        fare: 15,
        transportName: "Cubao Bus",
        lineColor: "#7c3aed",
        note: "Bus to Cubao — 20 to 40 mins depending on traffic",
        coords: [
          [14.6580, 121.0590],
          [14.6497, 121.0482],
          [14.6335, 121.0300],
        ],
      },
      {
        segmentOrder: 3,
        boardingPoint: "Cubao Station (LRT-2)",
        alightingPoint: "Legarda Station",
        durationMinutes: 17,
        fare: 30,
        transportName: "LRT-2",
        lineColor: "#7c3aed",
        note: "LRT-2 towards Recto, drop off at Legarda Station (15-20 mins)",
        coords: [
          [14.6335, 121.0300],
          [14.6178, 120.9882],
          [14.6130, 120.9860],
        ],
      },
      {
        segmentOrder: 4,
        boardingPoint: "Legarda Station",
        alightingPoint: "NU Manila Campus",
        durationMinutes: 10,
        fare: 0,
        transportName: "Walk",
        lineColor: "#16a34a",
        note: "10-minute walk from Legarda Station to NU Manila",
        coords: [
          [14.6130, 120.9860],
          [14.6041, 120.9923],
        ],
      },
    ],
  },

  // ── BACOOR / CAVITE ROUTES ───────────────────────────────────

  {
    routeId: "cavite-route-a",
    routeName: "Bacoor Option A — PITX Bus → UST → Walk",
    originCity: "Cavite, Bacoor City",
    destinationCity: "National University Sampaloc",
    estimatedMinutes: 90,
    totalFare: 90,
    transferCount: 1,
    transportModes: "PITX Bus → Walk",
    crowdLabel: "Crowded",
    isRecommended: true,
    note: "Most direct route. Best when traffic on Roxas Blvd / Taft is light.",
    mapCenter: [14.5200, 120.9870],
    mapZoom: 11,
    segments: [
      {
        segmentOrder: 1,
        boardingPoint: "SM Bacoor Terminal",
        alightingPoint: "España / UST Bus Stop",
        durationMinutes: 85,
        fare: 90,
        transportName: "PITX Bus",
        lineColor: "#2563eb",
        note: "PITX Bus direct from Bacoor via Coastal Rd → Roxas Blvd → Taft → España. Alight at UST / España stop.",
        coords: [
          [14.4694, 120.9768], [14.4500, 120.9780], [14.4720, 120.9830], [14.5010, 120.9877], [14.5132, 120.9941],
          [14.5350, 120.9830], [14.5500, 120.9850], [14.5700, 120.9900], [14.5876, 120.9930], [14.6010, 120.9870],
          [14.6099, 120.9893],
        ],
      },
      {
        segmentOrder: 2,
        boardingPoint: "UST / España",
        alightingPoint: "NU Manila Campus",
        durationMinutes: 5,
        fare: 0,
        transportName: "Walk",
        lineColor: "#16a34a",
        note: "5-minute walk south along España Blvd to NU Manila.",
        coords: [
          [14.6099, 120.9893],
          [14.6041, 120.9923],
        ],
      },
    ],
  },

  {
    routeId: "cavite-route-b",
    routeName: "Bacoor Option B — Bus → Lawton → Jeep → UST → Walk",
    originCity: "Cavite, Bacoor City",
    destinationCity: "National University Sampaloc",
    estimatedMinutes: 110,
    totalFare: 75,
    transferCount: 2,
    transportModes: "Bus → Jeepney → Walk",
    crowdLabel: "Moderate",
    isRecommended: false,
    note: "If PITX bus is full or you're from Cavite City proper. Alight at Lawton, ride jeep to España.",
    mapCenter: [14.5500, 120.9860],
    mapZoom: 11,
    segments: [
      {
        segmentOrder: 1,
        boardingPoint: "SM Bacoor Terminal",
        alightingPoint: "Lawton (Manila City Hall)",
        durationMinutes: 80,
        fare: 50,
        transportName: "Bus",
        lineColor: "#ea580c",
        note: "Bus via Coastal Rd → Roxas Blvd → UN Ave → Lawton. Alight at Manila City Hall.",
        coords: [
          [14.4694, 120.9768], [14.4500, 120.9780], [14.5010, 120.9877], [14.5132, 120.9941], [14.5387, 120.9942],
          [14.5700, 120.9900], [14.5876, 120.9930], [14.5940, 120.9840], [14.5940, 120.9787],
        ],
      },
      {
        segmentOrder: 2,
        boardingPoint: "Lawton",
        alightingPoint: "España / UST",
        durationMinutes: 20,
        fare: 15,
        transportName: "Jeepney",
        lineColor: "#ca8a04",
        note: "Take España-bound jeep from Lawton going through Quiapo. Alight at UST / España stop.",
        coords: [
          [14.5940, 120.9787], [14.5990, 120.9790], [14.6060, 120.9870], [14.6099, 120.9893],
        ],
      },
      {
        segmentOrder: 3,
        boardingPoint: "UST / España",
        alightingPoint: "NU Manila Campus",
        durationMinutes: 5,
        fare: 0,
        transportName: "Walk",
        lineColor: "#16a34a",
        note: "5-minute walk to NU Manila.",
        coords: [
          [14.6099, 120.9893],
          [14.6041, 120.9923],
        ],
      },
    ],
  },

  {
    routeId: "cavite-route-c",
    routeName: "Bacoor Option C — Bus → Baclaran → LRT-1 → LRT-2 → Legarda",
    originCity: "Cavite, Bacoor City",
    destinationCity: "National University Sampaloc",
    estimatedMinutes: 100,
    totalFare: 105,
    transferCount: 3,
    transportModes: "Bus → LRT-1 → LRT-2 → Walk",
    crowdLabel: "Moderate",
    isRecommended: false,
    note: "More transfers but avoids España traffic. Alight at Baclaran, ride LRT-1 to Doroteo Jose, transfer LRT-2 to Legarda.",
    mapCenter: [14.5500, 120.9900],
    mapZoom: 11,
    segments: [
      {
        segmentOrder: 1,
        boardingPoint: "SM Bacoor Terminal",
        alightingPoint: "Baclaran Station",
        durationMinutes: 45,
        fare: 50,
        transportName: "Bus",
        lineColor: "#ea580c",
        note: "Bus via Coastal Rd → Roxas Blvd. Alight at Baclaran — this is also LRT-1's southernmost station.",
        coords: [
          [14.4694, 120.9768], [14.4500, 120.9780], [14.4720, 120.9830], [14.5010, 120.9877], [14.5132, 120.9941],
        ],
      },
      {
        segmentOrder: 2,
        boardingPoint: "Baclaran Station (LRT-1)",
        alightingPoint: "Doroteo Jose Station",
        durationMinutes: 30,
        fare: 40,
        transportName: "LRT-1",
        lineColor: "#16a34a",
        note: "LRT-1 northbound. Ride all the way to Doroteo Jose — the last station (end of LRT-1 line).",
        coords: [
          [14.5132, 120.9941], [14.5300, 120.9942], [14.5387, 120.9942], [14.5629, 120.9951], [14.5768, 120.9938],
          [14.5876, 120.9961], [14.5960, 120.9885], [14.5998, 120.9821], [14.6081, 120.9841],
        ],
      },
      {
        segmentOrder: 3,
        boardingPoint: "Recto Station (LRT-2)",
        alightingPoint: "Legarda Station",
        durationMinutes: 10,
        fare: 15,
        transportName: "LRT-2",
        lineColor: "#7c3aed",
        note: "Transfer to LRT-2 at Recto. Take eastbound train — alight at Legarda (1 stop only).",
        coords: [
          [14.6081, 120.9841], [14.6130, 120.9860],
        ],
      },
      {
        segmentOrder: 4,
        boardingPoint: "Legarda Station",
        alightingPoint: "NU Manila Campus",
        durationMinutes: 10,
        fare: 0,
        transportName: "Walk",
        lineColor: "#16a34a",
        note: "10-minute walk from Legarda Station to NU Manila.",
        coords: [
          [14.6130, 120.9860], [14.6041, 120.9923],
        ],
      },
    ],
  },

  {
    routeId: "cavite-route-d",
    routeName: "Bacoor Option D — Bus → Taft/Pasay → LRT-1 → Doroteo Jose → Legarda",
    originCity: "Cavite, Bacoor City",
    destinationCity: "National University Sampaloc",
    estimatedMinutes: 105,
    totalFare: 93,
    transferCount: 3,
    transportModes: "Bus → LRT-1 → Jeepney → Walk",
    crowdLabel: "Moderate",
    isRecommended: false,
    note: "Bus to Pasay / Taft Ave area → board LRT-1 at EDSA station → ride to Doroteo Jose → jeep or walk to Legarda → NU.",
    mapCenter: [14.5600, 120.9880],
    mapZoom: 11,
    segments: [
      {
        segmentOrder: 1,
        boardingPoint: "SM Bacoor Terminal",
        alightingPoint: "Taft Ave / Pasay (EDSA-Taft area)",
        durationMinutes: 50,
        fare: 45,
        transportName: "Bus",
        lineColor: "#ea580c",
        note: "Bus via Coastal Rd → Roxas Blvd. Alight at Taft Ave / EDSA area (near EDSA-Taft station or Vito Cruz).",
        coords: [
          [14.4694, 120.9768], [14.4500, 120.9780], [14.5010, 120.9877], [14.5132, 120.9941], [14.5300, 120.9942],
          [14.5387, 120.9942],
        ],
      },
      {
        segmentOrder: 2,
        boardingPoint: "EDSA Station (LRT-1)",
        alightingPoint: "Doroteo Jose Station",
        durationMinutes: 25,
        fare: 35,
        transportName: "LRT-1",
        lineColor: "#16a34a",
        note: "Board LRT-1 northbound at EDSA station. Ride to Doroteo Jose (end of line).",
        coords: [
          [14.5387, 120.9942], [14.5629, 120.9951], [14.5768, 120.9938], [14.5876, 120.9961], [14.5960, 120.9885],
          [14.5998, 120.9821], [14.6081, 120.9841],
        ],
      },
      {
        segmentOrder: 3,
        boardingPoint: "Doroteo Jose / Recto",
        alightingPoint: "NU Manila Campus",
        durationMinutes: 15,
        fare: 13,
        transportName: "Jeepney",
        lineColor: "#ca8a04",
        note: "Short jeep ride España-bound from Recto area toward Legarda. Alight near NU Manila.",
        coords: [
          [14.6081, 120.9841], [14.6060, 120.9870], [14.6041, 120.9923],
        ],
      },
    ],
  },

  {
    routeId: "cavite-route-e",
    routeName: "Bacoor Option E — Bus → Lawton → Quirino/UN Ave → Jeep → Legarda",
    originCity: "Cavite, Bacoor City",
    destinationCity: "National University Sampaloc",
    estimatedMinutes: 120,
    totalFare: 71,
    transferCount: 3,
    transportModes: "Bus → Jeepney → Jeepney → Walk",
    crowdLabel: "Light",
    isRecommended: false,
    note: "All-surface route, no rail needed. Bus to Lawton, jeep via Quirino / UN Ave, then transfer jeep to Legarda.",
    mapCenter: [14.5700, 120.9840],
    mapZoom: 11,
    segments: [
      {
        segmentOrder: 1,
        boardingPoint: "SM Bacoor Terminal",
        alightingPoint: "Lawton (Manila City Hall)",
        durationMinutes: 75,
        fare: 45,
        transportName: "Bus",
        lineColor: "#ea580c",
        note: "Bus via Coastal Rd → Roxas Blvd → UN Ave → Lawton. Alight at Manila City Hall.",
        coords: [
          [14.4694, 120.9768], [14.4500, 120.9780], [14.5010, 120.9877], [14.5132, 120.9941], [14.5387, 120.9942],
          [14.5700, 120.9900], [14.5876, 120.9930], [14.5940, 120.9840], [14.5940, 120.9787],
        ],
      },
      {
        segmentOrder: 2,
        boardingPoint: "Lawton",
        alightingPoint: "Quirino / UN Ave junction",
        durationMinutes: 10,
        fare: 13,
        transportName: "Jeepney",
        lineColor: "#f59e0b",
        note: "Jeep going Quiapo direction. Pass through UN Ave / Quirino Ave junction — alight here.",
        coords: [
          [14.5940, 120.9787], [14.5960, 120.9810], [14.5998, 120.9821],
        ],
      },
      {
        segmentOrder: 3,
        boardingPoint: "UN Ave / Quirino",
        alightingPoint: "NU Manila Campus",
        durationMinutes: 20,
        fare: 13,
        transportName: "Jeepney",
        lineColor: "#f59e0b",
        note: "Transfer to España / Legarda-bound jeep. Ride up to Legarda area then walk to NU.",
        coords: [
          [14.5998, 120.9821], [14.6040, 120.9860], [14.6060, 120.9870], [14.6041, 120.9923],
        ],
      },
    ],
  },
];

export const MOCK_CROWD = [
  { routeId: "qc-route-a",      routeName: "QC → NU via PITX Bus",              crowdLabel: "Moderate", reportCount: 7  },
  { routeId: "qc-route-b",      routeName: "QC → NU via LRT-2",                 crowdLabel: "Light",    reportCount: 4  },
  { routeId: "cavite-route-a",  routeName: "Bacoor → NU via PITX Bus Direct",   crowdLabel: "Crowded",  reportCount: 11 },
  { routeId: "cavite-route-b",  routeName: "Bacoor → NU via Lawton + Jeep",     crowdLabel: "Moderate", reportCount: 5  },
  { routeId: "cavite-route-c",  routeName: "Bacoor → NU via LRT-1 + LRT-2",    crowdLabel: "Moderate", reportCount: 3  },
  { routeId: "cavite-route-d",  routeName: "Bacoor → NU via Taft + LRT-1",     crowdLabel: "Moderate", reportCount: 2  },
  { routeId: "cavite-route-e",  routeName: "Bacoor → NU via Lawton + Quirino",  crowdLabel: "Light",    reportCount: 1  },
];


export default function App() {
  const [page,        setPage]        = useState("home");
  const [results,     setResults]     = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [searched,    setSearched]    = useState(false);
  const [arrivalTime, setArrivalTime] = useState("07:00");
  const [crowdData,   setCrowdData]   = useState(MOCK_CROWD);

  useEffect(() => {
    async function loadCrowdData() {
      try {
        const response = await fetch("http://localhost:5000/api/crowd");
        if (!response.ok) throw new Error("Unable to load crowd data");
        const data = await response.json();
        setCrowdData(data);
      } catch (error) {
        console.warn("Crowd fetch failed:", error.message);
      }
    }
    loadCrowdData();
  }, []);


  const goTo = (p) => {
    setPage(p);
    setSearched(false);
    setResults([]);
  };


  const handleSearch = async (from, to, arrival) => {
    setLoading(true);
    setSearched(true);
    setResults([]);
    setArrivalTime(arrival);

    await new Promise(r => setTimeout(r, 800));

    const found = MOCK_ROUTES
      .filter(r =>
        r.originCity.toLowerCase().includes(from.toLowerCase()) &&
        r.destinationCity.toLowerCase().includes(to.toLowerCase())
      )
      .sort((a, b) => a.estimatedMinutes - b.estimatedMinutes);

    setResults(found);
    setLoading(false);
  };

  const resetSearch = () => {
    setSearched(false);
    setResults([]);
  };

  return (
    <div className="app">
      <Header page={page} onNav={goTo} />

      <main className="main">
        {page === "home" && (
          <HomePage
            onSearch={handleSearch}
            loading={loading}
            results={results}
            searched={searched}
            onReset={resetSearch}
            arrivalTime={arrivalTime}
            crowdData={crowdData}
          />
        )}
        {page === "report" && <ReportPage routes={MOCK_ROUTES} />}
        {page === "about"  && <AboutPage />}
      </main>

      <footer className="app-footer">
        SHIFT PH &nbsp;·&nbsp; NATIONAL UNIVERSITY MANILA &nbsp;·&nbsp; SDG 11 &amp; 12
      </footer>
    </div>
  );
}
