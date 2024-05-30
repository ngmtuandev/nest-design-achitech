import { BusinessCardService } from '@core/application-business-card';
import { Constant } from '@infrastructure/xhelper';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchBusinessCardDTO } from 'infrastructure/dto/search-business-card.dto';

@Controller('business-card')
export class BusinessCardController {
  constructor(private readonly businessCardService: BusinessCardService) {}

  @Post('save')
  @UseInterceptors(FileInterceptor('file'))
  async save(@Res() res, @UploadedFile('file') file: File) {
    try {
      if (!file) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: Constant.FILE_REQUIRED,
        });
      }

      const result = await this.businessCardService.create(file);
      return res.status(HttpStatus.CREATED).json({
        message: Constant.CREATED,
        data: result,
      });
    } catch (error) {
      console.log('🚀 ~ BusinessCardController ~ save ~ error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Constant.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Post('all')
  async findAll(@Res() res) {
    try {
      const result = await this.businessCardService.findAll();
      return res.status(HttpStatus.OK).json({
        message: Constant.OK,
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Constant.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Post('search')
  async findBusinessCardByNameAndJobTitle(
    @Body() body: SearchBusinessCardDTO,
    @Res() res,
  ) {
    try {
      const name = body.name;
      const jobTitle = body.jobTitle;

      if (!name && !jobTitle) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: Constant.MUST_PROVIDE_NAME_OR_JOB_TITLE,
        });
      }

      const result =
        await this.businessCardService.findBusinessCardByNameAndJobTitle(
          name,
          jobTitle,
        );
      return res.status(HttpStatus.OK).json({
        message: Constant.OK,
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Constant.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Post('find-by-id')
  async findBusinessCardById(@Req() req, @Res() res) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: Constant.ID_REQUIRED,
        });
      }

      const result = await this.businessCardService.findBusinessCardInformation(
        +id,
      );

      return res.status(HttpStatus.OK).json({
        message: 'OK',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Constant.NOT_FOUND_BUSINESS_CARD,
      });
    }
  }
}
