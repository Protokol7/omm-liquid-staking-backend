export interface AllAddresses {
    systemContract: SystemContract;
    collateral: CollateralContracts;
}

interface CollateralContracts {
    OMM: string;
    sICX: string;
}

interface SystemContract {
    DEX: string;
    DaoFund: string;
    Governance: string;
    LendingPool: string;
    LendingPoolDataProvider: string;
    Staking: string;
    Rewards: string;
    OmmToken: string;
    Delegation: string;
    FeeDistribution: string;
    PriceOracle: string;
    RewardWeightController: string;
    StakedLp: string;
    bOMM: string;
}
