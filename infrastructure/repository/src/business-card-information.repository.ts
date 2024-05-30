import { BusinessCardInformation } from "@core/domain-business-card";
import { Injectable } from "@nestjs/common";
import { EntityTarget } from 'typeorm';
import { GenericRepository } from "./generic.repository";

@Injectable()
export class BusinessCardInformationRepository extends GenericRepository<BusinessCardInformation> {
    /**
    * Defined the target of entity [StaffEntity]
    * @returns EntityTarget
    */
    getEntityType(): EntityTarget<BusinessCardInformation> {
        return BusinessCardInformation;
    }

    async findBusinessCardInformationsByBusinessCardId(businessCardId: number) {
        return await this.repository.createQueryBuilder('businessCardInformation')
            .where('businessCardInformation.business_card_id = :businessCardId', { businessCardId })
            .getMany();
    }
}