import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { LiquidStakingStatsService } from "../liquid-staking-stats/liquid-staking-stats.service";

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(private readonly unstakingRequestsService: LiquidStakingStatsService) {}

    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async handleCron() {
        // triggered every day at 10am
        try {
            await this.unstakingRequestsService.snapshotLiquidStakingStats();
        } catch (e) {
            this.logger.error("Failed to create liquid staking stats snapshot");
            this.logger.error(e);
        }
    }
}
