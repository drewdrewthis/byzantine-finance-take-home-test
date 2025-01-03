import { BYZETH_VAULT_ABI } from "./byzETHVault.abi";

// ABI for the main functions we need
export const BYZETH_VAULT_ADDRESS = '0xf6ceae45825f961851917EFca73d35cF7601A88a';

// Contract configuration
export const CONTRACT_CONFIG = {
  address: BYZETH_VAULT_ADDRESS,
  abi: BYZETH_VAULT_ABI,
} as const; 