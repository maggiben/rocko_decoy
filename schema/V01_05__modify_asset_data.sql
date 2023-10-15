alter table asset_data add column base_price double default 0 after loan_asset;
alter table asset_data add column comp_price double default 0 after base_price;
alter table asset_data modify column utilization double default 0 after comp_price;
alter table asset_data add column utilization_percent double default 0 after utilization;
alter table asset_data add column available double default 0 after utilization_percent;

alter table asset_data rename column total_supply to supply_total;
alter table asset_data rename column total_borrow to borrow_total;
alter table asset_data modify column supply_total double default 0 after supply_apr;
alter table asset_data modify column borrow_total double default 0 after borrow_apr;

alter table asset_data modify column supply_apr double default 0 after supply_rate;
alter table asset_data modify column supply_total double default 0 after supply_apr;

alter table asset_data add column comp_to_suppliers_per_day double default 0 after supply_total;
alter table asset_data add column supply_reward_rate double default 0 after comp_to_suppliers_per_day;
alter table asset_data add column supply_net_rate double default 0 after supply_reward_rate;

alter table asset_data add column comp_to_borrowers_per_day double default 0 after borrow_total;
alter table asset_data add column borrow_reward_rate double default 0 after comp_to_borrowers_per_day;
alter table asset_data add column borrow_net_rate double default 0 after borrow_reward_rate;
alter table asset_data add column borrow_min double default 0 after borrow_net_rate;
alter table asset_data add column borrow_reward_min double default 0 after borrow_min;

