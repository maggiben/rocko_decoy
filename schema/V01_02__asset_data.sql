create table asset_data(
  id int4 not null auto_increment,
  fetch_time timestamp not null default now(),
  lending_protocol varchar(15),
  protocol_version varchar(5),
  network varchar(10),
  loan_asset varchar(10),
  total_supply double default 0,
  total_borrow double default 0,
  supply_rate double default 0,
  borrow_rate double default 0,
  utilization double default 0,
  supply_apr double default 0,
  borrow_apr double default 0,

  primary key(id),
  key(fetch_time)
);
