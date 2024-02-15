CREATE TABLE transactions (
    id INT NOT NULL AUTO_INCREMENT,
    loan_id INT NOT NULL,
    user_id INT NOT NULL,
    asset ENUM('eth', 'usdc', 'comp', 'link', 'uni', 'wbtc'),
    asset_decimals TINYINT NOT NULL,
    amount DECIMAL(38, 0),
    usd_value DECIMAL(10,6) DEFAULT '0.000000',
    recipient_address VARCHAR(42),
    sender_address VARCHAR(42),
    transaction_hash VARCHAR(64),
    transaction_type ENUM('new_loan_withdrawal', 'payment', 'initial_collateral', 'collateral_addition', 'collateral_withdrawal', 'loan_increase', 'rewards_withdrawal', 'fee'),
    create_time TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id),
    KEY (loan_id),
    KEY (user_id),
    CONSTRAINT fk_loan_id FOREIGN KEY (loan_id) REFERENCES loans(id)
);