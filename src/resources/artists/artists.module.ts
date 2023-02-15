import { forwardRef, Module } from '@nestjs/common';
import { DBModule } from '../../db/db.module';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    DBModule,
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
