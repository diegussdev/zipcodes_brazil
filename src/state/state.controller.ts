import { Controller, Get, Param } from '@nestjs/common';
import { UfParams } from './models/UfParams';
import { StateService } from './state.service';

@Controller()
export class StateController {
  constructor(private readonly stateService: StateService) { }

  @Get('/states')
  getStates() {
    return this.stateService.getStates();
  }

  @Get('/:uf')
  getStateByUf(@Param() params: UfParams) {
    return this.stateService.getStateByUf(params.uf);
  }
}
