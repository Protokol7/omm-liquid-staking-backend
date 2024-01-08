import { Address, HexString } from "../Types";

export interface IDelegations {
    delegations: {
        address: Address;
        value: HexString;
    };
    totalDelegated: HexString;
    votingPower: HexString;
}
