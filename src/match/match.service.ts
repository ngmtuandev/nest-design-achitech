import { Injectable, Logger } from '@nestjs/common';
import { MatchRepository } from './repo/audio.repository';

@Injectable()
export class MatchService {
  constructor(private readonly matchRepository: MatchRepository) {}
  async getMatchs() {
    const response = await this.matchRepository.pagination({
      page: 1,
      limit: 10,
    });
    return response;
  }
}
