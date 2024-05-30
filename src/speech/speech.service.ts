import { SpeakerRepository } from './repo/audio.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import * as fs from 'fs';

@Injectable()
export class SpeechService {
  private readonly speechConfig: sdk.SpeechConfig;
  private readonly logger = new Logger(SpeechService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly speakerRepository: SpeakerRepository,
  ) {
    const speechKey = this.configService.get<string>('SPEECH_KEY');
    const speechRegion = this.configService.get<string>('SPEECH_REGION');

    if (!speechKey || !speechRegion) {
      throw new Error(
        'Speech key and region must be provided in the configuration',
      );
    }

    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      speechKey,
      speechRegion,
    );
    this.speechConfig.speechRecognitionLanguage = 'en-US';
  }

  async testSpeech(audio: string): Promise<any> {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      '4940f6877c9248d1894c923810c36ad9',
      'westus2',
    );
    speechConfig.speechRecognitionLanguage = 'en-US';
    try {
      let audioBuffer = await new Promise<Buffer>((resolve, reject) => {
        fs.readFile(audio, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      let audioConfig = sdk.AudioConfig.fromWavFileInput(audioBuffer);

      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      let recognizedText = '';
      let sessionId = '';
      let starttime: number;
      let result = [];
      let uniqueSpeakers = new Set<string>();

      let conversationTranscriber = new sdk.ConversationTranscriber(
        speechConfig,
        audioConfig,
      );

      conversationTranscriber.transcribing = (s, e) => {
        // starttime = new Date().getTime();
      };

      conversationTranscriber.transcribed = (s, e) => {
        let starttime = e.result.offset / 10000;
        let endtime = starttime + e.result.duration / 10000;
        console.log(
          'TRANSCRIBED: Text=' +
            e.result.text +
            ' Speaker ID=' +
            e.result.speakerId +
            ' Start time : ' +
            starttime +
            ' End time : ' +
            endtime,
        );
        result.push({
          written: e.result.text,
          speaker: `speaker${e.result.speakerId.split('-')[1]}`,
          starttime,
          endtime,
        });
        recognizedText += `${e.result.text}`;
        if (e.result.speakerId) {
          uniqueSpeakers.add(e.result.speakerId);
        }
      };

      conversationTranscriber.sessionStarted = (s, e) => {
        console.log('Session started.');
        sessionId = e.sessionId;
      };

      conversationTranscriber.sessionStopped = (s, e) => {
        console.log('Session stopped.');
      };

      conversationTranscriber.canceled = (s, e) => {
        console.error('CANCELED: Reason=' + e.reason);
        if (e.reason == sdk.CancellationReason.Error) {
          console.error('CANCELED: ErrorDetails=' + e.errorDetails);
        }
      };

      await conversationTranscriber.startTranscribingAsync();

      await new Promise<void>((resolve) => {
        conversationTranscriber.sessionStopped = () => {
          resolve();
        };
      });

      return {
        content: recognizedText,
        sessionId,
        day,
        month,
        year,
        speaker: {
          count_speakers: uniqueSpeakers.size,
          modify: result,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error in recognizing speech from file');
    }
  }

  async getSpeakers(take, page) {
    const response = await this.speakerRepository.pagination({
      page,
      limit: take,
    });
    console.log('🚀 ~ SpeechService ~ getSpeakers ~ response:', response);

    return response;
  }
}
