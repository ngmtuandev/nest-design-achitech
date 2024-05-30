import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AudioService } from './audio.service';
import { IPaginate } from 'infrastructure/interface/IPagination';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}
  @Post('create')
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
    @UploadedFile() audio: Express.Multer.File,
    @Res() res,
  ) {
    try {
      if (!audio) {
        throw new Error('No audio file received');
      }

      return res.status(HttpStatus.OK).json({
        status: true,
        data: await this.audioService.createAudio(audio.path),
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post('get')
  async getAudios(@Body() data: IPaginate) {
    const { page, take } = data;
    return this.audioService.getAudios(take, page);
  }

  @Post('delete')
  async deleteAudio(@Body('idAudio') id: any) {
    return this.audioService.deleteAudio(id);
  }

  @Post('get-item')
  async getItem(@Body('id') id: any) {
    return this.audioService.getItem(id);
  }
}
