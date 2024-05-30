import {
  AnalyzeResult,
  AnalyzedDocument,
  DocumentAnalysisClient,
  DocumentArrayField,
  DocumentStringField,
} from '@azure/ai-form-recognizer';
import { GenericService } from '@core/application';
import {
  BusinessCard,
  BusinessCardInformation,
} from '@core/domain-business-card';
import { BusinessCardRepository } from '@infrastructure/repository';
import {
  BUSINESS_CARD_FIELD_TYPE,
  businessCardFieldTypeArray,
} from '@infrastructure/xhelper';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { BusinessCardInformationService } from './business-card-infomation.service';

@Injectable()
export class BusinessCardService extends GenericService<
  BusinessCard,
  BusinessCardRepository
> {
  constructor(
    private readonly businessCardRepository: BusinessCardRepository,
    private readonly businessCardInformationService: BusinessCardInformationService,
  ) {
    super(businessCardRepository);
  }

  async create(file) {
    const imageUrl = this.saveBusinessCardImage(file);
    const analyzeResult = await this.analysis(file);

    const savedBusinessCard = await this.saveBusinessCardData(
      analyzeResult,
      imageUrl,
    );

    const newBusinessCardInformations = this.reduceDocumentFields(
      analyzeResult,
      savedBusinessCard,
    );
    await this.businessCardInformationService.saveBusinessCardInformations(
      newBusinessCardInformations,
    );

    const businessCardRefactored = await this.findBusinessCardInformation(
      savedBusinessCard.id,
      imageUrl,
    );
    return businessCardRefactored;
  }

  async findAll() {
    const businessCards = await this.repository.findAll();
    return businessCards;
  }

  async findBusinessCardInformation(id: number, imageUrl?: string) {
    const businessCard = await this.repository.findBusinessCardById(id);

    if (!businessCard) {
      return null;
    }

    const refactorBusinessCardInformations =
      this.refactorBusinessCardInformations(
        businessCard.businessCardInformation,
      );

    const businessCardRefactored = {
      id: businessCard.id,
      name: businessCard.name,
      image_url: businessCard.imageUrl || imageUrl,
      ...refactorBusinessCardInformations,
    };

    return businessCardRefactored;
  }

  async findBusinessCardByNameAndJobTitle(name: string, jobTitle: string) {
    const businessCard =
      await this.repository.findBusinessCardByNameAndJobTitle(name, jobTitle);
    return businessCard;
  }

  private saveBusinessCardImage(file) {
    const fileName = file.originalname.split('.').slice(0, -1).join('.');
    const now = Date.now();
    const randomCode = crypto.randomBytes(16).toString('hex');
    const fileExtension = file.originalname.split('.').pop();

    const path = `./uploads/${fileName}-${now}-${randomCode}.${fileExtension}`;
    fs.writeFileSync(path, file.buffer);

    return path;
  }

  private async analysis(file) {
    const client = new DocumentAnalysisClient(
      process.env.MICROSOFT_BUSINESS_CARD_API_URL,
      {
        key: process.env.MICROSOFT_BUSINESS_CARD_API_KEY,
      },
    );
    const poller = await client.beginAnalyzeDocument(
      'prebuilt-businessCard',
      file?.buffer,
    );

    const result = await poller.pollUntilDone();
    return result;
  }

  private async saveBusinessCardData(
    analyzeResult: AnalyzeResult<AnalyzedDocument>,
    imageUrl: string,
  ): Promise<BusinessCard> {
    const newBusinessCard = new BusinessCard();
    newBusinessCard.name = (
      analyzeResult.documents[0].fields.ContactNames as DocumentArrayField<
        DocumentStringField<string>
      >
    )?.values[0]?.content;
    newBusinessCard.imageUrl = imageUrl;
    const savedBusinessCard = await this.repository.save(newBusinessCard);
    return savedBusinessCard;
  }

  private reduceDocumentFields(
    analyzeResult: AnalyzeResult<AnalyzedDocument>,
    savedBusinessCard: BusinessCard,
  ) {
    const fields = [...businessCardFieldTypeArray];

    const newBusinessCardInformations = fields
      .map((field) => {
        return (
          analyzeResult.documents[0].fields[field] as DocumentArrayField<
            DocumentStringField<string>
          >
        )?.values.map((value) => {
          const newBusinessCardInformation = new BusinessCardInformation();
          newBusinessCardInformation.text = value.content;
          newBusinessCardInformation.type = BUSINESS_CARD_FIELD_TYPE[field];
          newBusinessCardInformation.businessCard = savedBusinessCard;
          return newBusinessCardInformation;
        });
      })
      .flat();

    return newBusinessCardInformations;
  }

  private refactorBusinessCardInformations(
    businessCardInformations: BusinessCardInformation[],
  ) {
    return businessCardInformations
      .map((businessCardInformation) => {
        return {
          text: businessCardInformation.text,
          type: businessCardInformation.type.toLowerCase(),
        };
      })
      .reduceRight((accumulator, current) => {
        if (accumulator[current.type]) {
          accumulator[current.type].push(current.text);
        } else {
          accumulator[current.type] = [current.text];
        }
        return accumulator;
      }, {});
  }
}
