export default [
  {
    "statements": [
      "CREATE TABLE \"messages\" (\n  \"id\" TEXT NOT NULL,\n  \"text\" TEXT,\n  CONSTRAINT \"messages_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.messages', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_messages_primarykey;",
      "CREATE TRIGGER update_ensure_main_messages_primarykey\n  BEFORE UPDATE ON \"main\".\"messages\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_messages_into_oplog;",
      "CREATE TRIGGER insert_main_messages_into_oplog\n   AFTER INSERT ON \"main\".\"messages\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.messages')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'messages', 'INSERT', json_object('id', new.\"id\"), json_object('id', new.\"id\", 'text', new.\"text\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_messages_into_oplog;",
      "CREATE TRIGGER update_main_messages_into_oplog\n   AFTER UPDATE ON \"main\".\"messages\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.messages')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'messages', 'UPDATE', json_object('id', new.\"id\"), json_object('id', new.\"id\", 'text', new.\"text\"), json_object('id', old.\"id\", 'text', old.\"text\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_messages_into_oplog;",
      "CREATE TRIGGER delete_main_messages_into_oplog\n   AFTER DELETE ON \"main\".\"messages\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.messages')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'messages', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('id', old.\"id\", 'text', old.\"text\"), NULL);\nEND;"
    ],
    "version": "2"
  },
  {
    "statements": [
      "ALTER TABLE \"messages\" ADD COLUMN \"user_id\" TEXT;\n",
      "ALTER TABLE \"messages\" ADD COLUMN \"time\" TEXT;\n",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.messages', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_messages_primarykey;",
      "CREATE TRIGGER update_ensure_main_messages_primarykey\n  BEFORE UPDATE ON \"main\".\"messages\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_messages_into_oplog;",
      "CREATE TRIGGER insert_main_messages_into_oplog\n   AFTER INSERT ON \"main\".\"messages\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.messages')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'messages', 'INSERT', json_object('id', new.\"id\"), json_object('id', new.\"id\", 'text', new.\"text\", 'time', new.\"time\", 'user_id', new.\"user_id\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_messages_into_oplog;",
      "CREATE TRIGGER update_main_messages_into_oplog\n   AFTER UPDATE ON \"main\".\"messages\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.messages')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'messages', 'UPDATE', json_object('id', new.\"id\"), json_object('id', new.\"id\", 'text', new.\"text\", 'time', new.\"time\", 'user_id', new.\"user_id\"), json_object('id', old.\"id\", 'text', old.\"text\", 'time', old.\"time\", 'user_id', old.\"user_id\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_messages_into_oplog;",
      "CREATE TRIGGER delete_main_messages_into_oplog\n   AFTER DELETE ON \"main\".\"messages\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.messages')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'messages', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('id', old.\"id\", 'text', old.\"text\", 'time', old.\"time\", 'user_id', old.\"user_id\"), NULL);\nEND;"
    ],
    "version": "3"
  }
]