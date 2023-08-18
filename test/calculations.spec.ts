import { Calculations } from "../src/lib/Calculations";
import BigNumber from "bignumber.js";
import { UnstakeInfoData } from "../src/models/class/UnstakeInfoData";

describe("Calculations tests", () => {
    // Network info data
    let IGlobal: BigNumber;
    let Ivoter: BigNumber;
    let totalDelegated: BigNumber;
    let stakingFeePercent: BigNumber;

    beforeEach(async () => {
        IGlobal = new BigNumber("3000000");
        Ivoter = new BigNumber("77");
        totalDelegated = new BigNumber("433494628.6989329");
        stakingFeePercent = new BigNumber("0.1");
    });

    it("Test correctness of calculateTotalUnstakingRequestSum", () => {
        const result = Calculations.calculateTotalUnstakingRequestSum([
            new UnstakeInfoData(1, new BigNumber(10), new BigNumber(2555555), "", ""),
            new UnstakeInfoData(2, new BigNumber(10), new BigNumber(2555555), "", ""),
            new UnstakeInfoData(3, new BigNumber(10), new BigNumber(2555555), "", ""),
        ]);

        const totalSum = 30;

        expect(result.isEqualTo(totalSum)).toBeTruthy();
    });

    it("Test correctness of calculateSicxApy", () => {
        const result = Calculations.calculateSicxApy(IGlobal, Ivoter, totalDelegated, stakingFeePercent);
        const trueResult = new BigNumber("0.05755088609719932");

        expect(result.toNumber()).toBeCloseTo(trueResult.toNumber());
    });
});
