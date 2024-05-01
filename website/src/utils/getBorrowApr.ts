import * as chains from 'wagmi/chains'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

const NETWORK = process.env.GATSBY_BLOCKCHAIN_NETWORK || 'sepolia'
const BLOCKCHAIN = NETWORK === 'mainnet' ? 'ethereum' : NETWORK
const COMETABI = require('./comet.json')

const networkChainId = (chains as { [key: string]: any })[NETWORK]?.id

// See https://docs.compound.finance/#networks
const CometContract: { [key: number]: string } = {
  [chains.mainnet.id]: '0xc3d688B66703497DAA19211EEdff47f25384cdc3',
  [chains.sepolia.id]: '0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e',
  [chains.base.id]: '0xb125E6687d4313864e53df431d5425969c15Eb2F',
}

export const getBorrowAPR = async (): Promise<number> => {
  const sdk = new ThirdwebSDK(BLOCKCHAIN)

  const contract = await sdk.getContract(
    CometContract[networkChainId],
    COMETABI,
  )
  const utilization = await contract.call('getUtilization')
  const borrowRate = await contract.call('getBorrowRate', [utilization])

  const formattedRate = Number(ethers.utils.formatEther(borrowRate))
  const borrowAPR = formattedRate * 60 * 60 * 24 * 365 * 100
  return borrowAPR
}

export default getBorrowAPR
