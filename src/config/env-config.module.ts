import { Module } from "@nestjs/common";
import { EnvConfigService } from "./env-config/env-config.service";
import { ConfigService } from "@nestjs/config";

@Module({
    providers: [EnvConfigService, ConfigService],
    exports: [EnvConfigService],
})
export class EnvConfigModule {}
