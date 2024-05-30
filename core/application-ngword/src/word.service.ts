import { WordRepository } from 'infrastructure/repository-ngword/src/word.repository';
import { Constant, WORD_TYPE, XFunction } from '@infrastructure/xhelper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Word } from 'core/domain-ngword/src';
import { WordUpdateDTO } from 'infrastructure/dto';
import { WordCreateDTO } from 'infrastructure/dto/word/word-create.dto';
import { WordDto } from 'infrastructure/dto/word/word-response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WordService {
  constructor(
    private readonly wordRepository: WordRepository,
    private readonly configService: ConfigService,
  ) {}
  async create(data: WordCreateDTO) {
    const { active, description, name, type } = data;
    if (active && description && name && type) {
      const findWord = await this.wordRepository.findWordByName(data.name);
      if (findWord) {
        return;
      }
      const newWord = new Word();
      newWord.description = data.description;
      newWord.active = data.active;
      newWord.type = data.type;
      newWord.name = data.name;

      const response = await this.wordRepository.save(newWord);
      return XFunction.convertTo(WordDto, response);
    }
  }
  async finds(
    type: WORD_TYPE | undefined,
    take: number,
    page: number,
    keyword?: string | undefined,
  ) {
    try {
      const result = await this.wordRepository.pagination({
        page: page || this.configService.get('PAGINATE_PAGE'),
        limit: take || this.configService.get('PAGINATE_TAKE'),
        filter: { type, name: keyword || undefined },
      });
      if (result) return result;
    } catch (error) {
      throw new BadRequestException(Constant.GET_LIST_WORD_FAIL);
    }
  }
  async find(word: string) {
    try {
      if (word) {
        const ressult = await this.wordRepository.findWordByName(word);
        delete ressult.createdBy;
        if (ressult) return XFunction.convertTo(WordDto, ressult);
      }
      return;
    } catch (error) {
      throw new BadRequestException(Constant.GET_ITEM_WORD_FAILURE);
    }
  }
  async delete(name: string) {
    try {
      if (name) {
        const response = await this.wordRepository.deleteWordByName(name);
        return response;
      }
    } catch (error) {
      return undefined;
    }
  }
  async update(dataUpdate: WordUpdateDTO) {
    try {
      const rs = await this.wordRepository.updateWordById(dataUpdate);
      return rs;
    } catch (error) {
      return undefined;
    }
  }
  async filter(name: string) {
    if (name) {
      const rs = await this.wordRepository.filterByName(name);
      if (rs) {
        return rs;
      } else {
        return undefined;
      }
    }
  }
}
