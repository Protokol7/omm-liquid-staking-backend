import { Injectable } from "@nestjs/common";
import { LiquidStakingStatsDto } from "./dto/liquid-staking-stats.dto";
import { InjectModel } from "@nestjs/mongoose";
import { LiquidStakingStats } from "./schemas/liquid-staking-stats-schema";
import { LiquidStakingStatsDataDto } from "./dto/liquid-staking-stats-data.dto";
import { ScoreService } from "../services/score.service";
import { Utils } from "../common/utils";
import { PaginateModel, PaginateResult } from "mongoose";
import { Calculations } from "../lib/Calculations";
import BigNumber from "bignumber.js";
import { STAKING_APY_DECIMALS, UNSTAKING_REQUESTS_DECIMALS } from "../common/constants";

@Injectable()
export class LiquidStakingStatsService {
    constructor(
        @InjectModel(LiquidStakingStats.name)
        private readonly liquidStakingStatstModel: PaginateModel<LiquidStakingStats>,
        private scoreService: ScoreService,
    ) {}

    async create(unstakingRequestDto: LiquidStakingStatsDto): Promise<LiquidStakingStats> {
        const unstakingRequestModel = new this.liquidStakingStatstModel(unstakingRequestDto);
        return unstakingRequestModel.save();
    }

    async snapshotLiquidStakingStats(): Promise<LiquidStakingStats> {
        const unstakeInfoData = await this.scoreService.getUnstakeInfo();
        const iconNetworkInfo = await this.scoreService.getIconNetworkInfo();
        const stakingFeePercent = await this.scoreService.getStakingFeePercentage();

        const totalUnstakingRequestSum = Calculations.calculateTotalUnstakingRequestSum(unstakeInfoData).dp(
            UNSTAKING_REQUESTS_DECIMALS,
            BigNumber.ROUND_DOWN,
        );
        const sicxApy = Calculations.calculateSicxApy(
            iconNetworkInfo.Iglobal,
            iconNetworkInfo.Ivoter,
            iconNetworkInfo.totalDelegated,
            stakingFeePercent,
        ).dp(STAKING_APY_DECIMALS, BigNumber.ROUND_HALF_UP);

        const currentDateString = Utils.getCurrentDateOnlyString();
        const dateOnlyNow = new Date(currentDateString);
        const dateTimeNow = new Date();

        const liquidStakingStats = await this.findOne(currentDateString);

        // if unstake request for given date exist, update it
        if (liquidStakingStats) {
            liquidStakingStats.data.push(
                new LiquidStakingStatsDataDto(dateTimeNow, totalUnstakingRequestSum.toNumber(), sicxApy.toNumber()),
            );

            return liquidStakingStats.save();
        } else {
            // create new one
            const newUnstakingRequest = new LiquidStakingStatsDto(dateOnlyNow, [
                new LiquidStakingStatsDataDto(dateTimeNow, totalUnstakingRequestSum.toNumber(), sicxApy.toNumber()),
            ]);

            return this.create(newUnstakingRequest);
        }
    }

    async findBetween(from: string, to: string, page = 1, limit = 365): Promise<PaginateResult<LiquidStakingStats>> {
        // "from" and "to" are  in ISO date only format e.g. "2020-07-25"
        const options = {
            lean: false,
            page: Number(page),
            limit: Number(limit),
        };

        const query = this.liquidStakingStatstModel
            .find({
                date: {
                    $gt: new Date(from),
                    $lte: new Date(to),
                },
            })
            .sort({ date: 1 });

        return this.liquidStakingStatstModel.paginate(query, options);
    }

    async findAll(page = 1, limit = 365): Promise<PaginateResult<LiquidStakingStats>> {
        const options = {
            lean: false,
            page: Number(page),
            limit: Number(limit),
        };

        const query = this.liquidStakingStatstModel.find().sort({ date: 1 }).select({ _id: 0, "data._id": 0 });

        return this.liquidStakingStatstModel.paginate(query, options);
    }

    async findAllDates(): Promise<LiquidStakingStats[]> {
        return this.liquidStakingStatstModel.find().select({ date: 1, _id: 0 }).exec();
    }

    async findOne(date: string): Promise<LiquidStakingStats | null> {
        // date is in ISO date only format e.g. "2020-07-25"
        return this.liquidStakingStatstModel
            .findOne({
                date: new Date(date),
            })
            .exec();
    }

    // async dropCollection(): Promise<boolean> {
    //   try {
    //     return await this.unstakingRequestModel.db.collection("unstakingrequests").drop();
    //   } catch (e) {
    //     console.log("Failed to drop collection unstakingrequests..");
    //     console.log("List of collections that exist:", this.unstakingRequestModel.db.collections);
    //     return false;
    //   }
    // }

    // async resetAndSeedDb(): Promise<UnstakingRequest[]> {
    //   await this.unstakingRequestModel.db.collection("unstakingrequests").drop();
    //   await this.seedDb();
    //   return this.unstakingRequestModel.find().exec();
    // }

    // async seedDb(): Promise<UnstakingRequest[]> {
    //   for (let month = 1; month <= 11; month++) {
    //     for (let i = 1; i < 29; i++) {
    //       const totalUnstakingRequestSum = i * 100;
    //       await this.create(
    //         new UnstakingRequestDto(new Date(`2022-${month}-${i}`), [
    //           new UnstakingRequestDataDto(new Date(), totalUnstakingRequestSum),
    //           new UnstakingRequestDataDto(new Date(), totalUnstakingRequestSum),
    //           new UnstakingRequestDataDto(new Date(), totalUnstakingRequestSum),
    //         ]),
    //       );
    //     }
    //   }
    //
    //   return this.unstakingRequestModel.find().exec();
    // }
}
