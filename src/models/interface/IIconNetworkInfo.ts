import { HexString } from "../Types";

export interface IIconNetworkInfo {
    bondRequirement: HexString;
    consistentValidationPenaltyCondition: HexString;
    consistentValidationPenaltyMask: HexString;
    consistentValidationPenaltySlashRatio: HexString;
    delegationSlotMax: HexString;
    extraMainPRepCount: HexString;
    iissVersion: HexString;
    irep: HexString;
    lockMaxMultiplier: HexString;
    lockMinMultiplier: HexString;
    mainPRepCount: HexString;
    preps: HexString;
    proposalNonVotePenaltySlashRatio: HexString;
    rewardFund: {
        Icps: HexString;
        Iglobal: HexString;
        Iprep: HexString;
        Irelay: HexString;
        Ivoter: HexString;
    };
    rrep: HexString;
    subPRepCount: HexString;
    termPeriod: HexString;
    totalBonded: HexString;
    totalDelegated: HexString;
    totalPower: HexString;
    totalStake: HexString;
    unbondingMax: HexString;
    unbondingPeriodMultiplier: HexString;
    unstakeSlotMax: HexString;
    validationPenaltyCondition: HexString;
}

// Example
// {
//     "bondRequirement": "0x5",
//     "consistentValidationPenaltyCondition": "0x5",
//     "consistentValidationPenaltyMask": "0x1e",
//     "consistentValidationPenaltySlashRatio": "0x0",
//     "delegationSlotMax": "0x64",
//     "extraMainPRepCount": "0x3",
//     "iissVersion": "0x3",
//     "irep": "0x21e19e0c9bab2400000",
//     "lockMaxMultiplier": "0x14",
//     "lockMinMultiplier": "0x5",
//     "mainPRepCount": "0x16",
//     "preps": "0x9c",
//     "proposalNonVotePenaltySlashRatio": "0x0",
//     "rewardFund": {
//     "Icps": "0xa",
//         "Iglobal": "0x27b46536c66c8e3000000",
//         "Iprep": "0xd",
//         "Irelay": "0x0",
//         "Ivoter": "0x4d"
// },
//     "rrep": "0x4b0",
//     "subPRepCount": "0x4e",
//     "termPeriod": "0xa870",
//     "totalBonded": "0x1280154d36f509dc950000",
//     "totalDelegated": "0x166763729f328e689a30136",
//     "totalPower": "0x14543b813c6c8b51128f879",
//     "totalStake": "0x19463fe28212b382bdfdf2a",
//     "unbondingMax": "0x64",
//     "unbondingPeriodMultiplier": "0x7",
//     "unstakeSlotMax": "0x3e8",
//     "validationPenaltyCondition": "0x294"
// }
