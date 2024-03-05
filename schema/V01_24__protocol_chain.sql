ALTER TABLE loans ADD COLUMN protocol_chain ENUM('mainnet', 'sepolia', 'base') AFTER lending_protocol;
