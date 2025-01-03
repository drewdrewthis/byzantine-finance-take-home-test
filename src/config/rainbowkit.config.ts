import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { holesky } from 'viem/chains';
import { getEnv } from './getEnv';

export const rainbowkitConfig = getDefaultConfig({
  appName: 'Byzantine Finance Test App',
  projectId: getEnv().WALLETCONNECT_PROJECT_ID,
  chains: [holesky],
  // ssr: true, // If your dApp uses server side rendering (SSR)
});