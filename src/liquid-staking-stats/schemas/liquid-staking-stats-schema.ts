import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsDate } from "class-validator";
import { LiquidStakingStatsData, LiquidStakingStatsDataSchema } from "./liquid-staking-stats-data-schema";

@Schema()
export class LiquidStakingStats extends Document {
    @Prop({
        required: true,
        unique: true,
    })
    @IsDate()
    date: Date;

    @Prop({ type: [LiquidStakingStatsDataSchema] })
    data: LiquidStakingStatsData[];
}

export const LiquidStakingStatsSchema = SchemaFactory.createForClass(LiquidStakingStats);
