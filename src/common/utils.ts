import IconService from "icon-sdk-js";
import { BigNumber } from "bignumber.js";

export class Utils {
    public static ZERO = new BigNumber("0");

    public static handleSmallDecimal(num: BigNumber): string {
        if (num.isGreaterThanOrEqualTo(new BigNumber("0.005"))) {
            //  Round 0.005% and above up to 0.01%
            return "<0.01%";
        } else {
            // Round value below 0.005% to 0
            return "0%";
        }
    }

    public static isHex(value: any): boolean {
        if (Utils.isString(value)) {
            return /^(0x)[0-9a-f]+$/g.test(value);
        }

        return false;
    }

    public static isString(value: any): boolean {
        return typeof value === "string" || value instanceof String;
    }

    // Returns number divided by the 10^decimals
    public static hexToNormalisedNumber(value: BigNumber | string, decimals: number | BigNumber = 18): BigNumber {
        if (!value || !new BigNumber(value).isFinite()) {
            return new BigNumber("0");
        } else if (typeof value === "string") {
            return new BigNumber(value, 16).dividedBy(new BigNumber("10").pow(decimals));
        } else {
            return value.dividedBy(new BigNumber("10").pow(decimals));
        }
    }

    public static hexToBigNumber(value: string | BigNumber): BigNumber {
        if (!value || !new BigNumber(value).isFinite()) {
            return new BigNumber("0");
        } else if (typeof value === "string") {
            return new BigNumber(value, 16);
        } else {
            return new BigNumber(value);
        }
    }

    public static hexToBoolean(value: any): boolean {
        if (typeof value === "string") {
            return value !== "0x0";
        } else if (value instanceof BigNumber) {
            return value.isEqualTo(1);
        } else {
            return value;
        }
    }

    // Returns true if the address is valid EOA address, false otherwise
    public static isEoaAddress(address: string): boolean {
        if (!address) {
            return false;
        }
        return IconService.IconValidator.isEoaAddress(address);
    }

    public static formatNumberToNdigits(num: number, digits = 2): string {
        const si = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "K" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" },
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }

    public static formatNumberToUSLocaleString(num: BigNumber): string {
        return num.toNumber().toLocaleString("en-US");
    }

    public static normalisedAmountToBaseAmountString(
        amount: BigNumber,
        decimals: BigNumber = new BigNumber("18"),
    ): string {
        return amount.multipliedBy(new BigNumber("10").pow(decimals)).toFixed();
    }

    public static roundOffTo2Decimals(value: BigNumber | string): string {
        if (value instanceof BigNumber) {
            return value.toFixed(2, BigNumber.ROUND_HALF_CEIL);
        } else {
            return new BigNumber(value).toFixed(2, BigNumber.ROUND_HALF_CEIL);
        }
    }

    public static roundOffTo0Decimals(value: BigNumber | string): string {
        if (value instanceof BigNumber) {
            return value.toFixed(0, BigNumber.ROUND_HALF_CEIL);
        } else {
            return new BigNumber(value).toFixed(0, BigNumber.ROUND_HALF_CEIL);
        }
    }

    public static roundDownTo2Decimals(value: BigNumber | string | undefined): string {
        if (!value || !new BigNumber(value).isFinite()) {
            return "0";
        } else if (value instanceof BigNumber) {
            return value.toFixed(2, BigNumber.ROUND_DOWN);
        } else {
            return new BigNumber(value).toFixed(2, BigNumber.ROUND_DOWN);
        }
    }

    public static roundUpTo2Decimals(value: BigNumber | string): BigNumber {
        if (value instanceof BigNumber) {
            return new BigNumber(value.toFixed(2, BigNumber.ROUND_UP));
        } else {
            return new BigNumber(new BigNumber(value).toFixed(2, BigNumber.ROUND_UP));
        }
    }

    public static roundDownToZeroDecimals(value: BigNumber | string): string {
        if (value instanceof BigNumber) {
            return value.toFixed(0, BigNumber.ROUND_DOWN);
        } else {
            return new BigNumber(value).toFixed(0, BigNumber.ROUND_DOWN);
        }
    }

    public static convertICXTosICX(value: BigNumber, todayRate: BigNumber): BigNumber {
        return value.dividedBy(todayRate);
    }

    public static convertICXToSICXPrice(icxPrice: BigNumber, sICXRate: BigNumber = new BigNumber("0")): BigNumber {
        return icxPrice.multipliedBy(sICXRate);
    }

    public static convertSICXToICX(sICXvalue: BigNumber, sIcxToIcxRate: BigNumber): BigNumber {
        return sICXvalue.multipliedBy(sIcxToIcxRate);
    }

    public static subtract(val1: BigNumber, val2: BigNumber): BigNumber {
        return val1.minus(val2);
    }

    public static add(val1: BigNumber, val2: BigNumber): BigNumber {
        return val1.plus(val2);
    }

    public static divide(val1: BigNumber, val2: BigNumber): BigNumber {
        return val1.dividedBy(val2);
    }

    public static multiply(val1: BigNumber, val2: BigNumber): BigNumber {
        return val1.multipliedBy(val2);
    }

    public static formatIconAddressToShort(address: string): string {
        const length = address.length;
        return address.substring(0, 7) + "..." + address.substring(length - 7, length);
    }

    public static getNumberOfDaysInCurrentMonth(): number {
        const tmp = new Date();
        const d = new Date(tmp.getFullYear(), tmp.getMonth() + 1, 0);
        return d.getDate();
    }

    public static extractTxFailureMessage(tx: any): string {
        return tx?.failure?.message ?? "";
    }

    public static makeNegativeNumber(value: BigNumber | string): BigNumber {
        const bigNum = new BigNumber(value);
        if (bigNum.isZero() || !bigNum.isFinite()) {
            return new BigNumber("0");
        }

        if (typeof value === "string") {
            return new BigNumber(value).abs().negated();
        } else {
            return value.abs().negated();
        }
    }

    public static isUndefinedOrZero(value?: number | BigNumber): boolean {
        if (!value) {
            return false;
        } else if (value instanceof BigNumber) {
            return value.isZero();
        } else {
            return value === 0;
        }
    }

    public static countDecimals(value: number): number {
        if (!value) {
            return 0;
        }

        if (Math.floor(value) === value) {
            return 0;
        }

        const split = value.toString().split(".");
        if (!split || !split[1]) {
            return 0;
        }

        return split[1].length || 0;
    }

    public static isIsoDate(dateString: string): boolean {
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false; // Invalid format
        const d = new Date(dateString);
        const dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    public static getCurrentDateOnlyString(): string {
        return new Date().toISOString().split("T")[0];
    }

    static async dropCollection(list: any, db: any) {
        if (list.constructor.name !== "Array") {
            list = [list];
        }

        const collections = (await db.listCollections().toArray()).map((collection) => collection.name);

        for (let i = 0; i < list.length; i++) {
            if (collections.indexOf(list[i]) !== -1) {
                await db.dropCollection(list[i]);
            }
        }
    }
}
