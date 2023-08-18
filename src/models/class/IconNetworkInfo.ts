import BigNumber from "bignumber.js";

export class IconNetworkInfo {
    Iglobal: BigNumber;
    Ivoter: BigNumber;
    totalDelegated: BigNumber;

    constructor(Iglobal: BigNumber, Ivoter: BigNumber, totalDelegated: BigNumber) {
        this.Iglobal = Iglobal;
        this.Ivoter = Ivoter;
        this.totalDelegated = totalDelegated;
    }
}
