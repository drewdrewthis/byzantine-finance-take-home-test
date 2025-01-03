import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';


/**
 * Test Note:
 * 
 * This is just using the default RainbowKit ConnectButton and is unstyled.
 * 
 * We'd need to style it to match the design, but in a production app
 * we'd want to use a custom component for full control.
 */
export const WalletConnectButton = () => {
  return <ConnectButton />;
};