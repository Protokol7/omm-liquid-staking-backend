import { Calculations } from "../src/lib/Calculations";
import BigNumber from "bignumber.js";
import { UnstakeInfoData } from "../src/models/class/UnstakeInfoData";
import { Utils } from "../src/common/utils";

describe("Calculations tests", () => {
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
        const IGlobal = new BigNumber("3000000");
        const Ivoter = new BigNumber("77");
        const totalDelegated = new BigNumber("433494628.6989329");
        const stakingFeePercent = new BigNumber("0.1");
        const result = Calculations.calculateStakingAprOld(IGlobal, Ivoter, totalDelegated, stakingFeePercent);
        const trueResult = new BigNumber("0.05755088609719932");

        expect(result.toNumber()).toBeCloseTo(trueResult.toNumber());
    });

    it("Test correctness of calculateSicxApy from hex lisbon", () => {
        const iGlobal = Utils.hexToNormalisedNumber("0x27b46536c66c8e3000000");
        const totalDelegated = Utils.hexToNormalisedNumber("0x17e42d96d7d3a957af48c");
        const iVoter = new BigNumber("0x4d");
        const stakingFeePercent = new BigNumber("0.1");

        const result = Calculations.calculateStakingAprOld(iGlobal, iVoter, totalDelegated, stakingFeePercent);
        const trueResult = new BigNumber("13.820250281507718");

        expect(result.toNumber()).toBeCloseTo(trueResult.toNumber());
    });

    it("Test correctness of calculateStakingApr from lisbon IscoreSnapshot event", () => {
        const icxToClaim = Utils.hexToNormalisedNumber("0x2731f0bdd8035151284");
        const totalDelegation = Utils.hexToNormalisedNumber("0x18d34bb984e971c04732b");
        const stakingFeePercent = new BigNumber("0.1");

        const result = Calculations.calculateStakingApr(icxToClaim, stakingFeePercent, totalDelegation);
        const trueResult = new BigNumber("2.025961352441791");

        expect(result.toNumber()).toBeCloseTo(trueResult.toNumber());
    });
});
