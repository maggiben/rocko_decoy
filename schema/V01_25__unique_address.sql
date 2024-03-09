-- Dont run this until we figure out how dupe got added
ALTER TABLE users ADD CONSTRAINT UniqueWalletAddressConstraint UNIQUE (wallet_address);