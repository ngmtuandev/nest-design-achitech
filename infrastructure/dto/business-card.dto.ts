import { Expose } from "class-transformer";
import { BusinessCardInformationDTO } from "./business-card-information.dto";

export class BusinessCardDTO {
    @Expose({ name: 'name' })
    name: string;

    @Expose({ name: 'business_card_information' })
    businessCardInformation: BusinessCardInformationDTO[];
}