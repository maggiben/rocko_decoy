RENAME TABLE kill_switch TO platform_status;
ALTER TABLE platform_status ADD COLUMN status_message VARCHAR(255) DEFAULT '';