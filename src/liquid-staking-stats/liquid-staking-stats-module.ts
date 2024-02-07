import { Module } from "@nestjs/common";
import { LiquidStakingStatsService } from "./liquid-staking-stats.service";
import { MongooseModule } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate";
import { LiquidStakingStats, LiquidStakingStatsSchema } from "./schemas/liquid-staking-stats-schema";
import { ScoreService } from "../services/score.service";
import { CacheService } from "../services/cache.service";
import { IconApiService } from "../services/icon-api.service";
import { HttpModule } from "@nestjs/axios";
import { LiquidStakingStatsController } from "./liquid-staking-stats-controller";
import { CacheModule } from "@nestjs/cache-manager";
import { EnvConfigModule } from "../config/env-config.module";

@Module({
    imports: [
        EnvConfigModule,
        HttpModule,
        MongooseModule.forFeature([
            { name: LiquidStakingStats.name, schema: LiquidStakingStatsSchema.plugin(mongoosePaginate) },
        ]),
        CacheModule.register({
            ttl: 21600, // 6 hours cache
        }),
    ],
    controllers: [LiquidStakingStatsController],
    providers: [LiquidStakingStatsService, ScoreService, CacheService, IconApiService],
    exports: [LiquidStakingStatsService],
})
export class LiquidStakingStatsModule {}
