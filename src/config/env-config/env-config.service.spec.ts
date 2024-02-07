import { Test, TestingModule } from "@nestjs/testing";
import { EnvConfigService } from "./env-config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

describe("EnvConfigService", () => {
    let service: EnvConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: `.env.${process.env.NODE_ENV}`,
                }),
            ],
            providers: [EnvConfigService, ConfigService],
            exports: [EnvConfigService],
        }).compile();

        service = module.get<EnvConfigService>(EnvConfigService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
