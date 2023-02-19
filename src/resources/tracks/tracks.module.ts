import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DBModule } from 'src/db/db.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TracksService, PrismaService],
  exports: [TracksService],
})
export class TracksModule {}
