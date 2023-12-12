create table trm_responses (
  id int4 not null auto_increment,
  creation_time timestamp not null default now(),
  transaction_id int4 not null,

  accountExternalId varchar(150) not null,
  address varchar(150) not null,
  addressIncomingVolumeUsd varchar(150),
  addressOutgoingVolumeUsd varchar(150),
  addressSubmitted varchar(150) not null,
  addressTotalVolumeUsd varchar(150) not null,
  chain varchar(150) not null,
  externalId varchar(150),
  trmAppUrl varchar(150) not null,

  primary key(id),
  key(transaction_id)
);


create table trm_responses_address_risk_indicators (
  id int4 not null auto_increment,
  creation_time timestamp not null default now(),
  trm_response_id int4 not null,

  category varchar(150) not null,
  categoryId varchar(150) not null,
  categoryRiskScoreLevel int4,
  categoryRiskScoreLevelLabel varchar(150) not null,
  incomingVolumeUsd varchar(150) not null,
  outgoingVolumeUsd varchar(150) not null,
  riskType varchar(150) not null,
  totalVolumeUsd varchar(150) not null,

  primary key(id),
  key(trm_response_id)
);

create table trm_responses_entities (
  id int4 not null auto_increment,
  creation_time timestamp not null default now(),
  trm_response_id int4 not null,

  category varchar(150) not null,
  categoryId varchar(150) not null,
  confidenceScoreLabel varchar(150) not null,
  entity varchar(50),
  riskScoreLevel int4 not null,
  riskScoreLevelLabel varchar(150) not null,
  trmAppUrl varchar(150) not null,
  trmUrn varchar(150) not null,

  primary key(id),
  key(trm_response_id)
);

