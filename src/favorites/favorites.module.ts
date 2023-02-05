import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryFavoritesStore } from './store/favorites-store';
import { TracksModule } from 'src/tracks/tracks.module';
import { InMemoryTracksStore } from 'src/tracks/store/tracks-store';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  imports: [TracksModule, ArtistsModule, AlbumsModule],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: 'IFavoritesStore',
      useClass: InMemoryFavoritesStore,
    },
  ],
})
export class FavoritesModule {}
