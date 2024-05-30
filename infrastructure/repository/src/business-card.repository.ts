import { BusinessCard } from "@core/domain-business-card";
import { BUSINESS_CARD_FIELD_TYPE } from "@infrastructure/xhelper";
import { Injectable } from "@nestjs/common";
import { EntityTarget } from 'typeorm';
import { GenericRepository } from "./generic.repository";

@Injectable()
export class BusinessCardRepository extends GenericRepository<BusinessCard> {
    /**
    * Defined the target of entity [StaffEntity]
    * @returns EntityTarget
    */
    getEntityType(): EntityTarget<BusinessCard> {
        return BusinessCard;
    }

    async findAll() {
        return await this.repository.find();
    }

    async findBusinessCardById(id: number) {
        return await this.repository.findOneOrFail({
            where: { id },
            relations: ['businessCardInformation'],
        });
    }

    async findBusinessCardByNameAndJobTitle(name: string, jobTitle: string) {
        let query = this.repository.createQueryBuilder('businessCard')
            .leftJoin('businessCard.businessCardInformation', 'businessCardInformation')

        if (name) {
            query = query.where('businessCard.name LIKE :name', { name: `%${name}%` });
        }

        if (jobTitle) {
            query = query.andWhere('businessCardInformation.type = :type', { type: BUSINESS_CARD_FIELD_TYPE.JobTitles })
                .andWhere('businessCardInformation.text LIKE :jobTitle', { jobTitle: `%${jobTitle}%` });
        }
        return await query.getMany();
    }
}