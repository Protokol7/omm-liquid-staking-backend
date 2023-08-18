import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDate } from "class-validator";

@Schema({ id: false, _id: false })
export class LiquidStakingStatsData {
    @IsDate()
    time: Date;

    @Prop({ required: true, min: 0 })
    totalUnstakingRequestSum: number;

    @Prop({ required: true, min: 0 })
    stakingApr: number;
}

export const LiquidStakingStatsDataSchema = SchemaFactory.createForClass(LiquidStakingStatsData);
