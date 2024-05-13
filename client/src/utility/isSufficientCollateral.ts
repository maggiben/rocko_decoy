import financial from './currencyFormate';

const isSufficientCollateral = (
  balance: string | undefined,
  collateral: string,
): boolean => {
  if (!balance) {
    return false;
  }
  const balanceNumber = Number(balance);

  return balanceNumber >= Number(financial(collateral, 4));
};

export default isSufficientCollateral;
