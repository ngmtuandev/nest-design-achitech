import { EntityTarget, Like, Repository } from 'typeorm';
import { GenericRepository } from '../../repository/src/generic.repository';
import { Word } from 'core/domain-ngword/src';
import { WORD_TYPE } from '@infrastructure/xhelper';
import { WordUpdateDTO } from 'infrastructure/dto';
import { PaginationFilter } from '@infrastructure/xhelper/paginationFilter';
import { MetaPaginationDto } from 'infrastructure/dto/pagination/meta-pagination.dto';

export class WordRepository extends GenericRepository<Word> {
  protected repository: Repository<Word>;

  getEntityType(): EntityTarget<Word> {
    return Word;
  }

  async findWordByName(name: string): Promise<Word> {
    return await this.repository.findOne({
      where: { name: name, active: 1 },
      select: ['id', 'name', 'description', 'active', 'type', 'createdAt'],
    });
  }

  async findWords(keyword: string, take: number, skip: number) {
    let whereCondition = { active: 1 };

    if (keyword) {
      whereCondition['name'] = Like('%' + keyword + '%');
    }
    return await this.repository.findAndCount({
      select: ['id', 'name', 'description', 'active', 'type', 'createdAt'],
      where: whereCondition,
      take: take,
      skip: skip,
    });
  }

  async findWordByType(
    type: WORD_TYPE,
    take: number,
    skip: number,
    keyword?: string,
  ) {
    let whereCondition = { active: 1, type };

    if (keyword) {
      whereCondition['name'] = Like('%' + keyword + '%');
    }
    return await this.repository.findAndCount({
      where: whereCondition,
      take: take,
      skip: skip,
    });
  }

  async deleteWordByName(name: string) {
    const word = await this.repository.findOneBy({
      name,
    });
    if (word) {
      return await this.repository.update(word?.id!, { active: 0 });
    }
  }

  async updateWordById(data: WordUpdateDTO) {
    const word = await this.repository.findOne({ where: { id: data.idWord } });
    if (word) {
      const updatedValues = {
        name: data?.name ?? word.name,
        description: data?.description ?? word.description,
        type: data?.type ?? word.type,
        active: data?.active ?? word.active,
      };

      await this.repository.update(data.idWord, updatedValues);
      return await this.repository.findOne({ where: { id: word.id } });
    }
  }

  async filterByName(name: string): Promise<Word[]> {
    return await this.repository
      .createQueryBuilder('word')
      .where('word.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }

  async pagination({
    page,
    limit,
    filter,
  }: PaginationFilter & { filter: any }) {
    let skip = undefined;
    const take = limit;

    const { type, name } = filter || {};

    let whereCondition = { active: 1, type };

    if (name) {
      whereCondition['name'] = Like('%' + name + '%');
    }

    if (limit !== undefined) {
      skip = limit * (page - 1);
    }
    const [data, totalWord] = await this.repository.findAndCount({
      skip,
      take,
      where: whereCondition,
    });

    const meta = new MetaPaginationDto();
    meta.pageCurrent = +page;
    meta.totalPage = Math.ceil(totalWord / take);

    return {
      data,
      meta,
    };
  }

  async findByNotGood(type: string): Promise<string[]> {
    const rawResults = await this.repository
      .createQueryBuilder('word')
      .select(['word.name'])
      .where('word.active = 1 AND word.type LIKE :type', { type: `%${type}%` })
      .getRawMany();

    console.log(rawResults);

    return rawResults.map((result) => result.word_name);
  }
}
