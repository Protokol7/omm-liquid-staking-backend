import { Injectable } from "@nestjs/common";
import BigNumber from "bignumber.js";
import { IconApiService } from "./icon-api.service";
import { AppService } from "../app.service";
import { ScoreMethodNames } from "../common/score-method-names";
import { IconTransactionType } from "../models/enum/IconTransactionType";
import { Utils } from "../common/utils";
import { AllAddresses } from "../models/interface/AllAddresses";
import { Mapper } from "../common/mapper";
import { CacheService } from "./cache.service";
import { UnstakeInfoData } from "../models/class/UnstakeInfoData";
import { HexString } from "../models/Types";
import { IconNetworkInfo } from "../models/class/IconNetworkInfo";
import { IISSInfo } from "../models/interface/IISSInfo";
import { IDelegations } from "../models/interface/IDelegations";

@Injectable()
export class ScoreService {
    constructor(
        private iconApiService: IconApiService,
        private appService: AppService,
        private cacheService: CacheService,
    ) {
        this.fetchtAllScoreAddresses().then((res) => {
            this.cacheService.allAddresses = res;
        });
    }

    /**
     * @description Get all users unstake info
     * @return  list of un-staking requests in Staking SCORE queue
     */
    public async getStakingFeePercentage(): Promise<BigNumber> {
        const allAddresses = await this.getAllAddresses();

        const tx = this.iconApiService.buildTransaction(
            "",
            allAddresses.systemContract.Staking,
            ScoreMethodNames.GET_FEE_PERCENTAGE,
            {},
            IconTransactionType.READ,
        );

        const res: HexString = await this.iconApiService.iconService.call(tx).execute();

        return Utils.hexToNormalisedNumber(res).dividedBy(100);
    }

    /**
     * @description Get all users unstake info
     * @return  list of un-staking requests in Staking SCORE queue
     */
    public async getUnstakeInfo(): Promise<UnstakeInfoData[]> {
        const allAddresses = await this.getAllAddresses();

        const tx = this.iconApiService.buildTransaction(
            "",
            allAddresses.systemContract.Staking,
            ScoreMethodNames.GET_UNSTAKE_INFO,
            {},
            IconTransactionType.READ,
        );

        const res: Array<Array<HexString>> = await this.iconApiService.iconService.call(tx).execute();

        return Mapper.mapUnstakeInfo(res);
    }

    /**
     * @description Get network delegation info for sICX (not normalised!)
     */
    public async getSicxNetworkInfo(): Promise<IconNetworkInfo> {
        const [iissInfo, totalSicxDelegation] = await Promise.all([this.getIISSInfo(), this.getTotalSicxDelegation()]);

        return Mapper.mapIconNetworkInfo(iissInfo, totalSicxDelegation);
    }

    /**
     * @description Get Icon blockchain IISS network info
     */
    public async getIISSInfo(): Promise<IISSInfo> {
        const tx = this.iconApiService.buildTransaction(
            "",
            this.appService.getIissApiScoreAddress(),
            ScoreMethodNames.GET_IISS_INFO,
            {},
            IconTransactionType.READ,
        );

        return this.iconApiService.iconService.call(tx).execute();
    }

    /**
     * @description Get total delegation to sICX staking contract
     */
    public async getTotalSicxDelegation(): Promise<HexString> {
        const allAddresses = await this.getAllAddresses();

        const tx = this.iconApiService.buildTransaction(
            "",
            this.appService.getIissApiScoreAddress(),
            ScoreMethodNames.GET_DELEGATION,
            {
                address: allAddresses.systemContract.Staking,
            },
            IconTransactionType.READ,
        );

        const res: IDelegations = await this.iconApiService.iconService.call(tx).execute();

        return res.totalDelegated;
    }

    public async getAllAddresses(): Promise<AllAddresses> {
        if (!this.cacheService.allAddresses) {
            this.cacheService.allAddresses = await this.fetchtAllScoreAddresses();
            return this.cacheService.allAddresses;
        } else {
            return this.cacheService.allAddresses;
        }
    }

    public async getIRC2TokenBalance(address: string, scoreAddress: string): Promise<BigNumber> {
        const tx = this.iconApiService.buildTransaction(
            "",
            scoreAddress,
            ScoreMethodNames.BALANCE_OF,
            {
                _owner: address,
            },
            IconTransactionType.READ,
        );

        const res = await this.iconApiService.iconService.call(tx).execute();

        return Utils.hexToNormalisedNumber(res);
    }

    /**
     * @description Get all SCORE addresses (collateral, oTokens, System Contract, ..)
     * @return  List os collateral, oTokens and System Contract addresses
     */
    public async fetchtAllScoreAddresses(): Promise<AllAddresses> {
        const tx = this.iconApiService.buildTransaction(
            "",
            this.appService.getAddressProviderScore(),
            ScoreMethodNames.GET_ALL_ADDRESSES,
            {},
            IconTransactionType.READ,
        );
        return this.iconApiService.iconService.call(tx).execute();
    }
}
