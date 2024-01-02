alter table alerts add column triggered bool not null default false after alert_once;
