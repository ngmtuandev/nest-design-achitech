import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SpeechService } from './speech.service';
import { IPaginate } from 'infrastructure/interface/IPagination';
import { Constant } from '@infrastructure/xhelper';

@Controller('speaker')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file_audio', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async recognizeSpeech(
    @Res() res,
    @UploadedFile() audio: Express.Multer.File,
  ) {
    try {
      if (!audio) {
        throw new Error('No audio file received');
      }
      const result = await this.speechService.testSpeech(audio.path);
      return res.status(HttpStatus.OK).json({
        status: true,
        message: Constant.CREATE_AUDIO_SUCCESS,
        data: { ...result },
      });
    } catch (error) {
      return { error: error.message };
    }
  }
  @Post('gets')
  async getSpeakers(@Res() res, @Body() data: IPaginate) {
    const { page, take } = data;
    return res.status(HttpStatus.OK).json({
      status: true,
      message: Constant.GET_LIST_AUDIO_SUCCESS,
      data: await this.speechService.getSpeakers(take, page),
    });
  }
}
