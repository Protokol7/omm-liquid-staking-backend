import { IsDate } from "class-validator";
import { Prop } from "@nestjs/mongoose";

export class LiquidStakingStatsDataDto {
    @IsDate()
    time: Date;

    @Prop({ required: true, min: 0 })
    totalUnstakingRequestSum: number;

    @Prop({ required: true, min: 0 })
    stakingApr: number;

    constructor(time: Date, totalUnstakingRequestSum: number, stakingApr: number) {
        this.time = time;
        this.totalUnstakingRequestSum = totalUnstakingRequestSum;
        this.stakingApr = stakingApr;
    }
}
