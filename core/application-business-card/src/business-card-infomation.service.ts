import { GenericService } from '@core/application/generic.service';
import { BusinessCardInformation } from '@core/domain-business-card';
import { BusinessCardInformationRepository } from '@infrastructure/repository';
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessCardInformationService extends GenericService<BusinessCardInformation, BusinessCardInformationRepository> {
    constructor(
        private readonly businessCardInformationRepository: BusinessCardInformationRepository,
    ) {
        super(businessCardInformationRepository);
    }

    async saveBusinessCardInformations(businessCardInformation: BusinessCardInformation[]) {
        return await this.businessCardInformationRepository.saveMulti(businessCardInformation);
    }

    async findBusinessCardInformationsByBusinessCardId(businessCardId: number) {
        return await this.businessCardInformationRepository.findBusinessCardInformationsByBusinessCardId(businessCardId);
    }
}