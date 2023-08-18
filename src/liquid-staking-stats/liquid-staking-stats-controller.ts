import { Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { LiquidStakingStatsService } from "./liquid-staking-stats.service";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller("liquid-staking-stats")
@UseInterceptors(CacheInterceptor)
export class LiquidStakingStatsController {
    constructor(private readonly liquidStakingStatsService: LiquidStakingStatsService) {}

    @Get("/dates/between")
    findAllDatesBetween(@Query("from") from: string, @Query("to") to: string) {
        return this.liquidStakingStatsService.findBetween(from, to);
    }

    @Get(":date")
    findOne(@Param("date") date: string) {
        return this.liquidStakingStatsService.findOne(date);
    }

    @Get()
    findAll() {
        return this.liquidStakingStatsService.findAll();
    }
}
