import { Injectable } from "@nestjs/common";
import { AllAddresses } from "../models/interface/AllAddresses";

@Injectable()
export class CacheService {
    /**
     * A @Service for caching data that should only be fetched once
     */
    public allAddresses?: AllAddresses;
}
