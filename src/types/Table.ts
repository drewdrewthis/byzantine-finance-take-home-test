export type RestakingProtocol = "EigenLayer" | "Symbiotic" | "Babylon";

export interface VaultToDisplay {
  address: string;
  name: string;
  description?: string;
  total_staked: number;
  apy: number;
  restaking_protocol: RestakingProtocol;
  AVS: AVStoDisplay[];
  risk_score: number;
  timestamp: number; // timestamp when the vault was created
  hash: string; // hash of the vault when it was created
  creator: string;
  curatorFee: number;
}

export interface AVStoDisplay {
  address: string; // Contract address of the AVS
  name: string;
  shortName?: string;
  description: string;
  image_url: string; // URL of the AVS's image or logo
  est_APY: number; // Estimated APY for the AVS
  byzantine_mark: number; // Risk score of the AVS
  timestamp_creation: string; // Creation timestamp of the AVS
  num_operators: number; // Number of strategies using this AVS
}
