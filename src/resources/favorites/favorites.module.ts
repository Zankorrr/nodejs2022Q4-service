import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksModule } from 'src/resources/tracks/tracks.module';
import { ArtistsModule } from 'src/resources/artists/artists.module';
import { AlbumsModule } from 'src/resources/albums/albums.module';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [
    DBModule,
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
