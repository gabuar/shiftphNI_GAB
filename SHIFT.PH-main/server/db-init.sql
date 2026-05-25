CREATE DATABASE IF NOT EXISTS shiftph CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shiftph;

CREATE TABLE IF NOT EXISTS crowd_status (
  route_id VARCHAR(50) PRIMARY KEY,
  route_name VARCHAR(255) NOT NULL,
  crowd_label VARCHAR(50) NOT NULL,
  report_count INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route_id VARCHAR(50) NOT NULL,
  report_type VARCHAR(100) NOT NULL,
  crowd_level VARCHAR(50),
  comment TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO crowd_status (route_id, route_name, crowd_label, report_count) VALUES
('qc-route-a', 'QC → NU via PITX Bus', 'Moderate', 7),
('qc-route-b', 'QC → NU via LRT-2', 'Light', 4),
('cavite-route-a', 'Bacoor → NU via PITX Bus Direct', 'Crowded', 11),
('cavite-route-b', 'Bacoor → NU via Lawton + Jeep', 'Moderate', 5),
('cavite-route-c', 'Bacoor → NU via LRT-1 + LRT-2', 'Moderate', 3),
('cavite-route-d', 'Bacoor → NU via Taft + LRT-1', 'Moderate', 2),
('cavite-route-e', 'Bacoor → NU via Lawton + Quirino', 'Light', 1);
