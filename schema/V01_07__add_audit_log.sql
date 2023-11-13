create table audit_log(
  id int4 not null auto_increment,
  user_id int4 not null default 0,
  create_time timestamp not null default now(),
  message text,
  metadata text,
  primary key(id),
  key(user_id),
  key(create_time)
  );
