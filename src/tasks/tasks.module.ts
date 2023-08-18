import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { LiquidStakingStatsModule } from "../liquid-staking-stats/liquid-staking-stats-module";

@Module({
    providers: [TasksService],
    imports: [LiquidStakingStatsModule],
})
export class TasksModule {}
