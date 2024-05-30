import { RepositoryModule } from '@infrastructure/repository';
import { Module } from '@nestjs/common';
import { BusinessCardService } from './application-business-card.service';
import { BusinessCardInformationService } from './business-card-infomation.service';

@Module({
    imports: [
        RepositoryModule,
    ],
    providers: [BusinessCardService, BusinessCardInformationService],
    exports: [BusinessCardService, BusinessCardInformationService],
})
export class BusinessCardModule { }
