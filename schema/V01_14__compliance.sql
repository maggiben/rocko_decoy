create table compliance_address(
  wallet_address varchar(42) not null,
  user_id int4 not null,
  user_email varchar(100),
  is_ofac_compliant bool not null default false,
  create_time timestamp not null default now(),

  primary key(wallet_address),
  key(user_id)
);

create table compliance_transaction(
  transaction_hash varchar(150),
  destination_address varchar(42) not null,
  user_id int4 not null,
  user_email varchar(100),
  create_time timestamp not null default now(),

  primary key(transaction_hash),
  key(destination_address),
  key(user_id)
);