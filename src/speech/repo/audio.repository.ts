import { EntityTarget, Like, Repository } from 'typeorm';
import { GenericRepository } from '@infrastructure/repository';
import { WORD_TYPE } from '@infrastructure/xhelper';
import { PaginationFilter } from '@infrastructure/xhelper/paginationFilter';
import { MetaPaginationDto } from 'infrastructure/dto/pagination/meta-pagination.dto';
import { SpeakerEntity } from '../entity/speaker.entity';
export class SpeakerRepository extends GenericRepository<SpeakerEntity> {
  protected repository: Repository<SpeakerEntity>;

  getEntityType(): EntityTarget<SpeakerEntity> {
    return SpeakerEntity;
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
}
