import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { NeighborhoodModule } from './neighborhood/neighborhood.module';
import { PrismaModule } from './prisma/prisma.module';
import { AddressModule } from './address/address.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [CityModule, NeighborhoodModule, PrismaModule, AddressModule, StateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
