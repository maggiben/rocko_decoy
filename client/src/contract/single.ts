import { Contract, ethers } from 'ethers';
import { useAddress, useSigner } from '@thirdweb-dev/react';
import { useAccount } from 'wagmi';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { formatBalance, parseBalance } from '@/utility/utils';
import {
  USDCContract,
  CometContract,
  CometRewardContract,
  WETHContract,
  ChainlinkEthPriceFeed,
  networkChainId,
} from '../constants';
import { BLOCKCHAIN } from '../constants/env';

const WETHABI = require('../constants/weth.json');
const COMETABI = require('../constants/comet.json');
const BASIC_COMETABI = require('../constants/basic_comet.json');
const USDCABI = require('../constants/usdc.json');
const REWARDABI = require('../constants/reward.json');

const ASSET_ID = 2;

export const useSingleLoan = () => {
  const address = useAddress();
  const { address: zerodevAccount } = useAccount();
  const signer: ethers.Signer | undefined = useSigner();

  const getETHPrice = async (): Promise<number> => {
    const sdk = new ThirdwebSDK(BLOCKCHAIN);

    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );
    const price = await contract.call('getPrice', [
      ChainlinkEthPriceFeed[networkChainId],
    ]);

    const formattedValue = Number(ethers.utils.formatEther(price)) * 10 ** 10;
    return formattedValue;
  };

  const getBorrowAPR = async (): Promise<number> => {
    const sdk = new ThirdwebSDK(BLOCKCHAIN);

    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );
    const utilization = await contract.call('getUtilization');
    const borrowRate = await contract.call('getBorrowRate', [utilization]);

    const formattedRate = Number(ethers.utils.formatEther(borrowRate));
    const borrowAPR = formattedRate * 60 * 60 * 24 * 365 * 100;
    return borrowAPR;
  };

  const getLTV = async (): Promise<number> => {
    const sdk = new ThirdwebSDK(BLOCKCHAIN);

    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );
    const assetInfo = await contract.call('getAssetInfo', [ASSET_ID]);
    const LTV = assetInfo.borrowCollateralFactor;

    const formattedValue = Number(ethers.utils.formatEther(LTV));
    return formattedValue;
  };

  const getThreshold = async (): Promise<number> => {
    const sdk = new ThirdwebSDK(BLOCKCHAIN);

    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );
    const assetInfo = await contract.call('getAssetInfo', [ASSET_ID]);
    const threshold = assetInfo.liquidateCollateralFactor;

    const formattedValue = Number(ethers.utils.formatEther(threshold));
    return formattedValue;
  };

  const getPenalty = async (): Promise<number> => {
    const sdk = new ThirdwebSDK(BLOCKCHAIN);

    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );
    const assetInfo = await contract.call('getAssetInfo', [ASSET_ID]);
    const penalty = assetInfo.liquidationFactor;

    const formattedValue = 1 - Number(ethers.utils.formatEther(penalty));
    return formattedValue;
  };

  const getBorrowBalanceOf = async (): Promise<number> => {
    if (!zerodevAccount) return 0;

    const sdk = new ThirdwebSDK(BLOCKCHAIN);
    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );

    const value = await contract.call('borrowBalanceOf', [zerodevAccount]);

    const formattedValue = formatBalance(value, 6, 6);

    console.log(formattedValue);
    return Number(formattedValue);
  };

  const getCollateralBalanceOf = async (): Promise<number> => {
    if (!zerodevAccount) return 0;

    const sdk = new ThirdwebSDK(BLOCKCHAIN);
    const contract = await sdk.getContract(
      CometContract[networkChainId],
      BASIC_COMETABI,
    );

    const value = await contract.call('collateralBalanceOf', [
      zerodevAccount,
      WETHContract[networkChainId],
    ]);

    const formattedValue = Number(ethers.utils.formatEther(value));
    return formattedValue;
  };

  const getRewardRate = async (): Promise<number> => {
    const sdk = new ThirdwebSDK(BLOCKCHAIN);
    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );
    const value = await contract.call('baseTrackingBorrowSpeed');

    console.log(value);
    console.log(Number(ethers.utils.formatEther(value)));

    const formattedValue =
      Number(ethers.utils.formatEther(value)) * 365 * 60 * 60 * 24;
    return formattedValue;
  };

  const getRewardAmount = async (): Promise<number> => {
    if (!zerodevAccount) return 0;

    const sdk = new ThirdwebSDK(BLOCKCHAIN);
    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );
    const value = await contract.call('userBasic', [zerodevAccount]);

    const formattedValue =
      Number(ethers.utils.formatEther(value.baseTrackingAccrued)) * 10 ** 12;
    return formattedValue;
  };

  const getLiquidationPrice = async (
    loan: string | number,
    collateral: string | number,
  ): Promise<number | string> => {
    if (
      typeof loan === 'undefined' ||
      Number(loan) == 0 ||
      Number(collateral) == 0
    )
      return 'N/A';

    const threshold = await getThreshold();
    const value = Number(loan) / threshold / Number(collateral);

    return value;
  };

  const getBuffer = async (
    loan: string | number,
    collateral: string | number,
  ): Promise<number | string> => {
    if (
      typeof loan === 'undefined' ||
      Number(loan) == 0 ||
      Number(collateral) == 0
    )
      return 'N/A';

    const loanToValue = await getLTV();
    const collateralPrice = await getETHPrice();
    const min_collateral = Number(loan) / loanToValue / collateralPrice;
    const new_buffer = (Number(collateral) - min_collateral) / min_collateral;

    return new_buffer;
  };

  const approveWETH = async () => {
    if (!signer) return;

    const sdk = ThirdwebSDK.fromSigner(signer);
    const uintMax =
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

    const contract = await sdk.getContract(
      WETHContract[networkChainId],
      WETHABI,
    );
    try {
      const tx = await contract.call('approve', [
        CometContract[networkChainId],
        uintMax,
      ]);
      return tx;
    } catch {
      return null;
    }
  };

  const approveUSDC = async () => {
    if (!signer) return;

    const sdk = ThirdwebSDK.fromSigner(signer);
    const uintMax =
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

    const contract = await sdk.getContract(
      USDCContract[networkChainId],
      USDCABI,
    );
    try {
      const tx = await contract.call('approve', [
        CometContract[networkChainId],
        uintMax,
      ]);
      return tx;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const depositZerodevAccount = async (
    zerodevAccount: string,
    amount: number | string,
    currency: string,
  ) => {
    if (!signer || !zerodevAccount || Number(amount) <= 0) return null;

    const sdk = ThirdwebSDK.fromSigner(signer);
    try {
      if (currency == 'ETH') {
        const txResult = await sdk.wallet.transfer(zerodevAccount, amount);
        return txResult;
      }
      const txResult = await sdk.wallet.transfer(
        zerodevAccount,
        amount,
        USDCContract[networkChainId],
      );
      return txResult;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const deposit = async (amount: number | string) => {
    if (!signer) return;

    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(
      WETHContract[networkChainId],
      WETHABI,
    );

    try {
      const tx = await contract.call('deposit', [], {
        value: ethers.utils.parseEther(amount.toString()),
      });
      return tx;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const wethToETH = async (amount: number | string) => {
    if (!signer) return;

    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(
      WETHContract[networkChainId],
      WETHABI,
    );

    try {
      const tx = await contract.call('withdraw', [
        ethers.utils.parseEther(amount.toString()),
      ]);
      return tx;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const addCollateral = async (amount: number | string) => {
    if (!signer) return;

    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );

    try {
      const tx = await contract.call('supply', [
        WETHContract[networkChainId],
        parseBalance(amount.toString()),
      ]);
      return tx;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const addLoan = async (amount: number | string) => {
    if (!signer) return;

    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );

    try {
      const tx = await contract.call('supply', [
        USDCContract[networkChainId],
        parseBalance(amount.toString(), 6),
      ]);
      return tx;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const borrowLoan = async (amount: number | string) => {
    if (!signer) return;

    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );

    try {
      const tx = await contract.call('withdraw', [
        USDCContract[networkChainId],
        parseBalance(amount.toString(), 6),
      ]);
      return tx;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const borrowCollateral = async (amount: number | string) => {
    if (!signer) return;

    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(
      CometContract[networkChainId],
      COMETABI,
    );

    try {
      const tx = await contract.call('withdraw', [
        WETHContract[networkChainId],
        parseBalance(amount.toString()),
      ]);
      return tx;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const claimReward = async () => {
    if (!address || !signer) return;

    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(
      CometRewardContract[networkChainId],
      REWARDABI,
    );

    try {
      const tx = await contract.call('claim', [
        CometContract[networkChainId],
        address,
        true,
      ]);
      return tx;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return {
    approveWETH,
    approveUSDC,
    deposit,
    wethToETH,
    addCollateral,
    addLoan,
    borrowLoan,
    borrowCollateral,
    getETHPrice,
    getBorrowAPR,
    getLTV,
    getThreshold,
    getPenalty,
    getCollateralBalanceOf,
    getBorrowBalanceOf,
    getRewardAmount,
    getRewardRate,
    getLiquidationPrice,
    getBuffer,
    claimReward,
    depositZerodevAccount,
  };
};
