-- Booking enquiries captured before the WhatsApp handoff.
--
-- This records that someone submitted the form and was given a wa.me link.
-- It cannot record whether they actually sent the message: the handoff happens
-- in the visitor's browser, so the server never learns the outcome.
CREATE TABLE IF NOT EXISTS enquiries (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now')),
  name           TEXT    NOT NULL,
  phone          TEXT    NOT NULL,
  service        TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  message        TEXT,
  user_agent     TEXT,
  country        TEXT
);

-- Reporting is chronological ("enquiries last month"), so index the sort key.
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries (created_at DESC);
