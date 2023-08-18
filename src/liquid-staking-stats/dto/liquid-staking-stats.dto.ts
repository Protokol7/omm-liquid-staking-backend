import { IsArray, IsDate, IsNotEmpty } from "class-validator";
import { LiquidStakingStatsDataDto } from "./liquid-staking-stats-data.dto";

export class LiquidStakingStatsDto {
    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsArray()
    data: LiquidStakingStatsDataDto[];

    constructor(date: Date, data: LiquidStakingStatsDataDto[]) {
        this.date = date;
        this.data = data;
    }
}
