import { AprAlertType, BufferAlertType } from '@/types/type';

const sortAprAlert = (aprAlertState: AprAlertType[]) => {
  const aprAlertAbove = aprAlertState.filter(
    (aprAlert: AprAlertType, index: number) =>
      aprAlert.currentInterestRate.position === 'Above',
  );

  const aprAlertBelow = aprAlertState.filter(
    (aprAlert: AprAlertType, index: number) =>
      aprAlert.currentInterestRate.position === 'Below',
  );

  const sortAprAlertAbove = aprAlertAbove.sort((a, b) => {
    if (
      a?.currentInterestRate?.percentage &&
      b?.currentInterestRate?.percentage
    ) {
      return (
        b?.currentInterestRate?.percentage - a?.currentInterestRate?.percentage
      );
    }
    return 0; // Add this line to prevent typescript error
  });

  const sortAprAlertBelow = aprAlertBelow.sort((a, b) => {
    if (
      a?.currentInterestRate?.percentage &&
      b?.currentInterestRate?.percentage
    ) {
      return (
        b?.currentInterestRate?.percentage - a?.currentInterestRate?.percentage
      );
    }
    return 0; // Add this line to prevent typescript error
  });

  return [...sortAprAlertAbove, ...sortAprAlertBelow];
};

const sortBufferAlert = (bufferAlertState: BufferAlertType[]) => {
  const bufferAlertAbove = bufferAlertState.filter(
    (bufferAlert: BufferAlertType, index: number) =>
      bufferAlert.currentCollateralBuffer.position === 'Above',
  );

  const bufferAlertBelow = bufferAlertState.filter(
    (bufferAlert: BufferAlertType, index: number) =>
      bufferAlert.currentCollateralBuffer.position === 'Below',
  );

  const sortBufferAlertAbove = bufferAlertAbove.sort((a, b) => {
    if (
      a?.currentCollateralBuffer?.percentage &&
      b?.currentCollateralBuffer?.percentage
    ) {
      return (
        b?.currentCollateralBuffer?.percentage -
        a?.currentCollateralBuffer?.percentage
      );
    }
    return 0; // Add this line to prevent typescript error
  });

  const sortBufferAlertBelow = bufferAlertBelow.sort((a, b) => {
    if (
      a?.currentCollateralBuffer?.percentage &&
      b?.currentCollateralBuffer?.percentage
    ) {
      return (
        b?.currentCollateralBuffer?.percentage -
        a?.currentCollateralBuffer?.percentage
      );
    }
    return 0; // Add this line to prevent typescript error
  });

  return [...sortBufferAlertAbove, ...sortBufferAlertBelow];
};

export { sortAprAlert, sortBufferAlert };
