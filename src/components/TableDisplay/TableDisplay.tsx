// @/components/TableDisplay/TableDisplay.tsx

import React from "react";
import Image from "next/image";
import { VaultToDisplay } from "@/types/Table";
import styles from "./TableDisplay.module.scss";
import ETH from "@/assets/tokens/ETH.png";

const ETH_PRICE = 4021.5245641;

function formatNumber(number: number): string {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(2) + "B";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(2) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(2) + "k";
  }
  return number.toFixed(2).toString();
}

//display all name and addresses in a table
export default function TableDisplay({ data }: { data: VaultToDisplay[] }) {
  return (
    <div className={styles.containerVaults}>
      <table className={styles.contentVaults}>
        <thead>
          <tr className={`${styles.lineTable} ${styles.headerTable}`}>
            <th>Name</th>
            <th className={styles.totalStakeTab}>Total Stake</th>
            <th>APY</th>
            <th>Address</th>
            <th className={styles.avsTab}>AVS</th>
            <th className={styles.riskScoreTab}>Risk Score</th>
            <th className={styles.timestampTab}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vault) => (
            <tr key={vault.address} className={styles.lineTable}>
              <td>{vault.name}</td>
              <td className={styles.totalStakeTab}>
                <Image src={ETH} alt="ETH" width={18} height={18} />
                <span>{vault.total_staked.toFixed(1)} ETH</span>
                <span className={styles.valueInUSD}>
                  {formatNumber(vault.total_staked * ETH_PRICE)} $
                </span>
              </td>
              <td>{vault.apy}%</td>
              <td title={vault.address}>
                {vault.address.slice(0, 5)}...{vault.address.slice(-3)}
              </td>

              {/* display images of the AVS, max 5 */}
              <td className={styles.avsTab}>
                {vault.AVS.slice(0, 5).map((avs) => (
                  <div
                    key={avs.address}
                    className={styles.divImg}
                    title={avs.name}
                  >
                    <img key={avs.address} src={avs.image_url} alt={avs.name} />
                  </div>
                ))}
                {vault.AVS.length > 5 && (
                  <div className={styles.moreAvs}>+{vault.AVS.length - 5}</div>
                )}
              </td>
              <td className={styles.riskScoreTab}>
                {vault.risk_score.toFixed(2)}
              </td>
              <td className={styles.timestampTab}>
                <span>from</span>
                {new Date(vault.timestamp * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
