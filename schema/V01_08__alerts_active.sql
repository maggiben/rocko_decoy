alter table asset_data add column borrow_collateral_factor double after borrow_total;
alter table alerts add column triggered bool not null default false;
alter table alerts add column triggered_time timestamp;
