import { HexString } from "../models/Types";
import { UnstakeInfoData } from "../models/class/UnstakeInfoData";
import { Utils } from "./utils";
import { IconNetworkInfo } from "../models/class/IconNetworkInfo";
import { IISSInfo } from "../models/interface/IISSInfo";

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

    public static mapIconNetworkInfo(iissInfo: IISSInfo, totalSicxDelegation: HexString): IconNetworkInfo {
        return new IconNetworkInfo(
            Utils.hexToBigNumber(iissInfo.variable.Iglobal),
            Utils.hexToBigNumber(iissInfo.variable.Ivoter),
            Utils.hexToBigNumber(totalSicxDelegation),
        );
    }
}
