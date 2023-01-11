import { Module } from '@nestjs/common';
import { NeighborhoodService } from './neighborhood.service';
import { NeighborhoodController } from './neighborhood.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [NeighborhoodController],
  providers: [NeighborhoodService],
  imports: [PrismaModule]
})
export class NeighborhoodModule { }
