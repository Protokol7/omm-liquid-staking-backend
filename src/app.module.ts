import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "./logger-middleware.middleware";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";
import { LiquidStakingStatsModule } from "./liquid-staking-stats/liquid-staking-stats-module";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerModule } from "@nestjs/throttler";
import { EnvConfigModule } from "./config/env-config.module";
import { TasksModule } from "./tasks/tasks.module";

const ENV = process.env.NODE_ENV ?? "dev";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${ENV}`,
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        MongooseModule.forRoot(process.env.DATABASE_URL ?? "mongodb://localhost:27017/omm-dev", {
            tlsInsecure: true,
        }),
        HttpModule,
        LiquidStakingStatsModule,
        ScheduleModule.forRoot(),
        EnvConfigModule,
        TasksModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
