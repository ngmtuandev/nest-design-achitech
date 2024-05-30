import { plainToInstance } from 'class-transformer';

export const XFunction = {
  convertTo: async function <T>(dto: any, entity?: any): Promise<T> {
    const result = await plainToInstance(dto, entity, {
      ignoreDecorators: true,
    });

    return result as T;
  },
  paginationSkip: function (take: number, page: number) {
    return (page - 1) * take;
  },
};
