import { BUSINESS_CARD_FIELD_TYPE } from "@infrastructure/xhelper";
import { Expose } from "class-transformer";

export class BusinessCardInformationDTO {
    @Expose({ name: 'text' })
    text: string;

    @Expose({ name: 'type' })
    type: BUSINESS_CARD_FIELD_TYPE;

    @Expose({ name: 'business_card_id' })
    businessCardId: number;
}