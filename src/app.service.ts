import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
    constructor(private configService: ConfigService) {}
    getHello(): string {
        return "Hello World!";
    }

    getEnvVariables(): string {
        return `
    ICON_RPC_URL=${this.getIconRpcUrl()}
    ICON_DEBUG_RPC_URL=${this.getIconDebugRpcUrl()}
    ADDRESS_PROVIDER_SCORE=${this.getAddressProviderScore()}
    ICON_RPC_URL=${this.getIissApiScoreAddress()}
    NID=${this.getNid()}
    `;
    }

    getIconRpcUrl(): string {
        return this.configService.get<string>("ICON_RPC_URL");
    }

    getIconDebugRpcUrl(): string {
        return this.configService.get<string>("ICON_DEBUG_RPC_URL");
    }

    getAddressProviderScore(): string {
        return this.configService.get<string>("ADDRESS_PROVIDER_SCORE");
    }

    getIissApiScoreAddress(): string {
        return this.configService.get<string>("IISS_API");
    }

    getNid(): number {
        return this.configService.get<number>("NID");
    }
}
