create table loans(
  id int4 not null auto_increment,
  user_id int4 not null,
  transaction_hash varchar(150),
  lending_protocol varchar(30),
  loan_active bool default false,
  loan_asset varchar(10),
  outstanding_balance decimal default 0,
  liquidation_price decimal default 0,
  collateral_buffer decimal default 0,

  create_time timestamp default now(),
  modified_time timestamp default now(),

  primary key(id),
  key(user_id)
);


create table users (
  id int4 not null auto_increment,
  email varchar(100),
  phone varchar(50),
  phone_verified bool default false,

  wallet_address varchar(50),

  active bool default false,
  mfa_enabled varchar(20) default null,

  country_origin varchar(2) default null,
  country_lastlogin varchar(2) default null,
  ipaddress_lastlogin varchar(15) default null,
  is_vpn boolean default false,

  create_time timestamp default now(),
  modified_time timestamp default now(),

  primary key(id),
  unique(email),
  key(wallet_address)
);

