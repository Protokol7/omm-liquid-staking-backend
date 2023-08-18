import { HexString } from "../models/Types";
import { UnstakeInfoData } from "../models/class/UnstakeInfoData";
import { Utils } from "./utils";
import { IIconNetworkInfo } from "../models/interface/IIconNetworkInfo";
import { IconNetworkInfo } from "../models/class/IconNetworkInfo";

export abstract class Mapper {
    public static mapUnstakeInfo(value: Array<Array<HexString>>): UnstakeInfoData[] {
        return value.map((unstakeinfo) => {
            return new UnstakeInfoData(
                Utils.hexToBigNumber(unstakeinfo[0]).toNumber(),
                Utils.hexToNormalisedNumber(unstakeinfo[1]),
                Utils.hexToBigNumber(unstakeinfo[3]),
                unstakeinfo[2],
                unstakeinfo[4],
            );
        });
    }

    public static mapIconNetworkInfo(value: IIconNetworkInfo): IconNetworkInfo {
        return new IconNetworkInfo(
            Utils.hexToNormalisedNumber(value.rewardFund.Iglobal),
            Utils.hexToBigNumber(value.rewardFund.Ivoter),
            Utils.hexToNormalisedNumber(value.totalDelegated),
        );
    }
}
