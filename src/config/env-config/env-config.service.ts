import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvConfigService {
    constructor(private configService: ConfigService) {
        console.log("Environment:", this.getEnvVariables());
    }

    getEnvVariables(): string {
        return `
            ENV=${this.getEnv()}\n
            ICON_RPC_URL=${this.getIconRpcUrl()}\n
            ICON_TRACKER_API=${this.getIconTrackerApiUrl()}\n
            ICON_DEBUG_RPC_URL=${this.getIconDebugRpcUrl()}\n
            ADDRESS_PROVIDER_SCORE=${this.getAddressProviderScore()}\n
            ICON_RPC_URL=${this.getIissApiScoreAddress()}\n
            NID=${this.getNid()}
        `;
    }

    getEnv(): string {
        const env = this.configService.get<string>("ENV");

        if (env == undefined) {
            throw new Error("ENV undefined!");
        }

        return env;
    }

    getIconTrackerApiUrl(): string {
        const trackerApiUrl = this.configService.get<string>("ICON_TRACKER_API");

        if (trackerApiUrl == undefined) {
            throw new Error("ICON_TRACKER_API undefined!");
        }

        return trackerApiUrl;
    }

    getIconRpcUrl(): string {
        const iconRpcUrl = this.configService.get<string>("ICON_RPC_URL");

        if (iconRpcUrl == undefined) {
            throw new Error("ICON_RPC_URL undefined!");
        }

        return iconRpcUrl;
    }

    getIconDebugRpcUrl(): string {
        const iconDebugRpcUrl = this.configService.get<string>("ICON_DEBUG_RPC_URL");

        if (iconDebugRpcUrl == undefined) {
            throw new Error("ICON_DEBUG_RPC_URL undefined!");
        }

        return iconDebugRpcUrl;
    }

    getAddressProviderScore(): string {
        const addressProviderScore = this.configService.get<string>("ADDRESS_PROVIDER_SCORE");

        if (addressProviderScore == undefined) {
            throw new Error("ADDRESS_PROVIDER_SCORE undefined!");
        }

        return addressProviderScore;
    }

    getIissApiScoreAddress(): string {
        const iissApiScoreAddress = this.configService.get<string>("IISS_API");

        if (iissApiScoreAddress == undefined) {
            throw new Error("IISS_API undefined!");
        }

        return iissApiScoreAddress;
    }

    getNid(): number {
        const nid = this.configService.get<string>("NID");

        if (nid == undefined) {
            throw new Error("NID undefined!");
        }

        return +nid;
    }
}
