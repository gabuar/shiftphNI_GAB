import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "127.0.0.1",
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "shiftph",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/api/crowd", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT route_id, route_name, crowd_label, report_count FROM crowd_status ORDER BY route_name");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/reports", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, route_id, report_type, crowd_level, comment, created_at FROM reports ORDER BY created_at DESC LIMIT 50");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/reports", async (req, res) => {
  try {
    const { routeId, reportType, crowdLevel, comment } = req.body;

    if (!routeId || !reportType) {
      return res.status(400).json({ error: "routeId and reportType are required" });
    }

    const sql = `
      INSERT INTO reports (route_id, report_type, crowd_level, comment, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const [result] = await pool.query(sql, [routeId, reportType, crowdLevel ?? null, comment ?? null]);

    res.status(201).json({ ok: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
