import { Injectable } from "@nestjs/common";
import BigNumber from "bignumber.js";
import { IconTransactionType } from "../models/enum/IconTransactionType";
import { AppService } from "../app.service";
import { Utils } from "../common/utils";
import IconService from "icon-sdk-js";
const { IconConverter, IconAmount, IconBuilder } = IconService;
const { CallBuilder, CallTransactionBuilder, IcxTransactionBuilder } = IconBuilder;
import { Hash } from "icon-sdk-js/build/types/hash";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class IconApiService {
    public httpProvider;
    public iconService;

    public stepCost = 20000000;

    constructor(private http: HttpService, private appService: AppService) {
        this.httpProvider = new IconService.HttpProvider(this.appService.getIconRpcUrl());
        this.iconService = new IconService(this.httpProvider);
    }

    async getIcxBalance(address: string): Promise<BigNumber> {
        if (!address) {
            throw new Error("getIcxBalance -> address empty or null!");
        }
        const icxBalance = await this.iconService.getBalance(address).execute();
        return Utils.hexToNormalisedNumber(icxBalance);
    }

    public async getTxResult(txHash: string): Promise<any> {
        return await this.iconService.getTransactionResult(txHash).execute();
    }

    public convertNumberToHex(value: Hash): string {
        return IconConverter.toHex(value);
    }

    public buildTransaction(
        from: string,
        to: string,
        method: string,
        params: any,
        transactionType: IconTransactionType,
        icxValue: BigNumber | string = "0x0",
    ): any {
        let tx = null;
        const timestamp = new Date().getTime() * 1000;
        const nonce = IconConverter.toHex(IconConverter.toBigNumber(1));
        const stepLimit = IconConverter.toHex(IconConverter.toBigNumber(this.stepCost));
        const version = IconConverter.toHex(IconConverter.toBigNumber(3));
        const nid = IconConverter.toHex(IconConverter.toBigNumber(this.appService.getNid()));
        icxValue = !Utils.isHex(icxValue)
            ? IconConverter.toHex(IconAmount.of(icxValue, IconAmount.Unit.ICX).toLoop())
            : icxValue;

        switch (transactionType) {
            case IconTransactionType.WRITE:
                /* Build `CallTransaction` instance for executing SCORE function. */
                tx = new CallTransactionBuilder()
                    .method(method)
                    .params(params)
                    .from(from)
                    .to(to)
                    .stepLimit(stepLimit)
                    .nid(nid)
                    .value(icxValue)
                    .nonce(nonce)
                    .version(version)
                    .timestamp(timestamp)
                    .build();
                break;
            case IconTransactionType.READ:
                /* Build `Call` instance for calling external i.e. read methods . */
                tx = new CallBuilder().to(to).method(method).params(params).build();
                break;
            case IconTransactionType.TRANSFER:
                /* Build `IcxTransaction` instance for sending ICX. */
                tx = new IcxTransactionBuilder()
                    .from(from)
                    .to(to)
                    .value(icxValue)
                    .stepLimit(stepLimit)
                    .nid(nid)
                    .nonce(nonce)
                    .version(version)
                    .timestamp(timestamp)
                    .build();
                break;
            default:
                break;
        }

        return tx;
    }

    public async estimateStepCost(tx: any): Promise<BigNumber | undefined> {
        const estimateStepCostPromise = this.http
            .post<number>(this.appService.getIconDebugRpcUrl(), {
                jsonrpc: "2.0",
                method: "debug_estimateStep",
                id: 1234,
                params: tx,
            })
            .toPromise();

        try {
            const res: any = await estimateStepCostPromise;
            const estimatedStepCost = Utils.hexToBigNumber(res.result);
            console.log(`estimatedStepCost = ${estimatedStepCost}`);
            return estimatedStepCost;
        } catch (e) {
            console.error("estimateStepCost error:");
            console.error(e);
            return undefined;
        }
    }

    public async sendTransaction(signedTx: any): Promise<string> {
        try {
            console.log("Sending transaction: ", signedTx);
            const txHash = await this.iconService.sendTransaction(signedTx).execute();
            console.log("Tx hash ", txHash);
            return txHash;
        } catch (e) {
            throw e;
        }
    }
}
