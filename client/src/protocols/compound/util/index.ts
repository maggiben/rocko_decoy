import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import * as chains from 'wagmi/chains';
import logger from '@/utility/logger';
import { formatBalance, parseBalance } from '@/utility/utils';
import {
  CometContract,
  CometRewardContract,
  ChainlinkEthPriceFeed,
  USDCContract,
  WETHContract,
} from '@/constants';

const WETHABI = require('../../../constants/weth.json');
const COMETABI = require('../../../constants/comet.json');
const BASIC_COMETABI = require('../../../constants/basic_comet.json');
const USDCABI = require('../../../constants/usdc.json');
const REWARDABI = require('../../../constants/reward.json');

type BlockchainNames = 'ethereum' | 'sepolia' | 'base';
const networkChainId = (chain: string) =>
  (chains as { [key: string]: any })[chain]?.id;

const collateralAssetId = (chain: string) =>
  chain === chains.base.network ? 1 : 2;

const getETHPrice = async (chain: string): Promise<number> => {
  const BLOCKCHAIN: BlockchainNames =
    chain === 'mainnet' ? 'ethereum' : (chain as BlockchainNames);

  const sdk = new ThirdwebSDK(BLOCKCHAIN);

  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );
  const price = await contract.call('getPrice', [
    ChainlinkEthPriceFeed[networkChainId(chain)],
  ]);

  const formattedValue = Number(ethers.utils.formatEther(price)) * 10 ** 10;
  return formattedValue;
};

const getLTV = async (chain: string): Promise<number> => {
  const BLOCKCHAIN: BlockchainNames =
    chain === 'mainnet' ? 'ethereum' : (chain as BlockchainNames);

  const sdk = new ThirdwebSDK(BLOCKCHAIN);

  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );

  const assetInfo = await contract.call('getAssetInfo', [
    collateralAssetId(chain),
  ]);

  const LTV = assetInfo.borrowCollateralFactor;
  const formattedValue = Number(ethers.utils.formatEther(LTV));

  return formattedValue;
};

const getThreshold = async (chain: string): Promise<number> => {
  const BLOCKCHAIN: BlockchainNames =
    chain === 'mainnet' ? 'ethereum' : (chain as BlockchainNames);

  const sdk = new ThirdwebSDK(BLOCKCHAIN);

  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );
  const assetInfo = await contract.call('getAssetInfo', [
    collateralAssetId(chain),
  ]);
  const threshold = assetInfo.liquidateCollateralFactor;

  const formattedValue = Number(ethers.utils.formatEther(threshold));
  return formattedValue;
};

const getPenalty = async (chain: string): Promise<number> => {
  const BLOCKCHAIN: BlockchainNames =
    chain === 'mainnet' ? 'ethereum' : (chain as BlockchainNames);

  const sdk = new ThirdwebSDK(BLOCKCHAIN);

  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );
  const assetInfo = await contract.call('getAssetInfo', [
    collateralAssetId(chain),
  ]);
  const penalty = assetInfo.liquidationFactor;

  const formattedValue = 1 - Number(ethers.utils.formatEther(penalty));
  return formattedValue;
};

const getBorrowBalanceOf = async ({
  chain,
  zeroDevAccount,
}: {
  chain: string;
  zeroDevAccount: any;
}): Promise<number> => {
  console.log('zeroDevAccount', zeroDevAccount);
  if (!zeroDevAccount) return 0;

  const BLOCKCHAIN: BlockchainNames =
    chain === 'mainnet' ? 'ethereum' : (chain as BlockchainNames);
  console.log({ BLOCKCHAIN, chain });
  const sdk = new ThirdwebSDK(BLOCKCHAIN);
  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );

  const value = await contract.call('borrowBalanceOf', [zeroDevAccount]);
  console.log({ value });
  const formattedValue = formatBalance(value, 6, 6);

  return Number(formattedValue);
};

const getCollateralBalanceOf = async ({
  chain,
  zeroDevAccount,
}: {
  chain: string;
  zeroDevAccount: any;
}): Promise<number> => {
  if (!zeroDevAccount) return 0;

  const BLOCKCHAIN: BlockchainNames =
    chain === 'mainnet' ? 'ethereum' : (chain as BlockchainNames);

  const sdk = new ThirdwebSDK(BLOCKCHAIN);
  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    BASIC_COMETABI,
  );

  const value = await contract.call('collateralBalanceOf', [
    zeroDevAccount,
    WETHContract[networkChainId(chain)],
  ]);

  const formattedValue = Number(ethers.utils.formatEther(value));
  return formattedValue;
};

const getRewardRate = async (chain: string): Promise<number> => {
  const BLOCKCHAIN: BlockchainNames =
    chain === 'mainnet' ? 'ethereum' : (chain as BlockchainNames);

  const sdk = new ThirdwebSDK(BLOCKCHAIN);
  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );
  const value = await contract.call('baseTrackingBorrowSpeed');

  const formattedValue =
    Number(ethers.utils.formatEther(value)) * 365 * 60 * 60 * 24;
  return formattedValue;
};

const getRewardAmount = async ({
  chain,
  zeroDevAccount,
}: {
  chain: string;
  zeroDevAccount: any;
}): Promise<number> => {
  if (!zeroDevAccount) return 0;

  const BLOCKCHAIN: BlockchainNames =
    chain === 'mainnet' ? 'ethereum' : (chain as BlockchainNames);

  const sdk = new ThirdwebSDK(BLOCKCHAIN);

  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );
  const value = await contract.call('userBasic', [zeroDevAccount]);

  const formattedValue =
    Number(ethers.utils.formatEther(value.baseTrackingAccrued)) * 10 ** 12;
  return formattedValue;
};

const getMinCollateral = async ({
  loan,
  chain,
}: {
  loan: string | number;
  chain: string;
}): Promise<number | string> => {
  if (typeof loan === 'undefined' || Number(loan) === 0) return 'N/A';

  const loanToValue = await getLTV(chain);
  const collateralPrice = await getETHPrice(chain);
  const minCollateral = Number(loan) / loanToValue / collateralPrice;

  return minCollateral;
};

const getLiquidationPrice = async ({
  loan,
  collateral,
  chain,
}: {
  loan: string | number;
  collateral: string | number;
  chain: string;
}): Promise<number | string> => {
  if (
    typeof loan === 'undefined' ||
    Number(loan) === 0 ||
    Number(collateral) === 0
  )
    return 'N/A';

  const threshold = await getThreshold(chain);
  const value = Number(loan) / threshold / Number(collateral);

  return value;
};

const getBuffer = async ({
  loan,
  collateral,
  chain,
}: {
  loan: string | number;
  collateral: string | number;
  chain: string;
}): Promise<number | string> => {
  if (
    typeof loan === 'undefined' ||
    Number(loan) === 0 ||
    Number(collateral) === 0
  )
    return 'N/A';

  const loanToValue = await getLTV(chain);
  const collateralPrice = await getETHPrice(chain);
  const minCollateral = Number(loan) / loanToValue / collateralPrice;
  const newBuffer = (Number(collateral) - minCollateral) / minCollateral;

  return newBuffer;
};

const approveWETH = async ({
  signer,
  chain,
}: {
  signer: any;
  chain: string;
}) => {
  if (!signer) return;

  const sdk = ThirdwebSDK.fromSigner(signer);
  const uintMax =
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  const contract = await sdk.getContract(
    WETHContract[networkChainId(chain)],
    WETHABI,
  );
  try {
    const tx = await contract.call('approve', [
      CometContract[networkChainId(chain)],
      uintMax,
    ]);
    return tx;
  } catch {
    return null;
  }
};

const approveUSDC = async ({
  signer,
  chain,
}: {
  signer: any;
  chain: string;
}) => {
  if (!signer) return;

  const sdk = ThirdwebSDK.fromSigner(signer);
  const uintMax =
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  const contract = await sdk.getContract(
    USDCContract[networkChainId(chain)],
    USDCABI,
  );
  try {
    const tx = await contract.call('approve', [
      CometContract[networkChainId(chain)],
      uintMax,
    ]);
    return tx;
  } catch (e) {
    logger(JSON.stringify(e, null, 2), 'error');
    return null;
  }
};

const depositZeroDevAccount = async ({
  zerodevDepositAccount,
  amount,
  currency,
  chain,
  signer,
}: {
  zerodevDepositAccount: string;
  amount: number | string;
  currency: string;
  chain: string;
  signer: any;
}) => {
  if (!signer || !zerodevDepositAccount || Number(amount) <= 0) return null;

  const sdk = ThirdwebSDK.fromSigner(signer);
  try {
    if (currency === 'ETH') {
      const txResult = await sdk.wallet.transfer(zerodevDepositAccount, amount);
      return txResult;
    }
    const txResult = await sdk.wallet.transfer(
      zerodevDepositAccount,
      amount,
      USDCContract[networkChainId(chain)],
    );
    return txResult;
  } catch (e) {
    logger(JSON.stringify(e, null, 2), 'error');
    return null;
  }
};

const deposit = async ({
  amount,
  signer,
  chain,
}: {
  amount: number | string;
  signer: any;
  chain: string;
}) => {
  if (!signer) return;

  const sdk = ThirdwebSDK.fromSigner(signer);
  const contract = await sdk.getContract(
    WETHContract[networkChainId(chain)],
    WETHABI,
  );

  try {
    const tx = await contract.call('deposit', [], {
      value: ethers.utils.parseEther(amount.toString()),
    });
    return tx;
  } catch (e) {
    logger(JSON.stringify(e, null, 2), 'error');
    return null;
  }
};

const wethToETH = async ({
  amount,
  signer,
  chain,
}: {
  amount: number | string;
  signer: any;
  chain: string;
}) => {
  if (!signer) return;

  const sdk = ThirdwebSDK.fromSigner(signer);
  const contract = await sdk.getContract(
    WETHContract[networkChainId(chain)],
    WETHABI,
  );

  try {
    const tx = await contract.call('withdraw', [
      ethers.utils.parseEther(amount.toString()),
    ]);
    return tx;
  } catch (e) {
    logger(JSON.stringify(e, null, 2), 'error');
    return null;
  }
};

const addCollateral = async ({
  amount,
  signer,
  chain,
}: {
  amount: number | string;
  signer: any;
  chain: string;
}) => {
  if (!signer) return;

  const sdk = ThirdwebSDK.fromSigner(signer);
  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );

  try {
    const tx = await contract.call('supply', [
      WETHContract[networkChainId(chain)],
      parseBalance(amount.toString()),
    ]);
    return tx;
  } catch (e) {
    logger(JSON.stringify(e, null, 2), 'error');
    return null;
  }
};

const addLoan = async ({
  amount,
  signer,
  chain,
}: {
  amount: number | string;
  signer: any;
  chain: string;
}) => {
  if (!signer) return;

  const sdk = ThirdwebSDK.fromSigner(signer);
  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );

  try {
    const tx = await contract.call('supply', [
      USDCContract[networkChainId(chain)],
      parseBalance(amount.toString(), 6),
    ]);
    return tx;
  } catch (e) {
    logger(JSON.stringify(e, null, 2), 'error');
    return null;
  }
};

const borrowLoan = async ({
  amount,
  signer,
  chain,
}: {
  amount: number | string;
  signer: any;
  chain: string;
}) => {
  if (!signer) return;

  const sdk = ThirdwebSDK.fromSigner(signer);
  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );

  try {
    const tx = await contract.call('withdraw', [
      USDCContract[networkChainId(chain)],
      parseBalance(amount.toString(), 6),
    ]);
    return tx;
  } catch (e) {
    logger(JSON.stringify(e, null, 2), 'error');
    return null;
  }
};

const borrowCollateral = async ({
  amount,
  signer,
  chain,
}: {
  amount: number | string;
  signer: any;
  chain: string;
}) => {
  if (!signer) return;

  const sdk = ThirdwebSDK.fromSigner(signer);
  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );

  try {
    const tx = await contract.call('withdraw', [
      WETHContract[networkChainId(chain)],
      parseBalance(amount.toString()),
    ]);
    return tx;
  } catch (e) {
    logger(JSON.stringify(e, null, 2), 'error');
    return null;
  }
};

const claimReward = async ({
  address,
  signer,
  chain,
}: {
  address: string;
  signer: any;
  chain: string;
}) => {
  if (!address || !signer) return;

  const sdk = ThirdwebSDK.fromSigner(signer);
  const contract = await sdk.getContract(
    CometRewardContract[networkChainId(chain)],
    REWARDABI,
  );

  try {
    const tx = await contract.call('claim', [
      CometContract[networkChainId(chain)],
      address,
      true,
    ]);
    return tx;
  } catch (e) {
    logger(JSON.stringify(e, null, 2), 'error');
    return null;
  }
};

const getBorrowAPR = async (chain: string): Promise<number> => {
  const BLOCKCHAIN: BlockchainNames =
    chain === 'mainnet' ? 'ethereum' : (chain as BlockchainNames);

  const sdk = new ThirdwebSDK(BLOCKCHAIN);

  const contract = await sdk.getContract(
    CometContract[networkChainId(chain)],
    COMETABI,
  );
  const utilization = await contract.call('getUtilization');
  const borrowRate = await contract.call('getBorrowRate', [utilization]);
  const formattedRate = Number(ethers.utils.formatEther(borrowRate));
  const borrowAPR = formattedRate * 60 * 60 * 24 * 365 * 100;
  console.log({ borrowAPR });
  return borrowAPR;
};

export {
  approveWETH,
  approveUSDC,
  deposit,
  wethToETH,
  addCollateral,
  addLoan,
  borrowLoan,
  borrowCollateral,
  getBorrowAPR,
  getETHPrice,
  getLTV,
  getThreshold,
  getPenalty,
  getCollateralBalanceOf,
  getBorrowBalanceOf,
  getRewardAmount,
  getRewardRate,
  getLiquidationPrice,
  getBuffer,
  getMinCollateral,
  claimReward,
  depositZeroDevAccount,
};
