import { Controller, Get, Param, Query } from '@nestjs/common';
import { NeighborhoodByCityParams } from './models/NeighborhoodByCityParams';
import { ZipcodeNeighborhoodParams } from './models/ZipcodeNeighborhoodParams';
import { NeighborhoodService } from './neighborhood.service';

@Controller()
export class NeighborhoodController {
  constructor(private readonly neighborhoodService: NeighborhoodService) { }

  @Get('/:uf/:city/neighborhoods')
  getNeighborhoodByCity(@Param() params: NeighborhoodByCityParams, @Query() query) {
    return this.neighborhoodService.getNeighborhoodByCity(params.uf, params.city, +query?.page);
  }

  @Get('/:uf/:city/:neighborhood/range')
  getZipcodeNeighborhoodRange(@Param() params: ZipcodeNeighborhoodParams) {
    return this.neighborhoodService.getZipcodeNeighborhoodRange(params.uf, params.city, params.neighborhood);
  }
}
