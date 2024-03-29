import BigNumber from "bignumber.js";
import { UnstakeInfoData } from "../models/class/UnstakeInfoData";
import { MONTHS_IN_YEAR, ONE, PERCENT_DENOMINATOR } from "../common/constants";

export abstract class Calculations {
    public static calculateTotalUnstakingRequestSum(unstakeInfoData: UnstakeInfoData[]): BigNumber {
        return unstakeInfoData.reduce((sum, current) => sum.plus(current.amount), new BigNumber(0));
    }

    // Equation: sICX APY = (“Monthly inflation” * 12/”Voted Amount”) * (“Voter Reward Rate”/100) * 0.9
    // Equal to: (Iglobal * 12/ totalDelegated) * (Ivoter / 100) * 0.9
    static calculateStakingAprOld(
        Iglobal: BigNumber,
        IVoter: BigNumber,
        totalDelegated: BigNumber,
        stakingFeePercent: BigNumber,
    ): BigNumber {
        return Iglobal.multipliedBy(MONTHS_IN_YEAR)
            .dividedBy(totalDelegated)
            .multipliedBy(IVoter.dividedBy(PERCENT_DENOMINATOR))
            .multipliedBy(ONE.minus(stakingFeePercent));
    }

    static calculateStakingApr(icxToClaim: BigNumber, feePercentage: BigNumber, totalDelegation: BigNumber): BigNumber {
        if (totalDelegation.isZero() || icxToClaim.isZero() || feePercentage.isZero()) {
            return new BigNumber(0);
        }

        const feeCut = icxToClaim.minus(icxToClaim.multipliedBy(feePercentage));

        return feeCut.dividedBy(totalDelegation).multipliedBy(365);
    }
}
