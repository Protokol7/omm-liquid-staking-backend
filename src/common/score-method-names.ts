export class ScoreMethodNames {
    /**
     * AddressProvider SCORE
     */
    public static GET_ALL_ADDRESSES = "getAllAddresses";

    /**
     * LendingPool SCORE
     */
    public static DEPOSIT = "deposit";
    public static REDEEM = "redeem";
    public static BORROW = "borrow";

    /**
     * IRC2 interface methods
     */
    public static TRANSFER = "transfer";
    public static BALANCE_OF = "balanceOf";
    public static AVAILABLE_BALANCE_OF = "availableBalanceOf";

    /**
     * LendingPoolDataProvider SCORE
     */
    public static GET_USER_RESERVE_DATA = "getUserReserveData";
    public static GET_USER_ALL_RESERVE_DATA = "getUserAllReserveData";
    public static GET_USER_CLAIMABLE_ICX = "claimableICX";
    public static GET_ALL_RESERVE_DATA = "getAllReserveData";
    public static GET_SPECIFIC_RESERVE_DATA = "getReserveData";
    public static GET_USER_ACCOUNT_DATA = "getUserAccountData";
    public static GET_RESERVE_CONFIGURATION_DATA = "getReserveConfigurationData";
    public static GET_ALL_RESERVE_CONFIGURATION_DATA = "getAllReserveConfigurationData";
    public static GET_TOKEN_DISTRIBUTION_PER_DAY = "tokenDistributionPerDay";
    public static GET_LOAN_ORIGINATION_FEE_PERCENTAGE = "getLoanOriginationFeePercentage";
    public static GET_USER_REALTIME_DEBT = "getRealTimeDebt";
    public static GET_DIST_PERCENTAGES = "getDistPercentages";

    /**
     * Rewards SCORE
     */
    public static GET_OMM_REWARDS_PER_USER = "getRewards";
    public static GET_USER_DAILY_OMM_REWARDS = "getUserDailyReward";
    public static GET_OMM_TOKEN_BALANCE_DETAILS = "details_balanceOf";
    public static GET_DIST_PERCENTAGE_ALL_POOLS = "distPercentageOfAllLP";
    public static GET_ALL_ASSET_DIST_PERCENTAGE = "getAllAssetDistributionPercentage";
    public static GET_DAILY_REWARDS_RESERVES_POOLS = "getDailyRewards";
    public static GET_DAY = "getDay";
    public static GET_WORKING_TOTAL = "getWorkingTotal";
    public static GET_WORKING_BALANCES = "getWorkingBalances";

    /**
     * FeeDistribution SCORE
     */
    public static GET_VALIDATOR_COLLECTED_FEE = "getValidatorCollectedFee";
    public static GET_ACCUMULATED_FEE = "getAccumulatedFee";
    public static CLAIM_REWARDS = "claimRewards";
    public static GET_COLLECTED_FEE = "getCollectedFee";
    public static GET_ALL_COLLECTED_FEES = "getAllCollectedFees";

    /**
     * OmmToken SCORE
     */
    public static UNSTAKE_OMM = "unstake";
    public static CANCEL_UNSTAKE_OMM = "cancelUnstake";
    public static STAKE_OMM = "stake";
    public static GET_MIN_STAKE = "getMinimumStake";
    public static GET_TOTAL_STAKED_OMM = "total_staked_balance";
    public static TEST_MINT = "testMint";
    public static TOTAL_STAKED_OMM_AT = "totalStakedBalanceOfAt";
    public static TOTAL_SUPPLY = "totalSupply";
    public static MIGRATE_STAKED_OMM = "migrateStakedOMM";

    /**
     * bOMM SCORE
     */
    public static GET_LOCKED_OMM = "getLocked";
    public static INCREASE_UNLOCK_TIME = "increaseUnlockTime";
    public static WITHDRAW_LOCKED_OMM = "withdraw";
    public static ACTIVE_USERS_COUNT = "activeUsersCount";

    /**
     * Balanced DEX SCORE
     */
    public static GET_PRICE_BY_NAME = "getPriceByName";
    public static GET_POOL_STATS = "getPoolStats";
    public static GET_POOL_TOTAL: "getPoolTotal";
    public static GET_FEES = "getFees";

    /**
     * Delegation SCORE
     */
    public static GET_USER_DELEGATION_DETAILS = "getUserDelegationDetails";
    public static UPDATE_DELEGATIONS = "updateDelegations";
    public static CLEAR_PREVIOUS_DELEGATIONS = "clearPrevious";
    public static GET_WORKING_TOTAL_SUPPLY = "getWorkingTotalSupply";
    public static GET_USER_WORKING_BALANCE = "getWorkingBalance";
    public static PREP_VOTES = "prepVotes";
    public static UPDATE_DELEGATION_AT_ONCE = "updateDelegationAtOnce";

    /**
     * Governance SCORE
     */
    public static GET_PROPOSALS = "getProposals";
    public static GET_PROPOSAL_COUNT = "getProposalCount";
    public static GET_VOTERS_COUNT = "getVotersCount";
    public static GET_VOTES_OF_USER = "getVotesOfUser";
    public static GET_USERS_VOTING_WEIGHT = "myVotingWeight";
    public static GET_VOTE_DEFINITION_FEE = "getVoteDefinitionFee";
    public static CAST_VOTE = "castVote";
    public static CANCEL_VOTE_ON_PROPOSAL = "cancelVote";
    public static MY_VOTING_WEIGHT = "myVotingWeight";
    public static GET_BOOSTED_OMM_VOTE_DEFINITION_CRITERION = "getBoostedOmmVoteDefinitionCriterion";
    public static GET_VOTE_DURATION = "getVoteDuration";
    public static GET_SUPPORTED_CONTRACTS = "getSupportedContracts";
    public static GET_SUPPORTED_METHODS_OF_CONTRACT = "getSupportedMethodsOfContract";

    /**
     * Staking SCORE
     */
    public static GET_TODAY_RATE = "getTodayRate";
    public static GET_TOTAL_STAKE = "getTotalStake";
    public static GET_PREP_TOP_LIST = "getTopPreps";
    public static CLAIM_UNSTAKED_ICX = "claimUnstakedICX";
    public static STAKE_ICX = "stakeICX";
    public static UNSTAKE_sICX = "unstake";
    public static GET_USER_UNSTAKE_INFO = "getUserUnstakeInfo";
    public static GET_ACTUAL_PREP_DELEGATIONS = "getActualPrepDelegations";
    public static GET_ACTUAL_USER_PREP_DELEGATIONS = "getActualUserDelegationPercentage";
    public static GET_BOMM_DELEGATIONS = "getbOMMDelegations";
    public static DELEGATE = "delegate";
    public static GET_UNDELEGATED_ICX = "getUndelegatedICX";
    public static GET_UNSTAKE_INFO = "getUnstakeInfo";
    public static GET_FEE_PERCENTAGE = "getFeePercentage";

    /**
     * Price Oracle SCORE
     */
    public static GET_REFERENCE_DATA = "get_reference_data";

    /**
     * StakedLp SCORE
     */
    public static GET_BALANCE_BY_POOL = "getBalanceByPool";
    public static GET_POOL_BALANCE_BY_USER = "getPoolBalanceByUser";
    public static POOL_UNSTAKE = "unstake";

    /**
     * IISS APIs
     */
    public static GET_PREPS = "getPReps";
    public static GET_PREP = "getPRep";
    public static GET_IISS_INFO = "getIISSInfo";
    public static GET_NETWORK_INFO = "getNetworkInfo";
    public static GET_DELEGATION = "getDelegation";

    public static GET_NAME = "name";
}
