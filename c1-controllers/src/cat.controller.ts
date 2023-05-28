import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post()
  @HttpCode(204)
  create(): string {
    return 'This action adds a new cat';
  }

  @Post('create')
  async createByDto(@Body() createCatDto: CreateCatDto) {
    return 'created a new cat with some params';
  }

  @Post('express')
  createByExpress(@Res() res: Response) {
    res.header('Cache-Control', 'none');
    res.send('This action adds a new cat by express');
  }

  /**
   * 在 Nest.js 中，@Query() 是一个装饰器，
   * 它用于获取 HTTP 请求的查询参数。
   * 查询参数是在 URL 中跟在 ? 后面的键值对，
   * 例如 http://example.com/path?version=5。
   * 在这个 URL 中，version 就是一个查询参数，它的值是 '5'。
   * @param version
   */
  @Get('ab*cd')
  @Redirect('https://nestjs.com', 301)
  findByPattern(@Query('version') version) {
    if (version && version === '5') {
      return {
        url: 'https://docs.nestjs.com/v5/',
        status: 302,
      };
    }
    return 'This route uses a wildcard';
  }

  @Get('breed')
  findAllBreed(@Req() request: Request): string {
    return 'This action returns all cats breed';
  }

  @Get('findById/:id')
  findOneByParam(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a ${params.id} cat`;
  }

  // @Get('breed') 和左边冲突，但是左边的优先
  @Get('findById/:name')
  findOneByParamName(@Param('name') name: string): string {
    return `This action returns a ${name} cat`;
  }

  @Get('async')
  async findAllByAsync(): Promise<any[]> {
    return ['a', 'b'];
  }

  @Get('rxjs')
  findByRxjs(): Observable<any[]> {
    return of(['c', 'd']);
  }
}
