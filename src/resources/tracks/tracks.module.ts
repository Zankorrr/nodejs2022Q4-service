import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DBModule } from 'src/db/db.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [DBModule, forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
