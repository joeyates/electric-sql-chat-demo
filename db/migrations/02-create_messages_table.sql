CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY NOT NULL,
  text TEXT
);

ALTER TABLE messages ENABLE ELECTRIC;
