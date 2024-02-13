import { Calculations } from "../src/lib/Calculations";
import BigNumber from "bignumber.js";
import { UnstakeInfoData } from "../src/models/class/UnstakeInfoData";
import { Utils } from "../src/common/utils";
import { IScoreSnapshot } from "../src/models/interface/IScoreSnapshot";
import { BLOCKS_PER_DAY } from "../src/common/constants";

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

    it("Test correctness of calculateStakingApr from test lisbon IscoreSnapshot event", () => {
        const eventData = [
            {
                transaction_hash: "0x29300b57d9c4990e40f79ff4b4198778400b06d0f613ab4314eea0d6a9cd55b7",
                log_index: 4,
                address: "cx43e2eec79eb76293c298f2b17aec06097be606e0",
                block_number: 77500935,
                method: "IscoreSnapshot",
                data: "null",
                indexed:
                    '["IscoreSnapshot(int,int,int)","0x49e9207","0x2e672ab8b1c0dd5168d","0x3ebeb1302b89332bec064f"]',
                block_timestamp: 1707623370700104,
            },
            {
                transaction_hash: "0x8bec54f089a789a41ca944af3fc33a43f4fc0e931b98a1b24d7f7c82fa01f536",
                log_index: 3,
                address: "cx43e2eec79eb76293c298f2b17aec06097be606e0",
                block_number: 77457053,
                method: "IscoreSnapshot",
                data: "null",
                indexed:
                    '["IscoreSnapshot(int,int,int)","0x49de69d","0x2e5766c3cca49735714","0x3eb31701e58fc3acdd854b"]',
                block_timestamp: 1707535541929145,
            },
        ];

        const lastIscoreSnapshot: IScoreSnapshot = Utils.parseIscoreSnapshot(eventData[0]);

        const prevIscoreSnapshot: IScoreSnapshot = Utils.parseIscoreSnapshot(eventData[1]);
        const blockHeightDiff = lastIscoreSnapshot.blockHeight.minus(prevIscoreSnapshot.blockHeight);
        const daysDiff = blockHeightDiff.dividedBy(BLOCKS_PER_DAY);
        const stakingFeePercent = new BigNumber("0.1");

        // if day diff is gt than 1, divide icxToClaim by number of the days
        const icxToClaim = daysDiff.gt(2)
            ? lastIscoreSnapshot.icxToClaim.dividedBy(daysDiff)
            : lastIscoreSnapshot.icxToClaim;

        const res = Calculations.calculateStakingApr(icxToClaim, stakingFeePercent, lastIscoreSnapshot.totalDelegation);
        const trueResult = new BigNumber("0.05931206896104748");

        expect(trueResult.toNumber()).toBe(res.toNumber());
    });
});
