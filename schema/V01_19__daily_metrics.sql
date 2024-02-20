CREATE TABLE daily_metrics(
  total_outstanding_balance DECIMAL(14,6) DEFAULT '0.000000',
  total_active_loans INT UNSIGNED DEFAULT '0',
  total_active_borrowers INT UNSIGNED DEFAULT '0',
  metrics_date DATE NOT NULL DEFAULT (CURDATE()),
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (metrics_date)
);
