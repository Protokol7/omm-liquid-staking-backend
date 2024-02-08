import BigNumber from "bignumber.js";

export interface IScoreSnapshot {
    blockHeight: BigNumber;
    icxToClaim: BigNumber;
    totalDelegation: BigNumber;
}
