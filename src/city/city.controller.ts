import { Controller, Get, Param, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { ZipcodeCityParams } from './models/ZipcodeCityParams';
import { UfParams } from './models/UfParams';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Get(':uf')
  getCityByUf(@Param() params: UfParams, @Query() query) {
    return this.cityService.getCityByUf(params.uf, +query?.page);
  }

  @Get('/range/:uf/:city')
  getZipcodeCityRange(@Param() params: ZipcodeCityParams) {
    return this.cityService.getZipcodeCityRange(params.uf, params.city);
  }
}
