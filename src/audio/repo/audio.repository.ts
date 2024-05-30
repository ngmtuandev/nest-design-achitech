import { EntityTarget, Like, Repository } from 'typeorm';
import { GenericRepository } from '@infrastructure/repository';
import { WORD_TYPE } from '@infrastructure/xhelper';
import { PaginationFilter } from '@infrastructure/xhelper/paginationFilter';
import { MetaPaginationDto } from 'infrastructure/dto/pagination/meta-pagination.dto';
import { AudioEntity } from '../entity/audio.entity';

export class AudioRepository extends GenericRepository<AudioEntity> {
  protected repository: Repository<AudioEntity>;

  getEntityType(): EntityTarget<AudioEntity> {
    return AudioEntity;
  }

  //   async findWordByName(name: string): Promise<Audi> {
  //     return await this.repository.findOne({
  //       where: { name: name, active: 1 },
  //       select: ['id', 'name', 'description', 'active', 'type', 'createdAt'],
  //     });
  //   }

  async findAllAudio(take: number, skip: number) {
    let whereCondition = { active: 1 };

    // if (keyword) {
    //   whereCondition['name'] = Like('%' + keyword + '%');
    // }
    return await this.repository.findAndCount({
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

  async pagination({
    page,
    limit,
    filter,
  }: PaginationFilter & { filter?: any }) {
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

  async deleteAudio(idAudio: any) {
    const audio = await this.repository.findOneBy({
      id: idAudio,
    });
    if (audio) {
      return await this.repository.update(idAudio, { active: 0 });
    }
  }

  async findOneAudio(id: any) {
    const audio = await this.repository.findOneBy({
      id,
    });
    if (audio) {
      return audio;
    }
  }
}
