module.exports = {
    CURRENT_APR: "This is a variable (or floating) APR and fluctuates in real-time based on borrowing demand.",
    PROJECTED_INTEREST: "This is based on the current APR and displayed in USD at 1:1 exchange rate. Your actual interest will likely be different as it is expected the APR will fluctuate during the term of your loan.",
    COLLATERAL_NEEDED: "This is the amount of collateral you will need to post for this loan. It is determined by your loan amount, the ratio required by the selected lending protocol, and the collateral buffer you set.",
    LIQUIDATION_PRICE: "This is the USD price of the collateral asset at which your collateral would be liquidated. For example, a liquidation price of $1,200 for ETH would mean your collateral would be liquidated if the price of Ether hit $1,200 or less. Increasing your buffer amount will lower your liquidation price thereby reducing the possibility your collateral is liquidated.",
    MAX_LTV: "This is the highest loan-to-value (LTV) ratio the lending protocol will allow when originating a loan. The loan-to-value ratio is calculated by dividing the USD value of your loan by the USD value of your collateral. For example, a $1m000 loan with $2,000 of ETH as collateral would have a LTV of 50%.",
    LIQUIDATION_THRESHOLD: "This is the loan-to-value (LTV) ratio at which your collateral would be liquidated. For example, if the liquidation threshold is 90%, your collateral would be liquidated if the LTV hit or exceeded 90%.",
    LIQUIDATION_PENALTY: "If your collateral is liquidated, the lending protocol may charge a fee which is known as the liquidation penalty. For example, if the liquidation penalty is 5% and collateral worth $1,000 is liquidated, the lending protocol would collect a $50 fee when liquidating the collateral.",
    LOAN_TERM: "This is the length of your loan. Many loans in DeFi have no payment due date and can be held in perpetuity as long as the LTV stays below the liquidation threshold.",
    MINIMUM_MONTHLY_PAYMENT: "Most lending protocols require no monthly minimum payment.",
    PROTOCOL_REWARDS: "Some lending protocols offer rewards based on usage of their service. The reward rate is based on the loan amount and is typically paid in the protocol's native token.",
    TRAILING_APRS: "Trailing APRs are calculated as the average interest rate for the loan based on the previous 30 or 365 days. Interest rates are pulled every 30 minutes as part of the calculation.",
    AVERAGE_APR: "This is the average APR for the length of this loan. It is calculated using your beginning interest rate and then the interest rate at every hour and half hour for the course of your loan."
};

