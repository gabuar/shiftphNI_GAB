# SHIFT.PH

## Local Setup

This repo contains the React frontend and a Node.js backend scaffold for connecting to a MySQL database.

### 1. Install dependencies

Open a terminal in `SHIFT.PH-main/SHIFT.PH-main` and run:

```powershell
npm install
```

### 2. Configure your database

Copy `.env.example` to `.env` and update the credentials:

```text
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=shiftph
```

### 3. Initialize the MySQL schema

Open MySQL Workbench and run the SQL in `server/db-init.sql`.
This creates the `shiftph` database and the required tables.

### 4. Start the backend

```powershell
npm run server
```

The backend runs on `http://localhost:5000` and provides:
- `GET /api/health`
- `GET /api/crowd`
- `GET /api/reports`
- `POST /api/reports`

### 5. Frontend behavior

The current React app uses local route definitions for the route finder, but it now pulls crowd status from the Node backend and submits reports into MySQL.

### Notes

- MySQL Workbench is only the database GUI. The Node backend is the bridge between the app and MySQL.
- If you want, I can also add a frontend package manager setup to run the React app with `npm start`.
