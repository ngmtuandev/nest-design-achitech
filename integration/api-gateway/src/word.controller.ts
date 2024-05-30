import { Constant } from '@infrastructure/xhelper';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { WordService } from 'core/application-ngword/src';
import { WordCreateDTO, WordUpdateDTO } from 'infrastructure/dto';
import { WORD_TYPE } from './../../../infrastructure/xhelper/src/word-type';
import { IPaginate } from 'infrastructure/interface/IPagination';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}
  @Post('create')
  async create(@Res() res, @Body() data: WordCreateDTO) {
    try {
      const { active, description, name, type } = data;
      if (active && description && name && type) {
        const response = await this.wordService.create(data);
        if (response) {
          return res.status(HttpStatus.CREATED).json({
            status: true,
            message: Constant.CREATE_WORD_SUCCESS,
            data: response,
          });
        }
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: Constant.CREATE_WORD_FAILURE,
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: Constant.DATA_CREATE_WORD_REQUIRE,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Constant.INTERNAL_SERVER_ERROR,
      });
    }
  }
  @Post('gets')
  async getAll(
    @Res() res,
    @Body() paginate: IPaginate,
    @Body('typeWord') type?: WORD_TYPE,
    @Body('keyWord') keyword?: string,
  ) {
    const { page, take } = paginate;
    const { data, meta } = await this.wordService.finds(
      type,
      take,
      page,
      keyword,
    );
    return res.status(HttpStatus.OK).json({
      status: true,
      message: Constant.GET_LIST_WORD_SUCCESS,
      data,
      meta,
    });
  }
  @Post('get')
  async getItem(@Res() res, @Body('name') name: string) {
    try {
      if (name) {
        const response = await this.wordService.find(name);
        return res.status(HttpStatus.OK).json({
          status: true,
          message: Constant.GET_ITEM_WORD_SUCCESS,
          data: response,
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: false,
        message: Constant.FIELD_WORD_REQUIRED,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Constant.INTERNAL_SERVER_ERROR,
      });
    }
  }
  @Post('delete')
  async delete(@Res() res, @Body('name') name: string) {
    try {
      if (name) {
        await this.wordService.delete(name);
        return res.status(HttpStatus.OK).json({
          status: true,
          message: Constant.DELETE_WORD_SUCCESS,
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: false,
        message: Constant.FIELD_WORD_REQUIRED,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Constant.INTERNAL_SERVER_ERROR,
      });
    }
  }
  @Post('update')
  async update(@Res() res, @Body() dataUpdate: WordUpdateDTO) {
    const response = await this.wordService.update(dataUpdate);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: Constant.DELETE_WORD_SUCCESS,
      data: response,
    });
  }
  @Post('filter')
  async filterWord(@Res() res, @Body('name') name: string) {
    {
      try {
        const response = await this.wordService.filter(name);
        return res.status(HttpStatus.OK).json({
          status: true,
          message: Constant.FILTER_NAME_WORD_SUCCESS,
          data: response,
        });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: Constant.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }
}
