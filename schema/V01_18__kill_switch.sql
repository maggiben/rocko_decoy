create table kill_switch(
  loan_booking_blocked bool not null default false,
  transactions_blocked bool not null default false
);
