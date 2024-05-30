import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpeechService } from 'src/speech/speech.service';
import { AudioEntity } from './entity/audio.entity';
import { DataSource, Repository } from 'typeorm';
import { SpeakerEntity } from 'src/speech/entity/speaker.entity';
import { AudioRepository } from './repo/audio.repository';
import { WordRepository } from '@infrastructure/repository-ngword';
import { MatchEntity } from 'src/match/entity/match.entity';
const Fuse = require('fuse.js');

@Injectable()
export class AudioService {
  constructor(
    private readonly speechService: SpeechService,
    private readonly audioRepository: AudioRepository,
    @InjectRepository(SpeakerEntity)
    private speakerRepository: Repository<SpeakerEntity>,
    private dataSource: DataSource,
    private readonly wordRepository: WordRepository,
  ) {}

  async createAudio(audio: any) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    const wordNotGood = await this.wordRepository.findByNotGood('NG');
    try {
      const { speaker, ...data } = await this.speechService.testSpeech(audio);
      const audionew = new AudioEntity();

      audionew.content = data?.content.toString();
      audionew.day = data?.day;
      audionew.month = data?.month;
      audionew.year = data?.year;
      audionew.session_id = data.sessionId;

      const rs = await queryRunner.manager.save(audionew);

      const speeches =
        speaker?.modify?.map((entry, index) => ({
          speaker: entry.speaker,
          text: entry.written,
          index: index,
        })) || [];
      if (rs) {
        const newSpeaker = new SpeakerEntity();
        newSpeaker.audio_id = rs.id;
        newSpeaker.diarization = JSON.stringify(speaker);
        try {
          await queryRunner.manager.save(newSpeaker);

          await queryRunner.commitTransaction();

          console.log(
            '🚀 ~ AudioService ~ createAudio ~ wordNotGood:',
            wordNotGood,
          );
          const options = {
            includeScore: true,
            keys: ['text'],
          };
          console.log('🚀 ~ AudioService ~ speeches ~ speeches:', speeches);
          const fuse = new Fuse(speeches, options);
          const results = wordNotGood?.flatMap((word) => fuse?.search(word));
          console.log('🚀 ~ AudioService ~ createAudio ~ results:', results);
          await queryRunner.connect();
          await queryRunner.startTransaction();
          if (results) {
            for (const item of results) {
              // console.log(
              //   'test data word not good : ',
              //   item?.item?.text
              //     ?.split(' ')
              //     ?.find((item) => wordNotGood.includes(item)),
              // );
              console.log(
                'word not good present: ',
                item?.item?.text
                  ?.split(' ')
                  ?.find((item) => wordNotGood.includes(item)),
              );
              const newMatch = new MatchEntity();
              newMatch.audio_id = rs?.id;
              newMatch.words = item?.item?.text
                ?.split(' ')
                ?.find((item) => wordNotGood.includes(item));
              await queryRunner.manager.save(newMatch);
            }
            await queryRunner.commitTransaction();
          }
          return rs;
        } catch (error) {
          await queryRunner.rollbackTransaction();
          throw error;
        }
      }
    } catch (error) {
      console.log('error   -   >  ', error);
    }
  }

  async getAudios(take?: number, page?: number) {
    const response = await this.audioRepository.pagination({
      page,
      limit: take,
    });
    return response;
  }

  async deleteAudio(id: any) {
    const rs = await this.audioRepository.deleteAudio(id);
    return rs;
  }

  async getItem(id: any) {
    const rs = await this.audioRepository.findOneAudio(id);
    return rs;
  }

  async updateAudio(id: any) {
    const rs = await this.audioRepository;
  }
}
