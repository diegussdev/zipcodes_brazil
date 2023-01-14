import { Controller, Get, Param, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressesByNeighborhoodParams } from './models/AddressesByNeighborhoodParams';
import { ZipcodeParams } from './models/ZipcodeParams';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Get('/zipcode/:zipcode')
  getZipcode(@Param() params: ZipcodeParams) {
    return this.addressService.getAddressByZipcode(params.zipcode);
  }

  @Get('/:uf/:city/:neighborhood?/addresses')
  getAddressesByNeighborhood(@Param() params: AddressesByNeighborhoodParams, @Query() query) {
    return this.addressService.getAddressesByNeighborhood(params.uf, params.city, params?.neighborhood, +query?.page);
  }
}
