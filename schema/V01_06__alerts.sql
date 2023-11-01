create table alerts(
  id int4 not null auto_increment,
  loan_id int4 not null,

  alert_type varchar(20),
  alert_metric varchar(20),
  alert_threshold double not null default 0,
  alert_email bool not null default false,
  alert_phone bool not null default false,
  alert_repeat_secs int4 not null default 0,
  active bool not null default false,
  create_time timestamp not null default now(),
  modify_time timestamp not null default now(),

  primary key(id),
  key(create_time),
  key(alert_type)
);
