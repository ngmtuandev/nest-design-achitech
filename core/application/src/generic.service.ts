import { GenericEntity } from '@core/domain';
import { GenericRepository } from '@infrastructure/repository';

export abstract class GenericService<E extends GenericEntity, R extends GenericRepository<E>> {
  protected repository: R;

  protected where: any = {};
  protected order: any = {};

  /**
   * Constructor
   * @param r Repository from derived class
   */
  constructor(protected r: R) {
    this.repository = r;
  }
  /**
   * Check entity exists or not
   * @param entity E
   * @returns true / false
   */
  hasEntity(entity: E): boolean {
    return this.repository.hasEntity(entity);
  }

  /**
   * Find entity by id
   * @param id number
   * @returns Entity
   */
  async findById(id: number): Promise<E> {
    return await this.repository.findById(id);
  }

  /**
   * Find entities by ids
   * @param ids number array
   * @returns Entities
   */
  async findByIds(ids: number[]): Promise<E[]> {
    return await this.repository.findByIds(ids);
  }

  /**
   * Find one item by any field
   * @param fieldName any (string, datetime, ...)
   * @returns Entity
   */
  async findOneByFieldName(fieldName: any): Promise<E> {
    return await this.repository.findOneByFieldName(fieldName);
  }

  async findByConditions(conditions?: any, order?: any): Promise<E[]> {
    return await this.repository.findBy([], conditions, order);
  }

  /**
   * Save item
   * @param entity E
   * @returns Entity
   */
  save(entity: E): Promise<E> {
    return this.repository.save(entity);
  }

  /**
   * Delete item
   * @param id number
   * @returns boolean
   */
  delete(id: number): Promise<boolean> {
    if (this.repository != undefined) {
      return this.repository.delete(id);
    }
    return Promise.resolve(false);
  }
}
