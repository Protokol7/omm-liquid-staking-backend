import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { LiquidStakingStatsService } from "../liquid-staking-stats/liquid-staking-stats.service";

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(private readonly unstakingRequestsService: LiquidStakingStatsService) {}

    @Cron("0 59 5,11,17,23 * * *")
    async handleCron() {
        // triggered on 5:59, 11:59, 17:59, 23:59
        try {
            this.logger.log("Creating snapshot..");
            await this.unstakingRequestsService.snapshotLiquidStakingStats();
            this.logger.log("Snapshot created!");
        } catch (e) {
            this.logger.error("Failed to create liquid staking stats snapshot");
            this.logger.error(e);
        }
    }
}
