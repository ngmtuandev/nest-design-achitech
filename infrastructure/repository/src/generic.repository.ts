import { GenericEntity } from '@core/domain';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager, EntityTarget, FindOneOptions, FindOptionsWhere, In, Repository } from 'typeorm';

export abstract class GenericRepository<E extends GenericEntity> {
  /**
   * TypeORM repository to handle the database actions
   */
  protected repository: Repository<E>;

  /**
   * TypeOR entity manager to handle database query actions
   */
  protected entityManager: EntityManager;

  constructor(@InjectDataSource() protected xDs: DataSource) {
    /** Get repository with datasource from typeorm */
    this.repository = xDs.getRepository(this.getEntityType());
    /** Get entity manager with datasource from typeorm */
    this.entityManager = xDs.manager;
  }

  /**
   * Verify database has entity or not
   * @param entity E
   * @returns
   */
  hasEntity(entity: E): boolean {
    let yes = false;
    if (this.repository != undefined) {
      yes = this.repository.hasId(entity);
    }
    return yes;
  }

  /**
   * Find entity by id
   * @param id number
   * @returns Entity
   */
  async findById(id: number): Promise<E> {
    return await this.repository.findOne({
      where: { id },
    } as FindOneOptions<E>);
  }

  /**
   * Find entities by ids
   * @param ids number array
   * @returns Entities
   */
  async findByIds(ids: number[]): Promise<E[]> {
    return await this.repository.find({
      where: { id: In(ids) } as FindOptionsWhere<E>,
    });
  }

  /**
   * Find one item by any field
   * @param fieldName any (string, datetime, ...)
   * @returns Entity
   */
  async findOneByFieldName(fieldName: any): Promise<E> {
    return await this.repository.findOne({
      where: { ...fieldName },
    } as FindOneOptions<E>);
  }

  /**
   * Find items by any 'where' conditions
   * @param relations   -> relationship
   * @param where       -> condition
   * @param order       -> order by
   * @returns           -> item list
   */
  findBy(relations?: string[], where?: any, order?: any): Promise<E[]> {
    if (this.repository != undefined) {
      return this.repository.find({ relations, where, order });
    }
    return undefined;
  }

  /**
   * Save item to database
   * @param entity E
   * @returns Entity
   */
  save(entity?: E): Promise<E> {
    return this.repository.save(entity);
  }

  // save multi
  /**
   * Save multiple items to database
   * @param entities E[]
   * @returns Entity[]
   */
  saveMulti(entities: E[]): Promise<E[]> {
    return this.repository.save(entities);
  }

  /**
   * Delete item
   */
  delete(id: number): Promise<boolean> {
    if (this.repository != undefined) {
      const retValue = this.repository
        .delete(id)
        .then((v) => {
          if (v.affected == null || v.affected == undefined) return undefined;
        })
        .catch(() => this.repository?.delete(id));
      if (retValue != undefined) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  }

  /**
   * pagination with condition and relations
   */
  // async paginate({ page, limit, sort, sortBy, ...filters }: FilterPagination, relations?: string[]) {
  //   const entity = this.getEntityType();
  //   let skip = undefined;
  //   const take = limit;
  //   const where: Record<string, any> = {};
  //   const order: Record<string, any> = {};

  //   /** get columns have type enum */
  //   const enumColumns = this.xDs.getMetadata(entity).ownColumns.filter((column) => column.type === 'enum');
  //   const enumProperties = enumColumns.map((column) => column.propertyName);

  //   /** get columns are fk column */
  //   const fkColumns = this.xDs.getMetadata(entity).relations.filter((column) => column.relationType == 'many-to-one');
  //   const fkProperties = fkColumns.map((column) => column.joinColumns.map((item) => item.propertyName).join(', '));

  //   Object.keys(filters).forEach((key) => {
  //     const value = filters[key];
  //     if (!value || value === '') {
  //       return;
  //     }
  //     if (typeof value === 'string' && !enumProperties.includes(key)) {
  //       where[key] = Like(`%${value}%`);
  //       return;
  //     }
  //     if (enumProperties.includes(key)) {
  //       where[key] = In(value);
  //       return;
  //     }
  //     if (fkProperties.includes(key)) {
  //       where[key] = In(value);
  //       return;
  //     }
  //     if (Array.isArray(value)) {
  //       where[key] = In(value);
  //       return;
  //     }
  //     where[key] = value;
  //   });
  //   if (sort != undefined) {
  //     order[sort] = sortBy;
  //   }
  //   if (limit != undefined) {
  //     skip = limit * (page - 1);
  //   }
  //   return await this.repository.findAndCount({ where, relations, skip, take, order });
  // }

  /**
   * Logger to log information
   */
  // get logger() {
  //   const logger = XApp.get().get(XloggerService);
  //   return logger;
  // }

  abstract getEntityType(): EntityTarget<E>;
}
