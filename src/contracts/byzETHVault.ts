// ABI for the main functions we need
import BYZETH_VAULT_ABI_JSON from "./byzETHVault.abi.json";

export const BYZETH_VAULT_ADDRESS = '0xf6ceae45825f961851917EFca73d35cF7601A88a';
export const BYZETH_VAULT_ABI = BYZETH_VAULT_ABI_JSON;

// Contract configuration
export const CONTRACT_CONFIG = {
  address: BYZETH_VAULT_ADDRESS,
  abi: BYZETH_VAULT_ABI,
} as const; 