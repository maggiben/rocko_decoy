alter table alerts rename column modify_time to modified_time;
alter table alerts add column alert_once bool not null default false after modified_time;
