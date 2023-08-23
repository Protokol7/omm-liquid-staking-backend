import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./logger-middleware.middleware";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";
import { LiquidStakingStatsModule } from "./liquid-staking-stats/liquid-staking-stats-module";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksModule } from "./tasks/tasks.module";
import { ThrottlerModule } from "@nestjs/throttler";

const ENV = process.env.NODE_ENV || "dev";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: !ENV ? ".env" : `.env.${ENV}`,
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        MongooseModule.forRoot(process.env.DATABASE_URL, {
            tlsInsecure: true,
        }),
        HttpModule,
        LiquidStakingStatsModule,
        ScheduleModule.forRoot(),
        TasksModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }

    constructor(private configService: ConfigService) {
        console.log(`environment=${this.configService.get<string>("ENV")}`);
    }
}
