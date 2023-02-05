import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryArtistsStore } from './store/artists.store';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [TracksModule],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: 'IArtistsStore',
      useClass: InMemoryArtistsStore,
    },
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
